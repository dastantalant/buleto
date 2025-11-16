package com.traderoom.monitoring.round.page;

import java.time.Duration;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class GamePage {
    private final WebDriver driver;
    private final By gridLocator = By.className("grid");
    private final By bulletWaveLocator = By.id("bullet-wave");
    private final By canTimerLocator = By.className("can-timer");

    public GamePage(WebDriver driver) {
        this.driver = driver;
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
        wait.until(ExpectedConditions.visibilityOfElementLocated(gridLocator));
        wait.until(ExpectedConditions.visibilityOfElementLocated(canTimerLocator));
        wait.until(ExpectedConditions.visibilityOfElementLocated(bulletWaveLocator));
    }

    public WebElement getGrid() {
        return driver.findElement(gridLocator);
    }

    public WebElement getBulletWave() {
        return driver.findElement(bulletWaveLocator);
    }

    public WebElement getCanTimer() {
        return driver.findElement(canTimerLocator);
    }
}