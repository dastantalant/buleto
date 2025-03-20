package com.traderoom.bet.buleto.model.round;

import com.traderoom.bet.buleto.GamePage;
import com.traderoom.bet.buleto.LoginPage;
import com.traderoom.bet.web.service.TimelineService;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import lombok.Getter;
import lombok.Setter;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

@Getter
public class Round {
    private static final String LOGIN_URL = "https://buleto.com/login";
    private static final String USERNAME = "pi6.3.141592@gmail.com";
    private static final String PASSWORD = "factorial(6)=720";

    private final Timeline timeline;
    private final Grid grid;
    private final WebDriver driver;
    private final WebElement bulletWave;
    private final WebElement canTimer;
    private boolean saved;

    private final TimelineService service;
    private final ScheduledExecutorService scheduler;

    private double bulletWaveValue;

    public Round(WebDriver driver, TimelineService service) {
        this.driver = driver;
        this.service = service;
        this.scheduler = Executors.newScheduledThreadPool(1);
        this.timeline = new Timeline();

        // Инициализация страницы
        driver.get(LOGIN_URL);
        LoginPage loginPage = new LoginPage(driver);
        loginPage.login(USERNAME, PASSWORD);

        GamePage gamePage = new GamePage(driver);
        this.grid = new Grid(gamePage.getGrid());
        this.bulletWave = gamePage.getBulletWave();
        this.canTimer = gamePage.getCanTimer();
    }

    public void checkVictory(double bulletWave) {
        if (grid.checkVictoryCell() && !saved) {
            bulletWaveValue = bulletWave;
            timeline.bullet(System.currentTimeMillis(), bulletWave);
            service.save(this);
            timeline.reset();
            saved = true;
        }
    }

    public void run() {
        Runnable monitor = () -> {
            try {
                WebElement waveSpan = bulletWave.findElement(By.xpath("//html/body/div[1]/div/div[2]/section/div[3]/div[1]/div[2]/span"));
                WebElement timerSpan = canTimer.findElement(By.xpath("//html/body/div[1]/div/div[2]/section/div[2]/span"));

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
                System.err.println("Элемент устарел: " + e.getMessage());
            } catch (NoSuchElementException e) {
                System.err.println("Элемент не найден: " + e.getMessage());
            } catch (Exception e) {
                System.err.println("Ошибка выполнения: " + e.getMessage());
            }
        };

        scheduler.scheduleAtFixedRate(monitor, 1, 1, TimeUnit.SECONDS);

        while (!Thread.currentThread().isInterrupted()) {
            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                break;
            }
        }
    }

    public void shutdown() {
        scheduler.shutdown();
        try {
            if (!scheduler.awaitTermination(5, TimeUnit.SECONDS)) {
                scheduler.shutdownNow();
            }
        } catch (InterruptedException e) {
            scheduler.shutdownNow();
        }
        try {
            driver.quit();
            Thread.sleep(1000);
            killChromeProcesses();
        } catch (Exception e) {
            System.err.println("Ошибка при закрытии драйвера: " + e.getMessage());
        }
    }

    private void killChromeProcesses() {
        try {
            Runtime.getRuntime().exec("taskkill /F /IM chromedriver.exe");
            Runtime.getRuntime().exec("taskkill /F /IM chrome-headless-shell.exe");
            Thread.sleep(500);
        } catch (Exception e) {
            System.err.println("Ошибка при завершении процессов Chrome: " + e.getMessage());
        }
    }

}