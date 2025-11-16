package com.traderoom.monitoring.round;

import com.traderoom.monitoring.round.email.MailSenderStream;
import com.traderoom.monitoring.round.monitor.Monitor;
import com.traderoom.monitoring.round.monitor.Round;
import com.traderoom.monitoring.round.repository.TimelineRepository;
import com.traderoom.monitoring.round.service.TimelineService;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.chromium.ChromiumDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;
import java.time.Instant;
import java.util.Properties;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class Main {
    private static final Logger logger = LoggerFactory.getLogger(Main.class);
    private static final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
    private static Monitor monitor;

    public static Properties properties;
    public static MailSenderStream mailSenderStream;
    private static TimelineService timelineService;

    static {
        try {
            properties = new Properties();
            ClassLoader loader = Thread.currentThread().getContextClassLoader();
            InputStream stream = loader.getResourceAsStream("application.properties");
            properties.load(stream);
            String sender = properties.getProperty("buleto.sender.email");
            String password = properties.getProperty("buleto.sender.password");
            String recipient = properties.getProperty("buleto.recipient.email");
            mailSenderStream = new MailSenderStream(sender, password, recipient);
        } catch (IOException e) {
            logger.error("Ошибка при загрузке свойств", e);
        }
    }

    public static void main(String[] args) {
//        System.setProperty("webdriver.chrome.driver", "C:\\Users\\User\\IdeaProjects\\testselenium\\drivers\\chromedriver.exe");
//        System.setProperty("webdriver.chrome.binary", "C:\\Users\\User\\Downloads\\chrome-win\\chrome-win\\chrome.exe");
//        String chromeDriver = properties.getProperty("browser.chrome.driver");

        System.setProperty("webdriver.chrome.driver", "/usr/local/bin/chromedriver");
        System.setProperty("webdriver.chrome.binary", "/usr/local/bin/chrome-headless-shell");
        timelineService = new TimelineRepository();

        startMonitor();
        scheduler.scheduleAtFixedRate(() -> {
            try {
                logger.info("Запланирован перезапуск Monitor...");
                restartMonitor();
                mailSenderStream.sendToMe("Монитор перезапущен",
                        "Монитор был перезапущен в " + Instant.now());
                logger.info("Перезапуск Monitor выполнен успешно");
            } catch (Exception e) {
                logger.error("Ошибка при перезапуске Monitor: " + e.getMessage());
                mailSenderStream.sendToMe("Ошибка при перезапуске Monitor " + Instant.now(),
                        "Произошла ошибка: " + e.getMessage());
            }
        }, 24, 24, TimeUnit.HOURS);

        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            logger.info("Shutdown hook: завершение Monitor...");
            shutdownMonitor();
            scheduler.shutdown();
            mailSenderStream.sendToMe("Приложение остановлено", "Приложение остановлено");
        }));
    }

    public static void startMonitor() {
        monitor = new Monitor(timelineService, createDriver());
        monitor.run();
        logger.info("Monitor запущен");
        Future<Boolean> emailResult = mailSenderStream.sendToMe(
                "Монитор запущен",
                "Монитор успешно запущен в " + Instant.now()
        );
        try {
            if (emailResult.get()) {
                logger.info("Уведомление о запуске монитора успешно отправлено");
            } else {
                logger.error("Не удалось отправить уведомление о запуске монитора");
            }
        } catch (InterruptedException | ExecutionException e) {
            logger.error("Ошибка при отправке уведомления о запуске: " + e.getMessage());
        }
    }

    public static void restartMonitor() {
        shutdownMonitor();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            logger.error("Прерывание при ожидании перезапуска: " + e.getMessage());
        }
        startMonitor();
    }

    private static void shutdownMonitor() {
        if (monitor != null) {
            monitor.shutdown();
            monitor = null;
            logger.info("Monitor успешно остановлен для перезапуска");
            Round.killChromeProcesses();
        }
    }

    private static WebDriver createDriver() {
        System.setProperty("webdriver.chrome.driver", "/usr/local/bin/chromedriver");
        System.setProperty("webdriver.chrome.binary", "/usr/local/bin/chrome-headless-shell");
        ChromeOptions options = new ChromeOptions();

//        options.setBinary(new File(properties.getProperty("browser.chrome.shell")));
//        options.addArguments("--headless=new", "--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu");
//        options.addArguments("--disable-cache");
//        options.addArguments("--disk-cache-size=0");
////        options.addArguments("--start-maximized");

        options.setBinary("/usr/local/bin/chrome-headless-shell"); // Укажите путь к chrome-headless-shell
//        options.addArguments("--headless=new"); // Headless-режим
//        options.addArguments("--no-sandbox"); // Для серверов
//        options.addArguments("--disable-dev-shm-usage"); // Обход ограничений памяти
//        options.addArguments("--remote-allow-origins=*"); // Разрешить все источники
//        options.addArguments("--user-data-dir=/tmp/chrome-user-data-" + System.currentTimeMillis());
//        options.addArguments("--incognito");
        return new ChromeDriver(options);

//        System.setProperty("webdriver.gecko.driver", "/usr/local/bin/geckodriver");
//        FirefoxOptions options = new FirefoxOptions();
//        options.addArguments("--headless");
//        FirefoxDriver driver = new FirefoxDriver();
//        return driver;
    }
}