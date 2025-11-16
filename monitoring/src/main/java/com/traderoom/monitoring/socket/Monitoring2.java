package com.traderoom.monitoring.socket;

import com.traderoom.monitoring.socket.config.Resource;
import com.traderoom.monitoring.socket.repository.MonitorRepository;
import com.traderoom.monitoring.socket.service.MonitorService;
import com.traderoom.monitoring.socket.socket.Monitor;
import com.traderoom.monitoring.socket.socket.model.Factor;
import com.traderoom.monitoring.socket.socket.model.Round;
import jakarta.websocket.ClientEndpoint;
import jakarta.websocket.CloseReason;
import jakarta.websocket.DeploymentException;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnError;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import java.io.IOException;
import java.net.URI;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.RejectedExecutionException;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.glassfish.tyrus.client.ClientManager;

public class Monitoring2 {
    private static final Logger LOGGER = Logger.getLogger(Monitoring2.class.getName());

    // --- Константы Конфигурации ---
    // (Остальные константы без изменений)
    private static final int CONNECTION_TIMEOUT_MS = 10000;
    private static final long INITIAL_RECONNECT_DELAY_SECONDS = 3;
    private static final long MAX_RECONNECT_DELAY_SECONDS = 60;
    private static final int MAX_RECONNECT_ATTEMPTS = 10;
    private static final long CONNECTION_CHECK_INTERVAL_SECONDS = 30;
    private static final String WEBSOCKET_URL_PROPERTY = "buleto.url.websocket";

    // --- Переменные Состояния ---
    private static final Object SESSION_LOCK = new Object();
    private static volatile Session webSocketSession;
    private static final AtomicBoolean isConnectingOrReconnecting = new AtomicBoolean(false);
    private static final AtomicInteger reconnectAttemptCounter = new AtomicInteger(0);

    // --- Исполнители (Executors) ---

    // Исполнитель для обработки WebSocket сообщений.
    // Используем ОДИН поток, чтобы гарантировать ПОСЛЕДОВАТЕЛЬНУЮ обработку
    // и избежать гонок при записи в БД для одного и того же timeline_id.
    private static final ExecutorService messageProcessingExecutor = Executors.newSingleThreadExecutor(
            r -> new Thread(r, "WebSocketMessageProcessor") // Имя потока для отладки
    );

    // Выделенный планировщик для управления соединением и переподключениями (остается без изменений)
    private static final ScheduledExecutorService connectionScheduler = Executors.newSingleThreadScheduledExecutor(
            r -> new Thread(r, "WebSocketConnectionManager")
    );

    // --- Компоненты ---
    private static Monitor monitor;
    private static ClientManager clientManager;

    public static void main(String[] args) {
        Runtime.getRuntime().addShutdownHook(new Thread(Monitoring2::shutdown, "MonitoringShutdownHook"));

        try {
            initializeMonitoring();
            scheduleConnectionAttempt(0, TimeUnit.SECONDS);
            startConnectionMonitor();
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Критическая ошибка инициализации", e);
            shutdown();
        }
    }

    // --- Методы initializeMonitoring, connectWebSocket, calculateReconnectDelay, scheduleConnectionAttempt, startConnectionMonitor, handleConnectionLoss ---
    // (Эти методы остаются БЕЗ ИЗМЕНЕНИЙ)
    private static void initializeMonitoring() {
        LOGGER.info("Инициализация компонентов мониторинга...");
        Round round = new Round();
        Factor factor = new Factor();
        MonitorService service = new MonitorRepository(); // MonitorRepository не изменяется
        monitor = new Monitor(round, factor, service);
        LOGGER.info("Компоненты мониторинга инициализированы.");
    }

