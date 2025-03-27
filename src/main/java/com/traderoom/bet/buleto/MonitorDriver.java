package com.traderoom.bet.buleto;

import com.traderoom.bet.buleto.model.round.Round;
import com.traderoom.bet.web.service.TimelineService;
import jakarta.annotation.PreDestroy;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

//@Component
public class MonitorDriver implements CommandLineRunner {

    private final TimelineService timelineService;
    private final ExecutorService executorService;
    private final WebDriver driver;
    @Value("${browser.chrome.driver}")
    private String chromeDriver;
    private Round round;

    public MonitorDriver(TimelineService timelineService, ChromeOptions options) {
        this.timelineService = timelineService;
        System.setProperty("webdriver.chrome.driver", "C:\\browser\\chrome-133.0.6943.141\\chromedriver-win64\\chromedriver.exe");
        driver = new ChromeDriver(options);
        executorService = Executors.newSingleThreadExecutor();
    }

    public void run(String... args) {
        round = new Round(driver, timelineService);
        executorService.submit(round::run);
    }

    @PreDestroy
    public void shutdown() {
        if (round != null) {
            round.shutdown();
        }
        executorService.shutdown();
        try {
            if (!executorService.awaitTermination(5, TimeUnit.SECONDS)) {
                executorService.shutdownNow();
            }
        } catch (InterruptedException e) {
            executorService.shutdownNow();
        }
    }
}
