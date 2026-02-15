package com.buleto.core.websocket;

import com.toolbox.core.logging.FastLogger;

import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicBoolean;

public abstract class AbstractClient implements Client {
    protected final AtomicBoolean running = new AtomicBoolean(true);
    protected final ExecutorService supervisor = Executors.newSingleThreadExecutor(runnable -> {
        Thread t = new Thread(runnable, "WebSocketClient-Supervisor");
        t.setDaemon(true);
        return t;
    });
    protected final String url;
    protected final Publisher publisher;

    protected AbstractClient(String url, Subscriber subscriber) {
        this(url, Publisher.base(subscriber));
    }

    protected AbstractClient(String url, Publisher publisher) {
        this.publisher = publisher;
        this.url = url;
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
        FastLogger.info("Supervisor started. Target: {}", url);
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

    private void sleep() {
        try {
            Thread.sleep(5000);
        } catch (InterruptedException _) {
            Thread.currentThread().interrupt();
        }
    }
}
