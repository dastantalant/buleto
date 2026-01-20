package com.traderoom.strategy.simulation.buleto;

import com.traderoom.strategy.library.FastTextWriter;
import com.traderoom.strategy.model.context.Config;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

public class ConfigWriter implements AutoCloseable {

    private final FastTextWriter writer;
    private final Config config;

    public ConfigWriter(String directory, Config config) throws IOException {
        Files.createDirectories(Paths.get(directory));
        String name = config.name();
        String cleanName = name.endsWith(".yml") ? name : name + ".yml";
        OutputStream out = Files.newOutputStream(Path.of(directory + "/" + "_CONFIG_" + cleanName),
                StandardOpenOption.CREATE,
                StandardOpenOption.TRUNCATE_EXISTING,
                StandardOpenOption.WRITE);

        this.config = config;
        writer = new FastTextWriter(out, 64 * 1024);
    }

    public static Config write(String directory, Config config) throws Exception {
        try (ConfigWriter write = new ConfigWriter(directory, config)) {
            write.writeInternal();
        }
        return config;
    }

    private void writeInternal() throws IOException {
        writer.put("name: ").put(config.name()).newLine();
        writer.put("rouletteType: ").put(config.rouletteType()).newLine();
        writer.put("minBet: ").put(config.name()).newLine();
        writer.put("maxBet: ").put(config.maxBet()).newLine();
        writer.put("startBalance: ").put(config.startBalance()).newLine();
        writer.put("tableLimit: ").put(config.tableLimit()).newLine();

        writer.put("stopLossPercentage: ").put(config.stopConfig().stopLossPercentage()).newLine();
        writer.put("takeProfitPercentage: ").put(config.stopConfig().takeProfitPercentage()).newLine();
        writer.put("trailingStopPercentage: ").put(config.stopConfig().trailingStopPercentage()).newLine();
        writer.put("maxDrawdownPercentage: ").put(config.stopConfig().maxDrawdownPercentage()).newLine();
        writer.put("maxWinStreak: ").put(config.stopConfig().maxWinStreak()).newLine();
        writer.put("maxLossStreak: ").put(config.stopConfig().maxLossStreak()).newLine();
        writer.put("maxRounds: ").put(config.stopConfig().maxRounds()).newLine();
        writer.put("maxBetBalancePercentage: ").put(config.stopConfig().maxBetBalancePercentage()).newLine();
        writer.put("stagnationWindow: ").put(config.stopConfig().stagnationWindow()).newLine();
        writer.put("minWinRateThreshold: ").put(config.stopConfig().minWinRateThreshold()).newLine();
        writer.put("minRoundsForWinRate: ").put(config.stopConfig().minRoundsForWinRate()).newLine();
    }

    @Override
    public void close() throws Exception {
        if (writer != null) {
            writer.close();
        }
    }
}
