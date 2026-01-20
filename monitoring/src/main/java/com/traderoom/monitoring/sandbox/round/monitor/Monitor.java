package com.traderoom.monitoring.sandbox.round.monitor;

import com.traderoom.monitoring.sandbox.round.Main;
import com.traderoom.monitoring.sandbox.round.service.TimelineService;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.WebDriver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Monitor implements Runnable {
    private static final Logger logger = LoggerFactory.getLogger(Monitor.class);
    private final TimelineService timelineService;
    private final ExecutorService executorService;
    private WebDriver driver;
    private Round round;
    private Future<?> roundFuture;

    public Monitor(TimelineService timelineService, WebDriver driver) {
        this.timelineService = timelineService;
        this.driver = driver;
        executorService = Executors.newSingleThreadExecutor();
        logger.info("Monitor created");
    }

    public void run() {
        logger.info("Monitor запускается...");
        round = new Round(driver, timelineService);
        roundFuture = executorService.submit(() -> {
            try {
                round.run();
            } catch (MonitorStopException e) {
                logger.error("Round остановлен: " + e.getMessage());
                if (e.getMessage().contains("Все попытки исчерпаны")) {
                    logger.info("Все попытки исчерпаны, инициируется перезапуск через Main");
                    Main.restartMonitor();
                }
            } catch (Exception e) {
                logger.error("Неожиданная ошибка в Round: " + e.getMessage());
            }
        });
        logger.info("Monitor успешно запущен");
    }

    public void shutdown() {
        if (round != null) {
            round.shutdown();
        }
        if (roundFuture != null && !roundFuture.isDone()) {
            roundFuture.cancel(true);
        }
        executorService.shutdown();
        try {
            if (!executorService.awaitTermination(5, TimeUnit.SECONDS)) {
                executorService.shutdownNow();
                logger.warn("ExecutorService принудительно завершен");
            }
        } catch (InterruptedException e) {
            executorService.shutdownNow();
            logger.error("Ошибка при завершении ExecutorService: " + e.getMessage());
        }
        if (driver != null) {
            try {
                driver.quit();
                logger.info("WebDriver в Monitor успешно завершен");
            } catch (Exception e) {
                logger.error("Ошибка при завершении WebDriver в Monitor: " + e.getMessage());
                Round.killChromeProcesses();
            } finally {
                driver = null;
            }
        }
        logger.info("Monitor полностью остановлен");
    }
}