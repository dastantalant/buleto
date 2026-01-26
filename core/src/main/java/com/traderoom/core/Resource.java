package com.traderoom.core;

import java.io.IOException;
import java.util.Properties;

public class Resource {
    private final Properties properties;

    public Resource() throws IOException {
        this("application.properties");
    }

    public Resource(String propertiesFile) throws IOException {
        properties = new Properties();
        properties.load(Thread.currentThread().getContextClassLoader().getResourceAsStream(propertiesFile));
    }

    public String get(String key) {
        return properties.getProperty(key);
    }
}
