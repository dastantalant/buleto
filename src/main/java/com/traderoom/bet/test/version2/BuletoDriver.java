package com.traderoom.bet.test.version2;


import java.util.Optional;
import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.devtools.DevTools;
import org.openqa.selenium.devtools.v133.network.Network;

public class BuletoDriver extends ChromeDriver implements Runnable {
    private final ExecutorService executorService = Executors.newFixedThreadPool(2);
    private final AtomicBoolean running = new AtomicBoolean(true);

    private GridChecker gridChecker;
    private BulletWaveChecker bulletWaveChecker;
    private Grid grid;

    public BuletoDriver() {

    }
    public BuletoDriver(ChromeOptions options) {
        super(options);
    }

    public void setGridChecker(GridChecker gridChecker) {
        this.gridChecker = gridChecker;
    }

    public void setBulletWaveChecker(BulletWaveChecker bulletWaveChecker) {
        this.bulletWaveChecker = bulletWaveChecker;
    }

    public void setGrid(Grid grid) {
        this.grid = grid;
    }

    public void login() {
        DevTools devTools = getDevTools();
        devTools.createSession();

        devTools.send(Network.enable(Optional.empty(), Optional.empty(), Optional.empty()));

        devTools.addListener(Network.requestWillBeSent(), request -> {
            System.out.println("Request URL: " + request.getRequest().getUrl());
        });

        get("https://buleto.com/login");
        findElement(By.name("login")).sendKeys("pi6.3.141592@gmail.com");
        findElement(By.name("password")).sendKeys("factorial(6)=720");
        //        findElement(By.name("login")).sendKeys("makkambaevdastan@gmail.com");
        //        findElement(By.name("password")).sendKeys("123456789Dastan");
        findElement(By.className("common-form__submit")).click();
    }

    public void startMonitoring() {
        if (gridChecker != null && bulletWaveChecker != null && grid != null) {
            grid.initialize();
            executorService.submit(() -> {
                while (running.get()) {
                    gridChecker.run(); // Предполагается, что GridChecker реализует Runnable
                    try {
                        Thread.sleep(100); // Небольшая задержка
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }
                }
            });
            executorService.submit(() -> {
                while (running.get()) {
                    bulletWaveChecker.run(); // Предполагается, что BulletWaveChecker реализует Runnable
                    try {
                        Thread.sleep(100); // Небольшая задержка
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }
                }
            });
        } else {
            throw new IllegalStateException("GridChecker, BulletWaveChecker, and Grid must be set before starting.");
        }
    }

    public void stop() {
        running.set(false);
        executorService.shutdown();
        try {
            if (!executorService.awaitTermination(5, TimeUnit.SECONDS)) {
                executorService.shutdownNow();
            }
        } catch (InterruptedException e) {
            executorService.shutdownNow();
            Thread.currentThread().interrupt();
        }
    }

    @Override
    public void run() {
        try {
            login();
            startMonitoring();
            // Держим поток живым, пока running == true
            while (running.get()) {
                Thread.sleep(100);
            }
        } catch (InterruptedException e) {
            System.err.println("Прерывание потока драйвера: " + e.getMessage());
            stop();
        } finally {
            stop();
            quit(); // Закрываем браузер в потоке
        }
    }

    @Override
    public void quit() {
        stop(); // Убедимся, что задачи завершены
        super.quit(); // Вызов метода quit() из ChromeDriver
    }
}