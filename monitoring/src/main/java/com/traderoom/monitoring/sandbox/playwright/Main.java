package com.traderoom.monitoring.sandbox.playwright;

import com.traderoom.monitoring.sandbox.playwright.email.MailSenderStream;
import com.traderoom.monitoring.sandbox.playwright.repository.TimelineRepository;
import com.traderoom.monitoring.sandbox.playwright.service.TimelineService;
import com.microsoft.playwright.Page;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class Main {
    public static Properties properties;

    static {
        try {
            properties = new Properties();
            ClassLoader loader = Thread.currentThread().getContextClassLoader();
            InputStream stream = loader.getResourceAsStream("application.properties");
            properties.load(stream);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        String email = properties.getProperty("buleto.sender.email");
        String password = properties.getProperty("buleto.sender.password");
        String recipient = properties.getProperty("buleto.recipient.email");

        MailSenderStream mailSenderStream = new MailSenderStream(email, password, recipient);
        TimelineService<Page> service = new TimelineRepository<>();

        Monitor monitor = new Monitor(service, mailSenderStream);
        monitor.start();
        Runtime.getRuntime().addShutdownHook(new Thread(monitor::stop));
    }
}
