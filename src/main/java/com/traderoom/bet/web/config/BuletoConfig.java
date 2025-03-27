package com.traderoom.bet.web.config;

import java.io.File;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BuletoConfig {

//    @Bean
    public ChromeOptions chromeOptions(@Value("${browser.chrome.shell}") String chromeShell) {
        ChromeOptions options = new ChromeOptions();
        options.setBinary(new File(chromeShell));
        options.addArguments("--headless=new", "--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu");
        return options;
    }
}
