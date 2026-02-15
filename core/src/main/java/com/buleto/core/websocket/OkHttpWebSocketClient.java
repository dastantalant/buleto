package com.buleto.core.websocket;

import com.buleto.core.exception.WebSocketException;
import com.toolbox.core.logging.FastLogger;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.WebSocket;
import okhttp3.WebSocketListener;
import okio.ByteString;

import lombok.NonNull;

import java.io.IOException;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

public final class OkHttpWebSocketClient extends AbstractClient {

    private final OkHttpClient httpClient;
    private WebSocket currentWebSocket;

    public OkHttpWebSocketClient(String url, Publisher publisher) {
        super(url, publisher);
        httpClient = new OkHttpClient.Builder()
                .readTimeout(0, TimeUnit.MILLISECONDS)
                .connectTimeout(10, TimeUnit.SECONDS)
                .pingInterval(30, TimeUnit.SECONDS)
                .build();
    }

    public OkHttpWebSocketClient(String url, Subscriber subscriber) {
        this(url, Publisher.base(subscriber));
    }

    @Override
    public void stop() {
        boolean wasRunning = running.getAndSet(false);
        if (wasRunning) {
            supervisor.shutdownNow();

            if (currentWebSocket != null) {
                currentWebSocket.close(1000, "Client stopped (OkHttp)");
            }

            httpClient.dispatcher().executorService().shutdown();
            httpClient.connectionPool().evictAll();

            try {
                publisher.close();
                FastLogger.info("Resources closed successfully (OkHttp)");
            } catch (IOException e) {
                FastLogger.error("Error closing resources", e);
            }
        }
    }

    @Override
    public void connectAndWait() {
        CompletableFuture<Void> sessionClosed = new CompletableFuture<>();
        Request request = new Request.Builder()
                .url(url)
                .build();
        currentWebSocket = httpClient.newWebSocket(request, new OkHttpListener(publisher, sessionClosed));
        try {
            sessionClosed.join();
        } catch (Exception e) {
            throw new WebSocketException("Session ended with error (OkHttp)", e);
        }
    }

    private static class OkHttpListener extends WebSocketListener {
        private final Publisher publisher;
        private final CompletableFuture<Void> future;

        public OkHttpListener(Publisher publisher, CompletableFuture<Void> future) {
            this.publisher = publisher;
            this.future = future;
        }

        @Override
        public void onOpen(@NonNull WebSocket webSocket, @NonNull Response response) {
            FastLogger.info("WebSocket Connected! (OkHttp)");
        }

        @Override
        public void onMessage(@NonNull WebSocket webSocket, @NonNull String text) {
            publisher.publish(text);
        }

        @Override
        public void onMessage(@NonNull WebSocket webSocket, ByteString bytes) {
            publisher.publish(bytes.utf8());
        }

        @Override
        public void onClosing(WebSocket webSocket, int code, @NonNull String reason) {
            FastLogger.info("WebSocket Closing (OkHttp): {}", reason);
            webSocket.close(1000, null);
            future.complete(null);
        }

        @Override
        public void onClosed(@NonNull WebSocket webSocket, int code, @NonNull String reason) {
            FastLogger.info("WebSocket Closed (OkHttp): {}", reason);
            future.complete(null);
        }

        @Override
        public void onFailure(@NonNull WebSocket webSocket, @NonNull Throwable t, Response response) {
            FastLogger.error("WebSocket Error (will reconnect) (OkHttp): {}", t, t.getMessage());
            future.completeExceptionally(t);
        }
    }
}