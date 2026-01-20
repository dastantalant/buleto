package com.traderoom.strategy.config;

import com.traderoom.strategy.model.context.Config;

import lombok.extern.slf4j.Slf4j;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Slf4j
public enum ConfigHolder {
    CONFIG_HOLDER;

    private final ConcurrentMap<String, Config> configs = new ConcurrentHashMap<>();

    static {
        List<Config> configs = ConfigLoader.load("config.yml");
        if (configs.isEmpty()) {
            log.warn("load config failed, no config found!");
        }
        CONFIG_HOLDER.add(configs);
    }
    public ConfigHolder add(Config config) {
        configs.put(config.name(), config);
        return this;
    }

    public ConfigHolder add(Config... configs) {
        for (Config config : configs) {
            this.configs.put(config.name(), config);
        }
        return this;
    }

    public ConfigHolder add(Collection<Config> configs) {
        for (Config config : configs) {
            this.configs.put(config.name(), config);
        }
        return this;
    }

    public Optional<Config> get(String name) {
        return Optional.ofNullable(configs.get(name));
    }

    public Config remove(String name) {
        return configs.remove(name);
    }

    public void clear() {
        configs.clear();
    }

    public  Collection<Config> getAll() {
        return configs.values();
    }

    public Map<String, Config> map() {
        return configs;
    }
}