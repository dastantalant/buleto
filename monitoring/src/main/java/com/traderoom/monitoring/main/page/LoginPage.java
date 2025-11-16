package com.traderoom.monitoring.main.page;

import java.time.Duration;
import org.openqa.selenium.By;
import org.openqa.selenium.ElementClickInterceptedException;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class LoginPage {
    private final WebDriver driver;
    private final By loginField = By.name("login");
    private final By passwordField = By.name("password");
    private final By submitButton = By.className("common-form__submit");

    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }

    public void login(String username, String password) {
        try {
            driver.findElement(loginField).sendKeys(username);
            driver.findElement(passwordField).sendKeys(password);
            try {
                JavascriptExecutor js = (JavascriptExecutor) driver;
                js.executeScript("document.querySelector(\"body > jdiv\").remove()");
            } catch (Exception e) {
            }
            WebElement element = driver.findElement(submitButton);
            Actions actions = new Actions(driver);
            actions.moveToElement(element).click().perform();
        } catch (ElementClickInterceptedException ece){
            System.out.println(ece.getMessage());
        }
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.urlContains("/traderoom"));
    }
}