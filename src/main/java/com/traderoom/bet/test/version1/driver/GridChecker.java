//package com.selenium.java.buleto.driver;
//
//import com.selenium.java.buleto.model.BulletWave;
//import com.selenium.java.buleto.model.Grid;
//import com.selenium.java.buleto.service.BulletWaveService;
//import com.selenium.java.buleto.service.GridService;
//import java.time.Duration;
//import org.openqa.selenium.By;
//import org.openqa.selenium.WebDriver;
//import org.openqa.selenium.WebElement;
//import org.openqa.selenium.support.ui.ExpectedConditions;
//import org.openqa.selenium.support.ui.WebDriverWait;
//import org.springframework.stereotype.Component;
//
//@Component
//public class GridChecker implements Runnable {
//    private final Thread thread;
//    private boolean running = true;
//
//    private final WebDriver driver;
//    private final Grid grid;
//    private final GridService service;
//
//    private String lastFactor;
//    private String lastCount;
//
//    public GridChecker(WebDriver driver, Grid grid, GridService service) {
//        this.driver = driver;
//        this.grid = grid;
//        this.service = service;
//        thread = new Thread(this, "GridCheckerThread");
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
//        grid.postConstruct();
//        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(50));
//        while (running) {
//            try {
//                WebElement victory = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("cell-victory")));
//                String factor = victory.findElement(By.className("cell__factor")).getText();
//                String count = victory.findElement(By.className("cell__count")).getText();
//                if (lastFactor == null || lastCount == null) {
//                    lastFactor = factor;
//                    lastCount = count;
//                }
//                if (!lastFactor.equals(factor) && !lastCount.equals(count)) {
//                    lastFactor = factor;
//                    lastCount = count;
//                    service.save("victory " + count + ' ' + factor + '\n' + grid.get());
//                }
//                Thread.sleep(1000);
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//        }
//    }
//}
