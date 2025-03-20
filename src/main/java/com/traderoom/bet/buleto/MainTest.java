package com.traderoom.bet.buleto;

import com.traderoom.bet.buleto.model.round.Round;
import com.traderoom.bet.web.repository.TimelineRepository;
import com.traderoom.bet.web.service.TimelineService;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import java.io.IOException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.JdbcClient;

public class MainTest {

    public static void main(String[] args) throws IOException {
        TimelineService timelineService = getRepository();
        System.setProperty("webdriver.chrome.driver", "C:\\browser\\chrome-133.0.6943.141\\chromedriver-win64\\chromedriver.exe");

        ChromeOptions options = new ChromeOptions();
        options.setBinary("C:\\browser\\chrome-133.0.6943.141\\chrome-headless-shell-win64\\chrome-headless-shell.exe");
        options.addArguments("--headless=new", "--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu");
        WebDriver driver = new ChromeDriver(options);

        try {
            Round round = new Round(driver, timelineService);
            round.run();
        } catch (Exception e) {
            System.err.println("Ошибка выполнения: " + e.getMessage());
        } finally {
            if (driver != null) {
                try {
                    driver.quit();
                    Thread.sleep(1000);
                } catch (Exception e) {
                    System.err.println("Ошибка при закрытии драйвера: " + e.getMessage());
                }
            }
            killChromeProcesses();
        }
    }
    private static void killChromeProcesses() {
        try {
            Runtime.getRuntime().exec("taskkill /F /IM chromedriver.exe");
            Runtime.getRuntime().exec("taskkill /F /IM chrome-headless-shell.exe");
            Thread.sleep(500);
        } catch (Exception e) {
            System.err.println("Ошибка при завершении процессов Chrome: " + e.getMessage());
        }
    }
    private static TimelineService getRepository() throws IOException {
        HikariConfig config = new HikariConfig();
        config.setDriverClassName("org.postgresql.Driver");
        config.setJdbcUrl("jdbc:postgresql://localhost:5432/buleto");
        config.setUsername("postgres");
        config.setPassword("postgres");
        HikariDataSource dataSource = new HikariDataSource(config);

        JdbcClient jdbcClient = JdbcClient.create(dataSource);
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
//        String sql = Files.readString(Paths.get("C:\\Users\\dastan\\home\\github\\buleto\\src\\main\\resources\\db\\DDLv1.sql"));
//        jdbcClient.sql(sql)
//                .update();
        return new TimelineRepository(jdbcClient, jdbcTemplate);
    }
}