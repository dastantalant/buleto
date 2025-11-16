package com.traderoom.monitoring.main.email;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
public class MailSenderStream  {

    private static final Logger logger = LoggerFactory.getLogger(MailSenderStream.class);

    private final BuletoMailSender mailSender;
    private volatile boolean isShutdown; // Флаг для отслеживания состояния закрытия

    public MailSenderStream(String sender, String password, String recipient) {
        mailSender = new BuletoMailSender(sender, password, recipient);
        isShutdown = false;
    }

    public Future<Boolean> sendToMe(String subject, String messageBody) {
        if (isShutdown) {
            logger.warn("Попытка отправки после закрытия MailSenderStream");
            throw new IllegalStateException("MailSenderStream уже закрыт");
        }

        // Создаем новый ExecutorService для каждой отправки
        ExecutorService singleExecutor = Executors.newSingleThreadExecutor();

        Future<Boolean> future = singleExecutor.submit(() -> {
            try {
                return mailSender.sendToMe(subject, messageBody);
            } catch (Exception e) {
                logger.error("Ошибка при отправке основному получателю: " + e.getMessage());
                return false;
            } finally {
                // Автоматически закрываем ExecutorService после выполнения
                singleExecutor.shutdown();
            }
        });

        return future;
    }

    public Future<Boolean> send(String recipient, String subject, String messageBody) {
        if (isShutdown) {
            logger.warn("Попытка отправки после закрытия MailSenderStream");
            throw new IllegalStateException("MailSenderStream уже закрыт");
        }

        // Создаем новый ExecutorService для каждой отправки
        ExecutorService singleExecutor = Executors.newSingleThreadExecutor();

        Future<Boolean> future = singleExecutor.submit(() -> {
            try {
                return mailSender.sendMessage(recipient, subject, messageBody);
            } catch (Exception e) {
                logger.error("Ошибка при отправке на " + recipient + ": " + e.getMessage());
                return false;
            } finally {
                // Автоматически закрываем ExecutorService после выполнения
                singleExecutor.shutdown();
            }
        });

        return future;
    }

    public void shutdown() {
        isShutdown = true;
        logger.info("MailSenderStream завершает работу");
    }
}