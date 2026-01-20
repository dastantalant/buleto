//package com.traderoom.monitoring.round.test;
//
//import org.openqa.selenium.By;
//import org.openqa.selenium.JavascriptExecutor;
//import org.openqa.selenium.WebDriver;
//import org.openqa.selenium.WebElement;
//import org.openqa.selenium.chrome.ChromeDriver;
//import org.openqa.selenium.chrome.ChromeOptions;
//
//import java.io.File;
//
//public class Test {
//    public static void main(String[] args) throws Exception {
//        System.setProperty("webdriver.chrome.driver", "C:\\browser\\chrome-133.0.6943.141\\chromedriver-win64\\chromedriver.exe");
//        ChromeOptions options = new ChromeOptions();
//        options.setBinary(new File("C:\\browser\\chrome-133.0.6943.141\\chrome-win64\\chrome.exe"));
//        options.addArguments("--start-maximized");
//
//        WebDriver driver = new ChromeDriver(options);
//        driver.get("https://buleto.com/login");
//        WebElement login = driver.findElement(By.name("login"));
//        WebElement password = driver.findElement(By.name("password"));
//        WebElement submit = driver.findElement(By.className("common-form__submit"));
//        login.sendKeys("pi6.3.141592@gmail.com");
//        password.sendKeys("factorial(6)=720");
//        try {
//            JavascriptExecutor js = (JavascriptExecutor) driver;
//            js.executeScript("document.querySelector(\"body > jdiv\").remove()");
//        } catch (Exception e) {
//        }
//        submit.click();
//
//        Thread.sleep(10000);
//        driver.quit();
//    }
//}
