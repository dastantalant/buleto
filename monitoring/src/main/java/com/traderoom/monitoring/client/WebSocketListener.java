package com.traderoom.monitoring.client;

import com.traderoom.core.logging.FastLogger;
import com.traderoom.monitoring.api.SaveFacade;

import java.net.http.WebSocket;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

public record WebSocketListener(SaveFacade service, CompletableFuture<Void> future)
        implements WebSocket.Listener {
    @Override
    public CompletionStage<?> onText(WebSocket webSocket, CharSequence data, boolean last) {
        service.save(data);
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