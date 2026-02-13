package com.traderoom.common.websocket;

import com.traderoom.common.exception.WebSocketException;
import com.traderoom.core.logging.FastLogger;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.WebSocket;
import java.time.Duration;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

public class BaseClient extends AbstractClient {

    private final URI uri;
    private final HttpClient client;

    public BaseClient(String url, Publisher publisher) {
        super(url, publisher);
        uri = URI.create(url);
        client = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
    }

    public BaseClient(String url, Subscriber subscriber) {
        this(url, Publisher.base(subscriber));
    }

    @Override
    public void connectAndWait() {
        CompletableFuture<Void> sessionClosed = new CompletableFuture<>();
        try {
            client.newWebSocketBuilder()
                    .connectTimeout(Duration.ofSeconds(10))
                    .buildAsync(uri, new SimpleListener(publisher, sessionClosed))
                    .join();
            FastLogger.info("WebSocket Connected!");
            sessionClosed.join();
        } catch (Exception e) {
            throw new WebSocketException("Handshake failed or connection lost: ", e);
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
            FastLogger.info("WebSocket Closed: {}", reason);
            future.complete(null);
            return null;
        }
    }
}
