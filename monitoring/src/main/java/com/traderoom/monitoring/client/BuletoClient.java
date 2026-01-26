package com.traderoom.monitoring.client;

import com.traderoom.core.Client;
import com.traderoom.core.logging.FastLogger;
import com.traderoom.monitoring.api.SaveFacade;
import com.traderoom.monitoring.exception.MonitoringException;
import com.traderoom.monitoring.service.MonitoringFacade;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.time.Duration;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicBoolean;

public final class BuletoClient implements Client {

    private final AtomicBoolean running = new AtomicBoolean(true);
    private final ExecutorService supervisor = Executors.newSingleThreadExecutor(runnable -> {
        Thread t = new Thread(runnable, "Client-Supervisor");
        t.setDaemon(true);
        return t;
    });
    private final URI uri;
    private final HttpClient client;
    private final SaveFacade facade;

    public BuletoClient() {
        this("wss://buleto.com/ws");
    }

    public BuletoClient(String url) {
        this(new MonitoringFacade(),
                HttpClient.newBuilder()
                        .connectTimeout(Duration.ofSeconds(10))
                        .build(),
                URI.create(url));
    }

    public BuletoClient(SaveFacade facade, HttpClient client, URI uri) {
        this.uri = uri;
        this.facade = facade;
        this.client = client;
    }

    public static Client newStart() {
        Client client = new BuletoClient();
        client.start();
        return client;
    }

    public void start() {
        if (running.get()) {
            supervisor.submit(this::connectionLoop);
        }
    }

    public void stop() {
        boolean wasRunning = running.getAndSet(false);
        if (wasRunning) {
            supervisor.shutdownNow();
            try {
                facade.close();
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
                    .buildAsync(uri, new WebSocketListener(facade, sessionClosed))
                    .join();

            FastLogger.info("WebSocket Connected!");
            sessionClosed.join();
        } catch (Exception e) {
            throw new MonitoringException("Handshake failed or connection lost: ", e);
        }
    }

    private void sleep() {
        try {
            Thread.sleep(5000);
        } catch (InterruptedException _) {
            Thread.currentThread().interrupt();
        }
    }
}