    private static void connectWebSocket() {
        URI uri;
        try {
            uri = URI.create(Resource.get(WEBSOCKET_URL_PROPERTY));
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Не удалось получить WebSocket URI из свойства: " + WEBSOCKET_URL_PROPERTY, e);
            isConnectingOrReconnecting.set(false);
            return;
        }

        LOGGER.info("Попытка подключения к WebSocket: " + uri);
        if (clientManager == null) {
            clientManager = ClientManager.createClient();
            clientManager.getProperties().put("org.glassfish.tyrus.client.ConnectionTimeout", CONNECTION_TIMEOUT_MS);
        }

        Session newSession = null;
        try {
            synchronized (SESSION_LOCK) {
                if (webSocketSession != null && webSocketSession.isOpen()) {
                    LOGGER.info("Закрытие существующей сессии перед переподключением.");
                    try {
                        webSocketSession.close(new CloseReason(CloseReason.CloseCodes.NORMAL_CLOSURE, "Reconnecting"));
                    } catch (IOException e) {
                        LOGGER.log(Level.WARNING, "Ошибка при закрытии предыдущей сессии", e);
                    }
                    webSocketSession = null;
                }
            }
            newSession = clientManager.connectToServer(BuletoWebSocketEndpoint.class, uri);
            LOGGER.info("WebSocket соединение успешно установлено: " + uri);
            synchronized (SESSION_LOCK) {
                webSocketSession = newSession;
            }
            reconnectAttemptCounter.set(0);
            isConnectingOrReconnecting.set(false);

        } catch (DeploymentException | IOException e) {
            int attempt = reconnectAttemptCounter.get();
            LOGGER.log(Level.WARNING, "Не удалось подключиться к WebSocket (попытка " + attempt + "): " + e.getMessage());
            if (newSession != null) { try { newSession.close(); } catch (IOException ignored) {} }
            int nextAttempt = reconnectAttemptCounter.incrementAndGet();
            if (nextAttempt <= MAX_RECONNECT_ATTEMPTS) {
                long delay = calculateReconnectDelay(nextAttempt);
                LOGGER.info("Планирование следующей попытки переподключения (" + nextAttempt + ") через " + delay + " сек.");
                scheduleConnectionAttempt(delay, TimeUnit.SECONDS);
            } else {
                LOGGER.severe("Достигнуто максимальное количество попыток переподключения (" + MAX_RECONNECT_ATTEMPTS + "). Прекращение попыток.");
                isConnectingOrReconnecting.set(false);
            }
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Неожиданная ошибка во время попытки подключения WebSocket", e);
            if (newSession != null) { try { newSession.close(); } catch (IOException ignored) {} }
            isConnectingOrReconnecting.set(false);
            handleConnectionLoss("Неожиданная ошибка подключения");
        }
    }

    private static long calculateReconnectDelay(int attempt) {
        long delay = INITIAL_RECONNECT_DELAY_SECONDS * (long)Math.pow(2, Math.min(attempt - 1, 6));
        return Math.min(delay, MAX_RECONNECT_DELAY_SECONDS);
    }

    private static void scheduleConnectionAttempt(long delay, TimeUnit unit) {
        if (isConnectingOrReconnecting.compareAndSet(false, true)) {
            LOGGER.info("Планирование попытки подключения с задержкой: " + delay + " " + unit.name());
            try {
                connectionScheduler.schedule(Monitoring2::connectWebSocket, delay, unit);
            } catch (RejectedExecutionException e) {
                LOGGER.log(Level.SEVERE, "Не удалось запланировать попытку подключения, планировщик возможно останавливается.", e);
                isConnectingOrReconnecting.set(false);
            }
        } else {
            LOGGER.info("Попытка подключения уже выполняется или запланирована. Запрос проигнорирован.");
        }
    }

    private static void startConnectionMonitor() {
        LOGGER.info("Запуск периодического монитора соединения (интервал проверки: " + CONNECTION_CHECK_INTERVAL_SECONDS + "с)");
        connectionScheduler.scheduleAtFixedRate(() -> {
            try {
                boolean connected;
                synchronized (SESSION_LOCK) {
                    connected = (webSocketSession != null && webSocketSession.isOpen());
                }
                if (!connected && !isConnectingOrReconnecting.get()) {
                    LOGGER.warning("Монитор соединения обнаружил разрыв. Инициация процесса переподключения.");
                    reconnectAttemptCounter.set(0);
                    scheduleConnectionAttempt(0, TimeUnit.SECONDS);
                }
            } catch (Exception e) {
                LOGGER.log(Level.SEVERE, "Ошибка в задаче мониторинга соединения", e);
            }
        }, CONNECTION_CHECK_INTERVAL_SECONDS, CONNECTION_CHECK_INTERVAL_SECONDS, TimeUnit.SECONDS);
    }

    private static void handleConnectionLoss(String reason) {
        LOGGER.warning("WebSocket соединение потеряно или закрыто: " + reason + ". Попытка переподключения.");
        synchronized(SESSION_LOCK) {
            if (webSocketSession != null) {
                try { webSocketSession.close(new CloseReason(CloseReason.CloseCodes.GOING_AWAY, "Client detected disconnect")); } catch (Exception ignored) {}
                webSocketSession = null;
            }
        }
        reconnectAttemptCounter.set(0);
        scheduleConnectionAttempt(0, TimeUnit.SECONDS);
    }
    // --- /Методы без изменений ---


