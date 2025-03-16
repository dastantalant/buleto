package com.traderoom.bet.test.version2;

import java.math.BigDecimal;
import java.util.concurrent.locks.ReentrantLock;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.concurrent.atomic.AtomicBoolean;

public class BulletWaveChecker implements Runnable {
    private final AtomicBoolean running = new AtomicBoolean(true);
    private final WebDriver driver;
    private final BulletWave bulletWave;
    private final BulletWaveService service;
    private final ReentrantLock driverLock = new ReentrantLock();

    public BulletWaveChecker(WebDriver driver, BulletWave bulletWave, BulletWaveService service) {
        this.driver = driver;
        this.bulletWave = bulletWave;
        this.service = service;
    }

    public void start() {
        new Thread(this, "BulletWaveCheckerThread").start();
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
                WebElement span = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("bullet-wave")))
                        .findElement(By.tagName("span"));
                if (bulletWave.add(new BigDecimal(span.getText())) <= 0) {
                    service.save(bulletWave);
                }
            } catch (Exception e) {
                e.printStackTrace();
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