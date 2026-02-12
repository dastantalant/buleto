package com.traderoom.core.websocket;

import com.traderoom.core.logging.FastLogger;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.WebSocket;
import java.time.Duration;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicBoolean;

public interface Client {
    Client start();

    void stop();

    static Client of(String url, Publisher publisher) {
        return new WebSocketClient(url, publisher);
    }

    static Client of(String url, Subscriber subscriber) {
        return new WebSocketClient(url, Publisher.base(subscriber));
    }

    final class WebSocketClient implements Client {
        private final AtomicBoolean running = new AtomicBoolean(true);
        private final ExecutorService supervisor = Executors.newSingleThreadExecutor(runnable -> {
            Thread t = new Thread(runnable, "WebSocketClient-Supervisor");
            t.setDaemon(true);
            return t;
        });
        private final URI uri;
        private final HttpClient client;
        private final Publisher publisher;

        public WebSocketClient(String url, Publisher publisher) {
            this.publisher = publisher;
            uri = URI.create(url);
            client = HttpClient.newBuilder()
                    .connectTimeout(Duration.ofSeconds(10))
                    .build();
        }

        public WebSocketClient(String url, Subscriber subscriber) {
            this(url, Publisher.base(subscriber));
        }

        public Client start() {
            if (running.get()) {
                supervisor.submit(this::connectionLoop);
            }
            return this;
        }

        public void stop() {
            boolean wasRunning = running.getAndSet(false);
            if (wasRunning) {
                supervisor.shutdownNow();
                try {
                    publisher.close();
                    FastLogger.info("Resources closed successfully");
                } catch (IOException e) {
                    FastLogger.error("Error closing resources", e);
                }
            }
        }

        private void connectionLoop() {
            FastLogger.info("Supervisor started. Target: " + uri);
            while (running.get()) {
                try {
                    connectAndWait();
                } catch (Exception e) {
                    FastLogger.error("Critical Connection Error", e);
                }
                if (running.get()) {
                    FastLogger.info("Reconnecting in 5 seconds...");
                    sleep();
                }
            }
            FastLogger.info("Supervisor stopped");
        }

        private void connectAndWait() {
            CompletableFuture<Void> sessionClosed = new CompletableFuture<>();
            try {
                client.newWebSocketBuilder()
                        .connectTimeout(Duration.ofSeconds(10))
                        .buildAsync(uri, new SimpleListener(publisher, sessionClosed))
                        .join();
                FastLogger.info("WebSocket Connected!");
                sessionClosed.join();
            } catch (Exception e) {
                throw new RuntimeException("Handshake failed or connection lost: ", e);
            }
        }

        private void sleep() {
            try {
                Thread.sleep(5000);
            } catch (InterruptedException _) {
                Thread.currentThread().interrupt();
            }
        }

        private record SimpleListener(Publisher publisher, CompletableFuture<Void> future)
                implements WebSocket.Listener {
            @Override
            public CompletionStage<?> onText(WebSocket webSocket, CharSequence data, boolean last) {
                publisher.publish(data);
                webSocket.request(1);
                return null;
            }

            @Override
            public void onError(WebSocket webSocket, Throwable error) {
                FastLogger.error("WebSocket Error (will reconnect)", error);
                future.complete(null);
            }

            @Override
            public CompletionStage<?> onClose(WebSocket webSocket, int statusCode, String reason) {
                FastLogger.info("WebSocket Closed: " + reason);
                future.complete(null);
                return null;
            }
        }
    }
}
