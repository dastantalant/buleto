package com.buleto.web.config;

import com.buleto.core.websocket.Client;
import com.buleto.core.service.SaveSubscriber;

import org.springframework.context.annotation.Bean;

//@Configuration
public class MonitoringConfig {
    @Bean(destroyMethod = "stop")
    public Client startMonitoring() {
        return Client.base("wss://buleto.com/ws", new SaveSubscriber()).start();
    }
}