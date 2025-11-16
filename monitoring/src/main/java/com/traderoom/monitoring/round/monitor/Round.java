package com.traderoom.monitoring.round.monitor;

import com.traderoom.monitoring.round.Main;
import com.traderoom.monitoring.round.model.Grid;
import com.traderoom.monitoring.round.model.Timeline;
import com.traderoom.monitoring.round.page.GamePage;
import com.traderoom.monitoring.round.page.LoginPage;
import com.traderoom.monitoring.round.service.TimelineService;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Round {
    private static final Logger logger = LoggerFactory.getLogger(Round.class);
    private final Timeline timeline;
    private Grid grid;
    private WebDriver driver;
    private WebElement bulletWave;
    private WebElement canTimer;
    private boolean saved;
    private byte attempt;

    private final String url;
    private final String email;
    private final String password;

    private final TimelineService service;
    private final ScheduledExecutorService scheduler;

    private final WebDriverWait waitWave;
    private final  WebDriverWait waitTimer;

    public Round(WebDriver driver, TimelineService service) {
        url = Main.properties.getProperty("buleto.url.login");
        email = Main.properties.getProperty("buleto.profile.main.email");
        password = Main.properties.getProperty("buleto.profile.main.password");

        this.driver = driver;
        this.service = service;
        scheduler = Executors.newScheduledThreadPool(1);
        timeline = new Timeline();
        attempt = 5;

         waitWave = new WebDriverWait(driver, Duration.ofMillis(150));
         waitTimer = new WebDriverWait(driver, Duration.ofMillis(150));

        waitWave.until(ExpectedConditions.visibilityOfElementLocated(By.id("bullet-wave")));
        waitWave.until(ExpectedConditions.visibilityOfElementLocated(By.tagName("span")));
        waitTimer.until(ExpectedConditions.visibilityOfElementLocated(By.id("can-timer")));
        waitTimer.until(ExpectedConditions.visibilityOfElementLocated(By.tagName("span")));

        init(driver);
    }

    private void init(WebDriver driver) {
        driver.get(url);
        LoginPage loginPage = new LoginPage(driver);
        loginPage.login(email, password);

        GamePage gamePage = new GamePage(driver);
        grid = new Grid(driver, gamePage.getGrid());
        bulletWave = gamePage.getBulletWave();
        canTimer = gamePage.getCanTimer();
        logger.info("Round created");
    }

    public void checkVictory(double bulletWave) {
        if (grid.checkVictoryCell() && !saved) {
            timeline.bullet(System.currentTimeMillis(), bulletWave);
            service.save(this);
            timeline.reset();
            saved = true;
        }
    }

    public void run() {
        Runnable monitor = () -> {
            try {
                WebElement waveSpan = bulletWave.findElement(By.id("bullet-wave")).findElement(By.tagName("span"));
                WebElement timerSpan = canTimer.findElement(By.id("can-timer")).findElement(By.tagName("span"));

                double wave = Double.parseDouble(waveSpan.getText());
                byte second = Byte.parseByte(timerSpan.getText());
                String className = timerSpan.getAttribute("class");

                timeline.set(System.currentTimeMillis(), wave);

                if (className == null || className.isEmpty()) {
                    return;
                }
                if ("init".equals(className)) {
                    grid.update();
                    saved = false;
                }

                if ("red".equals(className) && second < 2) {
                    checkVictory(wave);
                }
            } catch (StaleElementReferenceException e) {
                logger.error("Элемент устарел: " + e.getMessage());
            } catch (NoSuchElementException e) {
                logger.error("Элемент не найден: " + e.getMessage());
            } catch (Exception e) {
                logger.error("Произошла ошибка: " + e.getMessage());
            }
        };

        scheduler.scheduleAtFixedRate(monitor, 500, 500, TimeUnit.MILLISECONDS);

        while (!Thread.currentThread().isInterrupted()) {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                break;
            }
        }
        throw new MonitorStopException("Round stopped!");
    }


    private void restart(Exception e) {
        attempt--;
        if (attempt < 0) {
            shutdown();
            throw new MonitorStopException("Все попытки исчерпаны, требуется полный перезапуск!");
        }
        try {
            driver.close();
            ((JavascriptExecutor) driver).executeScript("window.open();");

            ArrayList<String> tabs = new ArrayList<>(driver.getWindowHandles());
            driver.switchTo().window(tabs.get(tabs.size() - 1));
            driver.get(url);
            LoginPage loginPage = new LoginPage(driver);
            loginPage.login(email, password);

            GamePage gamePage = new GamePage(driver);
            grid = new Grid(driver, gamePage.getGrid());
            bulletWave = gamePage.getBulletWave();
            canTimer = gamePage.getCanTimer();

            Main.mailSenderStream.sendToMe("Произошла ошибка, Открыта новая вкладка "+ Instant.now(), e.getMessage());
            logger.info("Успешно открыта новая вкладка и выполнен повторный вход");
        } catch (Exception ex) {
            Main.mailSenderStream.sendToMe("Произошла ошибка, Не удалось открыть новую вкладку "+Instant.now(), e.getMessage());
            logger.error("Ошибка при повторном открытии вкладки и входе: " + ex.getMessage());
        }
    }

    public void shutdown() {
        scheduler.shutdown();
        try {
            if (!scheduler.awaitTermination(5, TimeUnit.SECONDS)) {
                scheduler.shutdownNow();
                logger.warn("Scheduler did not terminate gracefully, forcing shutdown.");
            }
        } catch (InterruptedException e) {
            scheduler.shutdownNow();
            logger.error("Interrupted while awaiting scheduler termination", e);
        }

        if (driver != null) {
            try {
                driver.quit();
                logger.info("WebDriver quit called successfully.");
            } catch (Exception e) {
                logger.error("Ошибка при завершении WebDriver: " + e.getMessage());
                killChromeProcesses();
            } finally {
                driver = null;
            }
        }

        try {
            Thread.sleep(1000);
            killChromeProcesses();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            logger.error("Прерывание при ожидании очистки: " + e.getMessage());
        }
    }

    public static void killChromeProcesses() {
        try {
            if (System.getProperty("os.name").toLowerCase().contains("win")) {
                new ProcessBuilder("taskkill", "/F", "/IM", "chrome-headless-shell.exe").start().waitFor(2, TimeUnit.SECONDS);
                new ProcessBuilder("taskkill", "/F", "/IM", "chromedriver.exe").start().waitFor(2, TimeUnit.SECONDS);
                logger.info("Windows Chrome processes killed successfully.");
            } else {
                new ProcessBuilder("pkill", "-f", "chrome-headless-shell").start().waitFor(2, TimeUnit.SECONDS);
                new ProcessBuilder("pkill", "-f", "chromedriver").start().waitFor(2, TimeUnit.SECONDS);
                logger.info("Unix Chrome processes killed successfully.");
            }
        } catch (Exception e) {
            logger.error("Ошибка при завершении процессов Chrome: " + e.getMessage());
        }
    }


    public Timeline getTimeline() {
        return timeline;
    }

    public Grid getGrid() {
        return grid;
    }
}