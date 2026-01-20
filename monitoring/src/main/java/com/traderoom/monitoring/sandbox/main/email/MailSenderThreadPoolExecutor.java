package com.traderoom.monitoring.sandbox.main.email;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;

public class MailSenderThreadPoolExecutor {
    private final BuletoMailSender mailSender;
    private volatile ThreadPoolExecutor executorService; // volatile для потокобезопасности
    private final int corePoolSize; // Минимальное количество потоков
    private final int maxPoolSize;  // Максимальное количество потоков
    private final long keepAliveTime; // Время жизни неиспользуемых потоков
    private final BlockingQueue<Runnable> workQueue; // Очередь задач
    private final AtomicBoolean isShutdown; // Флаг состояния

    // Конструктор с кастомными параметрами
    public MailSenderThreadPoolExecutor(String sender, String password, String recipient,
                                        int corePoolSize, int maxPoolSize, long keepAliveTime, TimeUnit unit) {
        if (corePoolSize <= 0 || maxPoolSize < corePoolSize) {
            throw new IllegalArgumentException("Invalid pool size parameters");
        }
        this.mailSender = new BuletoMailSender(sender, password, recipient);
        this.corePoolSize = corePoolSize;
        this.maxPoolSize = maxPoolSize;
        this.keepAliveTime = keepAliveTime;
        this.workQueue = new LinkedBlockingQueue<>(); // Неограниченная очередь (можно заменить)
        this.isShutdown = new AtomicBoolean(false);
        initializeExecutor();
    }

    // Конструктор по умолчанию (аналог newFixedThreadPool(1))
    public MailSenderThreadPoolExecutor(String sender, String password, String recipient) {
        this(sender, password, recipient, 1, 1, 0, TimeUnit.SECONDS);
    }

    // Инициализация или переинициализация пула потоков
    private synchronized void initializeExecutor() {
        if (executorService == null || executorService.isShutdown() || executorService.isTerminated()) {
            executorService = new ThreadPoolExecutor(
                    corePoolSize,         // Минимальное количество потоков
                    maxPoolSize,          // Максимальное количество потоков
                    keepAliveTime,        // Время жизни неиспользуемых потоков
                    TimeUnit.SECONDS,     // Единица времени
                    workQueue,            // Очередь задач
                    Executors.defaultThreadFactory(), // Фабрика потоков
                    new ThreadPoolExecutor.AbortPolicy() // Политика при переполнении
            );
            isShutdown.set(false);
            System.out.println("ThreadPoolExecutor initialized with corePoolSize=" + corePoolSize +
                    ", maxPoolSize=" + maxPoolSize);
        }
    }

    // Асинхронная отправка на дефолтный адрес
    public Future<Boolean> sendToMe(String subject, String messageBody) {
        ensureExecutorIsActive();
        return executorService.submit(() -> {
            try {
                return mailSender.sendToMe(subject, messageBody);
            } catch (Exception e) {
                System.err.println("Error sending to default recipient: " + e.getMessage());
                return false;
            }
        });
    }

    // Асинхронная отправка на произвольный адрес
    public Future<Boolean> sendAsync(String recipientEmail, String subject, String messageBody) {
        ensureExecutorIsActive();
        return executorService.submit(() -> {
            try {
                return mailSender.sendMessage(recipientEmail, subject, messageBody);
            } catch (Exception e) {
                System.err.println("Error sending to " + recipientEmail + ": " + e.getMessage());
                return false;
            }
        });
    }

    // Проверка и перезапуск пула, если он завершён
    private void ensureExecutorIsActive() {
        if (isShutdown.get() || executorService.isShutdown() || executorService.isTerminated()) {
            synchronized (this) {
                if (isShutdown.get() || executorService.isShutdown() || executorService.isTerminated()) {
                    initializeExecutor();
                }
            }
        }
    }

    // Завершение пула потоков
    public void shutdown() {
        if (!isShutdown.getAndSet(true)) {
            executorService.shutdown();
            try {
                if (!executorService.awaitTermination(5, TimeUnit.SECONDS)) {
                    executorService.shutdownNow();
                    System.err.println("ThreadPoolExecutor did not terminate in time");
                }
            } catch (InterruptedException e) {
                executorService.shutdownNow();
                Thread.currentThread().interrupt();
                System.err.println("Shutdown interrupted: " + e.getMessage());
            }
        }
    }

    // Принудительное завершение
    public void shutdownNow() {
        if (!isShutdown.getAndSet(true)) {
            executorService.shutdownNow();
        }
    }

    // Проверка состояния
    public boolean isShutdown() {
        return isShutdown.get();
    }

    public boolean isTerminated() {
        return executorService.isTerminated();
    }

    // Получить текущие параметры пула
    public int getCorePoolSize() {
        return corePoolSize;
    }

    public int getMaxPoolSize() {
        return maxPoolSize;
    }

    public int getActiveCount() {
        return executorService.getActiveCount();
    }

    public long getTaskCount() {
        return executorService.getTaskCount();
    }
}

