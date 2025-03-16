package com.traderoom.bet.test.version2;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.concurrent.ConcurrentHashMap;

public class Grid {
    private final ConcurrentHashMap<Integer, WebElement> grid = new ConcurrentHashMap<>(36);
    private final WebDriver driver;
    private final StringBuilder content = new StringBuilder();

    public Grid(WebDriver driver) {
        this.driver = driver;
    }

    public void initialize() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        for (int i = 1; i <= 36; i++) {
            grid.put(i, wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("div" + i))));
        }
    }

    public String get() {
        content.setLength(0);
        grid.forEach((index, cell) -> {
            String count = cell.findElement(By.className("cell__count")).getText();
            String factor = cell.findElement(By.className("cell__factor")).getText();
            content.append(count).append(' ').append(factor).append('\n');
        });
        return content.append('\n').toString();
    }
}