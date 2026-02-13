package com.traderoom.web.config;

import com.traderoom.common.websocket.Client;
import com.traderoom.common.service.SaveSubscriber;

import org.springframework.context.annotation.Bean;

//@Configuration
public class MonitoringConfig {
    @Bean(destroyMethod = "stop")
    public Client startMonitoring() {
        return Client.of("wss://buleto.com/ws", new SaveSubscriber()).start();
    }
}