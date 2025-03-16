//package com.selenium.java.buleto.driver;
//
//import com.selenium.java.buleto.model.BulletWave;
//import com.selenium.java.buleto.service.BulletWaveService;
//import java.time.Duration;
//import org.openqa.selenium.By;
//import org.openqa.selenium.WebDriver;
//import org.openqa.selenium.WebElement;
//import org.openqa.selenium.support.ui.ExpectedConditions;
//import org.openqa.selenium.support.ui.WebDriverWait;
//import org.springframework.stereotype.Component;
//
//@Component
//public class BulletWaveChecker implements Runnable {
//    private final Thread thread;
//    private boolean running = true;
//
//    private final WebDriver driver;
//    private final BulletWave bulletWave;
//    private final BulletWaveService service;
//
//    public BulletWaveChecker(WebDriver driver, BulletWave bulletWave, BulletWaveService service) {
//        this.driver = driver;
//        this.bulletWave = bulletWave;
//        this.service = service;
//        thread = new Thread(this, "BulletWaveCheckerThread");
//    }
//
//    public void start() {
//        thread.start();
//    }
//
//    public void stop() {
//        this.running = false;
//        thread.interrupt();
//    }
//
//    public void run() {
//        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
//        while (running) {
//            try {
//                WebElement span = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("bullet-wave"))).findElement(By.tagName("span"));
//                if (bulletWave.add(span.getText()) <= 0) {
//                    service.save(bulletWave);
//                }
//                Thread.sleep(1000);
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//        }
//    }
//}