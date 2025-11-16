package com.traderoom.monitoring.playwright.email;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.concurrent.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.concurrent.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.concurrent.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MailSenderStream {
    private static final Logger logger = LoggerFactory.getLogger(MailSenderStream.class);
    private final BuletoMailSender mailSender;
    private final ExecutorService executor;
    private final long timeoutMs;

    public MailSenderStream(String sender, String password, String recipient) {
        this(sender, password, recipient, Executors.newFixedThreadPool(1), 15000);
    }

    public MailSenderStream(String sender, String password, String recipient, ExecutorService executor, long timeoutMs) {
        this.mailSender = new BuletoMailSender(sender, password, recipient);
        this.executor = executor;
        this.timeoutMs = timeoutMs;
    }

    public Future<Boolean> sendToMe(String subject, String messageBody) {
        return sendAsync(defaultRecipient(), subject, messageBody);
    }

    public Future<Boolean> send(String recipient, String subject, String messageBody) {
        return sendAsync(recipient, subject, messageBody);
    }

    private Future<Boolean> sendAsync(String recipient, String subject, String messageBody) {
        return executor.submit(() -> mailSender.sendMessage(recipient, subject, messageBody));
    }

    private String defaultRecipient() {
        return mailSender.getDefaultRecipient().toString();
    }

    public void shutdown() {
        executor.shutdown();
        try {
            if (!executor.awaitTermination(10, TimeUnit.SECONDS)) {
                executor.shutdownNow();
                logger.warn("Принудительное завершение ExecutorService");
            }
        } catch (InterruptedException e) {
            executor.shutdownNow();
            logger.error("Ошибка при завершении ExecutorService: {}", e.getMessage(), e);
            Thread.currentThread().interrupt();
        }
    }
}