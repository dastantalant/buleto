package com.traderoom.monitoring.client;

import com.traderoom.core.Client;
import com.traderoom.core.logging.FastLogger;

import java.util.concurrent.CountDownLatch;

public class BlockingRunner implements Client {
    private final CountDownLatch keepAliveLatch = new CountDownLatch(1);
    private final Client client;

    public BlockingRunner() {
        client = new BuletoClient();
    }

    @Override
    public void start() {
        try {
            client.start();
            Runtime.getRuntime().addShutdownHook(new Thread(() -> {
                FastLogger.info("Shutdown hook triggered...");
                client.stop();
                keepAliveLatch.countDown();
            }));
            keepAliveLatch.await();
        } catch (InterruptedException _) {
            FastLogger.info("Application interrupted");
            Thread.currentThread().interrupt();
        }
    }

    @Override
    public void stop() {
        client.stop();
    }
}
