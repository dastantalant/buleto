package com.traderoom.strategy.config;

import com.traderoom.strategy.model.context.Config;
import org.yaml.snakeyaml.Yaml;

import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;

import java.io.InputStream;
import java.util.Collections;
import java.util.List;

@Slf4j
@UtilityClass
public class ConfigLoader {

    public static List<Config> load(String resource) {
        InputStream in = ConfigLoader.class
                .getClassLoader()
                .getResourceAsStream(resource);

        if (in == null) {
            throw new IllegalStateException("Config not found: " + resource);
        }

        ConfigProperties root = new Yaml().loadAs(in, ConfigProperties.class);

        if (root.getConfig() == null || root.getConfig().isEmpty()) {
            log.warn("Config list is empty");
            return Collections.emptyList();
        }

        RawConfig defaults = root.getConfig().getFirst();

        return root.getConfig().stream()
                .map(config -> ConfigMerger.merge(defaults, config))
                .toList();
    }
}
