package com.traderoom.monitoring.socket.config;

import java.io.InputStream;
import java.util.Properties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Resource {
    private static final Logger LOGGER = LoggerFactory.getLogger(Resource.class);
    private static final Properties properties;

    static {
        properties = new Properties();
        try {
            ClassLoader loader = Thread.currentThread().getContextClassLoader();
            InputStream stream = loader.getResourceAsStream("application.properties");
            properties.load(stream);
        } catch (Exception e) {
            LOGGER.error("Failed to load application.properties", e);
        }
    }

    public static String get(String key) {
        return properties.getProperty(key);
    }
}
