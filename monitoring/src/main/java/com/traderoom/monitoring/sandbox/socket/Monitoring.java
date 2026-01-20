package com.traderoom.monitoring.sandbox.socket;

import com.traderoom.monitoring.sandbox.socket.config.Resource;
import com.traderoom.monitoring.sandbox.socket.email.MailSenderStream;
import com.traderoom.monitoring.sandbox.socket.repository.MonitorRepository;
import com.traderoom.monitoring.sandbox.socket.service.MailNotificationService;
import com.traderoom.monitoring.sandbox.socket.service.MonitorService;
import com.traderoom.monitoring.sandbox.socket.socket.Monitor;
import com.traderoom.monitoring.sandbox.socket.socket.model.Factor;
import com.traderoom.monitoring.sandbox.socket.socket.model.Round;
import jakarta.websocket.ClientEndpoint;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnError;
import jakarta.websocket.OnMessage;
import jakarta.websocket.Session;
import java.io.IOException;
import java.net.URI;
import java.time.Instant;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.glassfish.tyrus.client.ClientManager;

public class Monitoring {
    private static final Logger LOGGER = Logger.getLogger(Monitoring.class.getName());

    private static final int CORE_POOL_SIZE = Runtime.getRuntime().availableProcessors();
    private static final int MAX_POOL_SIZE = CORE_POOL_SIZE * 2;
    private static final long KEEP_ALIVE_TIME = 60L;
    private static final int RECONNECT_DELAY_SECONDS = 3;
    private static final int MAX_RECONNECT_ATTEMPTS = 5;

    private static final Object LOCK = new Object();
    private static volatile Session webSocketSession;
    private static volatile boolean isReconnecting = false;

    private static final ExecutorService executorService = new ThreadPoolExecutor(
            CORE_POOL_SIZE,
            MAX_POOL_SIZE,
            KEEP_ALIVE_TIME,
            TimeUnit.SECONDS,
            new LinkedBlockingQueue<>(1000),
            new ThreadPoolExecutor.CallerRunsPolicy()
    );

    private static Monitor monitor;
    private static ClientManager clientManager;
    private static MailNotificationService notificationService;

//    public static void main(String[] args) {
//        try {
//            executorService.submit(() -> {
//                initializeMonitoring();
//                connectWebSocket();
//                manageWebSocketConnection();
//            });
//        } catch (Exception e) {
//            LOGGER.log(Level.SEVERE, "Критическая ошибка инициализации", e);
//        }
//    }

    private static void initializeMonitoring() {
        Round round = new Round();
        Factor factor = new Factor();
        MonitorService service = new MonitorRepository();
        monitor = new Monitor(round, factor, service);
        notificationService = new MailSenderStream(
                Resource.get("buleto.sender.email"),
                Resource.get("buleto.sender.password"),
                Resource.get("buleto.recipient.email")
        );
    }

    private static void connectWebSocket() {
        synchronized (LOCK) {
            if (isReconnecting) return;
            isReconnecting = true;
        }

        try {
            URI uri = URI.create(Resource.get("buleto.url.websocket"));
            clientManager = ClientManager.createClient();
            clientManager.getProperties().put("org.glassfish.tyrus.client.ConnectionTimeout", 10000);
            Session newSession = clientManager.connectToServer(BuletoWebSocket.class, uri);

            synchronized (LOCK) {
                if (webSocketSession != null) {
                    try {
                        webSocketSession.close();
                    } catch (IOException e) {
                        LOGGER.log(Level.WARNING, "Ошибка закрытия предыдущей сессии", e);
                    }
                }
                webSocketSession = newSession;
                isReconnecting = false;
            }

            executorService.submit(() -> {
                if (newSession.isOpen()) {
                    LOGGER.info("WebSocket подключен: " + uri);
                    notificationService.sendNotification(
                            "Подключение установлено",
                            "Успешное подключение к " + uri + " в " + Monitor.FORMATTER.format(Instant.now())
                    );
                }
            });
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Ошибка подключения WebSocket", e);
            handleReconnection();
        }
    }

    private static void manageWebSocketConnection() {
        ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

        scheduler.scheduleAtFixedRate(() -> {
            if (webSocketSession == null || !webSocketSession.isOpen()) {
                LOGGER.warning("Соединение потеряно. Попытка восстановления.");
                handleReconnection();
            }
        }, 0, 30, TimeUnit.SECONDS);
    }

    private static void handleReconnection() {
        synchronized (LOCK) {
            if (isReconnecting) return;
        }

        executorService.submit(() -> {
            for (int attempt = 1; attempt <= MAX_RECONNECT_ATTEMPTS; attempt++) {
                try {
                    LOGGER.info("Попытка восстановления #" + attempt);
                    connectWebSocket();
                    if (webSocketSession != null && webSocketSession.isOpen()) {
                        break;
                    }

                    Thread.sleep(RECONNECT_DELAY_SECONDS * attempt * 1000L);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    LOGGER.log(Level.SEVERE, "Прерывание восстановления соединения", e);
                    break;
                }
            }
        });
    }

    @ClientEndpoint
    public static class BuletoWebSocket {
        private static final Logger LOGGER = Logger.getLogger(BuletoWebSocket.class.getName());

        @OnMessage
        public void onMessage(String message) {
            try {
                monitor.fix(message);
            } catch (Exception e) {
                LOGGER.log(Level.SEVERE, "Ошибка обработки: " + message, e);
            }
        }

        @OnError
        public void onError(Throwable throwable) {
            LOGGER.log(Level.SEVERE, "WebSocket ошибка", throwable);
            handleReconnection();
        }

        @OnClose
        public void onClose(Session session) {
            LOGGER.warning("Соединение закрыто");
            handleReconnection();
        }
    }
}