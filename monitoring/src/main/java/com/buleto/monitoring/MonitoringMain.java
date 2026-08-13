package com.buleto.monitoring;

import com.buleto.core.service.SaveSubscriber;
import com.toolbox.core.logging.FastLogger;
import com.buleto.core.websocket.Client;

import java.util.concurrent.CountDownLatch;

public class MonitoringMain {
    private static final CountDownLatch keepAliveLatch = new CountDownLatch(1);

    void main() {
        final Client client = Client.okHttp("wss://buleto.com/ws", new SaveSubscriber());
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
