package com.traderoom.bet.test.version2;

import java.util.concurrent.locks.ReentrantLock;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.concurrent.atomic.AtomicBoolean;

public class GridChecker implements Runnable {
    private final AtomicBoolean running = new AtomicBoolean(true);
    private final WebDriver driver;
    private final Grid grid;
    private final GridService service;
    private final ReentrantLock driverLock = new ReentrantLock();

    private String lastFactor;
    private String lastCount;

    public GridChecker(WebDriver driver, Grid grid, GridService service) {
        this.driver = driver;
        this.grid = grid;
        this.service = service;
    }

    public void start() {
        new Thread(this, "GridCheckerThread").start();
    }

    public void stop() {
        running.set(false);
    }

    @Override
    public void run() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
        while (running.get()) {
            try {
                driverLock.lock();
                // Ждем появления элемента "cell-victory"
                WebElement victory = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("cell-victory")));
                String factor = victory.findElement(By.className("cell__factor")).getText();
                String count = victory.findElement(By.className("cell__count")).getText();
                if (lastFactor == null || lastCount == null || !lastFactor.equals(factor) || !lastCount.equals(count)) {
                    lastFactor = factor;
                    lastCount = count;
                    service.save("victory " + count + ' ' + factor + '\n' + grid.get());
                }
            } catch (Exception e) {
//                e.printStackTrace();
            } finally {
                driverLock.unlock();
            }
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                break;
            }
        }
    }
}