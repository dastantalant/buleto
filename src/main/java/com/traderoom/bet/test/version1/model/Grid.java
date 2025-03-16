//package com.selenium.java.buleto.model;
//
//import jakarta.annotation.PostConstruct;
//import java.time.Duration;
//import java.util.concurrent.ConcurrentHashMap;
//import org.openqa.selenium.By;
//import org.openqa.selenium.WebDriver;
//import org.openqa.selenium.WebElement;
//import org.openqa.selenium.support.ui.ExpectedConditions;
//import org.openqa.selenium.support.ui.WebDriverWait;
//import org.springframework.stereotype.Component;
//
//@Component
//public class Grid  {
//    private final static ConcurrentHashMap<Integer, WebElement> GRID = new ConcurrentHashMap<>(36);
//    private final WebDriver driver;
//    private final StringBuilder content;
//
//    public Grid(WebDriver driver) {
//        this.driver = driver;
//        content = new StringBuilder();
//    }
//
//    public String get() {
//        content.delete(0, content.length());
//        for (Integer index : GRID.keySet()) {
//            WebElement cell = GRID.get(index);
//            String count = cell.findElement(By.className("cell__count")).getText();
//            String factor = cell.findElement(By.className("cell__factor")).getText();
//            content.append(count).append(factor).append('\n');
//        }
//        return content.append('\n').toString();
//    }
//
//    @PostConstruct
//    public void postConstruct() {
//        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
//        for (int i = 1; i <= 36; i++) {
//            GRID.put(i, wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("div" + i))));
//        }
//    }
//}
