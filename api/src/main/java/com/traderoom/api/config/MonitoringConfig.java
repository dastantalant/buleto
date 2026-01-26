package com.traderoom.api.config;

import com.traderoom.core.Client;
import com.traderoom.monitoring.client.BuletoClient;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MonitoringConfig {
    @Bean(destroyMethod = "stop")
    public Client startMonitoring() {
        return BuletoClient.newStart();
    }
}