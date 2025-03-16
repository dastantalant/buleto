package com.traderoom.bet.test.version2;


import org.openqa.selenium.chrome.ChromeOptions;

public class Main {
    public static void main(String[] args) {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless"); // Включение headless-режима
        options.addArguments("--disable-gpu"); // Отключение GPU (рекомендуется в headless)
        options.addArguments("--no-sandbox"); // Для стабильности в некоторых системах
        options.addArguments("--disable-dev-shm-usage"); // Для избежания ошибок в контейнерах

        BuletoDriver driver = new BuletoDriver(options);
        Thread driverThread = new Thread(driver);

        try {
            Grid grid = new Grid(driver);
            GridService gridService = new GridService();
            GridChecker gridChecker = new GridChecker(driver, grid, gridService);

            BulletWave bulletWave = new BulletWave();
            BulletWaveService bulletWaveService = new BulletWaveService();
            BulletWaveChecker bulletWaveChecker = new BulletWaveChecker(driver, bulletWave, bulletWaveService);

            driver.setGridChecker(gridChecker);
            driver.setBulletWaveChecker(bulletWaveChecker);
            driver.setGrid(grid);

            driverThread.start();

            // Ждем завершения потока или прерывания
            driverThread.join();
        } catch (InterruptedException e) {
            System.err.println("Прерывание основного потока: " + e.getMessage());
            driver.stop();
            driver.quit();
        } finally {
            driver.stop();  // Останавливаем задачи
            driver.quit();  // Закрываем браузер
        }
    }
}