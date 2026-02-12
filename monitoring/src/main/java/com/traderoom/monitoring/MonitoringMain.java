package com.traderoom.monitoring;

import com.traderoom.core.logging.FastLogger;
import com.traderoom.core.websocket.Client;

import java.util.concurrent.CountDownLatch;

public class MonitoringMain {
    private static final CountDownLatch keepAliveLatch = new CountDownLatch(1);

    void main() {
        final Client client = Client.of("wss://buleto.com/ws", new SaveSubscriber());
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
}