    /**
     * Корректно освобождает ресурсы при завершении работы приложения.
     */
    public static void shutdown() {
        LOGGER.info("Завершение работы приложения мониторинга...");

        // 1. Останавливаем планировщик соединений
        connectionScheduler.shutdown();
        try {
            if (!connectionScheduler.awaitTermination(5, TimeUnit.SECONDS)) {
                LOGGER.warning("Планировщик соединений не завершился корректно, принудительная остановка.");
                connectionScheduler.shutdownNow();
            }
        } catch (InterruptedException e) {
            LOGGER.warning("Прервано ожидание завершения планировщика соединений.");
            Thread.currentThread().interrupt();
            connectionScheduler.shutdownNow();
        }

        // 2. Закрываем WebSocket сессию
        synchronized (SESSION_LOCK) {
            if (webSocketSession != null) {
                try {
                    LOGGER.info("Закрытие WebSocket сессии...");
                    webSocketSession.close(new CloseReason(CloseReason.CloseCodes.NORMAL_CLOSURE, "Application shutting down"));
                    webSocketSession = null;
                } catch (IOException e) {
                    LOGGER.log(Level.WARNING, "Ошибка при закрытии WebSocket сессии во время shutdown", e);
                }
            }
        }

        // 3. Останавливаем ClientManager (если это необходимо)
        if (clientManager != null) {
            LOGGER.info("Остановка WebSocket ClientManager...");
            clientManager = null;
        }

        // 4. Останавливаем исполнитель обработки сообщений <<--- ИЗМЕНЕНИЕ
        LOGGER.info("Остановка исполнителя обработки сообщений...");
        messageProcessingExecutor.shutdown();
        try {
            // Даем ему чуть больше времени, если обработка сообщения долгая
            if (!messageProcessingExecutor.awaitTermination(15, TimeUnit.SECONDS)) {
                LOGGER.warning("Исполнитель обработки сообщений не завершился корректно, принудительная остановка.");
                messageProcessingExecutor.shutdownNow();
            }
        } catch (InterruptedException e) {
            LOGGER.warning("Прервано ожидание завершения исполнителя обработки сообщений.");
            Thread.currentThread().interrupt();
            messageProcessingExecutor.shutdownNow();
        }

        LOGGER.info("Завершение работы приложения мониторинга выполнено.");
    }

    // --- Класс WebSocket Endpoint ---
    @ClientEndpoint
    public static class BuletoWebSocketEndpoint {

        @OnOpen
        public void onOpen(Session session) {
            LOGGER.info("WebSocket @OnOpen сработал для сессии: " + session.getId());
        }

        @OnMessage
        public void onMessage(String message, Session session) {
            try {
                // Передаем обработку сообщения в ОДНОПОТОЧНЫЙ исполнитель <<--- ИЗМЕНЕНИЕ
                messageProcessingExecutor.submit(() -> {
                    try {
                        // Теперь monitor.fix(message) будет всегда выполняться последовательно
                        monitor.fix(message);
                    } catch (Exception e) {
                        // Логгируем ошибку, но продолжаем обработку следующих сообщений
                        LOGGER.log(Level.SEVERE, "Ошибка обработки сообщения: " + message, e);
                        // ВАЖНО: Если monitor.fix может бросать исключение, которое
                        // не должно останавливать обработку следующих сообщений,
                        // то этот catch здесь необходим.
                    }
                });
            } catch (RejectedExecutionException e) {
                // Если исполнитель остановлен или переполнен (маловероятно для SingleThreadExecutor без ограниченной очереди)
                LOGGER.log(Level.WARNING, "Не удалось передать задачу обработки сообщения. Исполнитель недоступен.", e);
            }
        }

        @OnError
        public void onError(Session session, Throwable throwable) {
            LOGGER.log(Level.SEVERE, "WebSocket @OnError сработал для сессии " + (session != null ? session.getId() : "null"), throwable);
            handleConnectionLoss("OnError: " + throwable.getMessage());
        }

        @OnClose
        public void onClose(Session session, CloseReason closeReason) {
            LOGGER.warning("WebSocket @OnClose сработал для сессии " + session.getId() + ". Причина: " + closeReason);
            handleConnectionLoss("OnClose: " + closeReason.getReasonPhrase());
        }
    }
}