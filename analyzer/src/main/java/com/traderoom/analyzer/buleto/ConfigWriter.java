package com.traderoom.analyzer.buleto;

import com.traderoom.core.io.IOFactory;
import com.traderoom.core.io.Output;
import com.traderoom.core.io.text.TextOutput;
import com.traderoom.core.logging.FastLogger;
import com.traderoom.strategy.model.context.Config;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.util.Set;

import static com.traderoom.analyzer.buleto.BuletoConstants.OPTIONS;

public final class ConfigWriter {

    private ConfigWriter() {
    }

    public static void write(String directory, Set<Config> configs) {
        configs.forEach(config -> write(directory, config));
    }

    public static void write(String directory, Config config) {
        String name = "_"+ config.name();
        String cleanName = name.endsWith(".yml") ? name : name + ".yml";
        try (Output rawWriter = IOFactory.writerOf(Path.of(directory + "\\" + cleanName), BuletoConstants.OPTIONS)) {
            TextOutput writer = rawWriter.text(StandardCharsets.US_ASCII);
            writer.print("name: ").println(config.name());
            writer.print("rouletteType: ").println(config.rouletteType());
            writer.print("minBet: ").println(config.minBet().longValue());
            writer.print("maxBet: ").println(config.maxBet().longValue());
            writer.print("startBalance: ").println(config.startBalance().longValue());
            writer.print("tableLimit: ").println(config.tableLimit().longValue());
            writer.print("stopLossPercentage: ").println(config.stopConfig().stopLossPercentage().intValue());
            writer.print("takeProfitPercentage: ").println(config.stopConfig().takeProfitPercentage().intValue());
            writer.print("trailingStopPercentage: ").println(config.stopConfig().trailingStopPercentage().intValue());
            writer.print("maxDrawdownPercentage: ").println(config.stopConfig().maxDrawdownPercentage().intValue());
            writer.print("maxWinStreak: ").println(config.stopConfig().maxWinStreak().intValue());
            writer.print("maxLossStreak: ").println(config.stopConfig().maxLossStreak().intValue());
            writer.print("maxRounds: ").println(config.stopConfig().maxRounds().longValue());
            writer.print("maxBetBalancePercentage: ").println(config.stopConfig().maxBetBalancePercentage().doubleValue(), 2);
            writer.print("stagnationWindow: ").println(config.stopConfig().stagnationWindow().intValue());
            writer.print("minWinRateThreshold: ").println(config.stopConfig().minWinRateThreshold().doubleValue(), 2);
            writer.print("minRoundsForWinRate: ").println(config.stopConfig().minRoundsForWinRate().longValue());
        } catch (IOException e) {
            FastLogger.error(e);
        }
    }
}
