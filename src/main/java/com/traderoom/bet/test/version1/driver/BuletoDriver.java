//package com.selenium.java.buleto.driver;
//
//import com.selenium.java.buleto.model.BulletWave;
//import com.selenium.java.buleto.model.Grid;
//import com.selenium.java.buleto.repository.BulletWaveFileRepository;
//import com.selenium.java.buleto.repository.GridFileRepository;
//import com.selenium.java.buleto.service.BulletWaveService;
//import com.selenium.java.buleto.service.GridService;
//import jakarta.annotation.PostConstruct;
//import jakarta.annotation.PreDestroy;
//import java.time.Duration;
//import java.util.HashMap;
//import java.util.Map;
//import org.openqa.selenium.By;
//import org.openqa.selenium.WebElement;
//import org.openqa.selenium.chrome.ChromeDriver;
//import org.openqa.selenium.support.ui.ExpectedConditions;
//import org.openqa.selenium.support.ui.WebDriverWait;
//import org.springframework.context.annotation.Lazy;
//import org.springframework.stereotype.Component;
//
//@Component
//public class BuletoDriver extends ChromeDriver implements Runnable {
//
//    private final Thread thread;
//    private boolean running = true;
//
//    private final GridChecker gridChecker;
//    private final BulletWaveChecker bulletWaveChecker;
//
//    public BuletoDriver(@Lazy GridChecker gridChecker, @Lazy BulletWaveChecker bulletWaveChecker) {
//        this.gridChecker = gridChecker;
//        this.bulletWaveChecker = bulletWaveChecker;
//        thread = new Thread(this, "BuletoDriver");
//    }
//
//    public BuletoDriver() {
//        get("https://buleto.com/login");
//        findElement(By.name("login")).sendKeys("pi6.3.141592@gmail.com");
//        findElement(By.name("password")).sendKeys("factorial(6)=720");
//        findElement(By.className("common-form__submit")).click();
//
//        Grid grid = new Grid(this);
//        GridService gridService = new GridFileRepository();
//        gridChecker = new GridChecker(this, grid, gridService);
//
//        BulletWave bulletWave = new BulletWave();
//        BulletWaveService bulletWaveService = new BulletWaveFileRepository();
//        bulletWaveChecker = new BulletWaveChecker(this, bulletWave, bulletWaveService);
//
//        gridChecker.start();
//        bulletWaveChecker.start();
//
//        thread = new Thread(this, "BuletoDriver");
//    }
//
//    @PostConstruct
//    public void postConstruct() {
//        get("https://buleto.com/login");
//        findElement(By.name("login")).sendKeys("pi6.3.141592@gmail.com");
//        findElement(By.name("password")).sendKeys("factorial(6)=720");
//        findElement(By.className("common-form__submit")).click();
//        gridChecker.start();
//        bulletWaveChecker.start();
//    }
//
//    @PreDestroy
//    public void preDestroy() {
//        quit();
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
//    @Override
//    public void run() {
//    }
//}
