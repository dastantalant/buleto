package com.buleto.analyzer.example;

import com.buleto.analyzer.BuletoConstants;
import com.toolbox.core.io.IOFactory;
import com.toolbox.core.io.Output;
import com.toolbox.core.io.text.TextOutput;
import com.toolbox.core.logging.FastLogger;
import com.trading.roulette.api.model.config.Config;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.util.Set;

public final class ConfigWriter {

    private ConfigWriter() {
    }

    public static void write(String directory, Set<Config> configs) {
        configs.forEach(config -> write(directory, config));
    }

    public static void write(String directory, Config config) {
        String name = "_" + config.name();
        String cleanName = name.endsWith(".yml") ? name : name + ".yml";
        try (Output rawWriter = IOFactory.writerOf(Path.of(directory + "\\" + cleanName), BuletoConstants.OPTIONS)) {
            TextOutput writer = rawWriter.text(StandardCharsets.US_ASCII);
            writer.print("name: ").println(config.name());
            writer.print("rouletteType: ").println(config.rouletteType());
            writer.print("minBet: ").println(config.minBet().longValue());
            writer.print("maxBet: ").println(config.maxBet().longValue());
            writer.print("startBalance: ").println(config.startBalance().longValue());
            writer.print("tableLimit: ").println(config.tableLimit().longValue());
            writer.print("stopLossPercentageStop: ").println(config.stopConfig().stopLossPercentageStop().intValue());
            writer.print("takeProfitPercentageStop: ").println(config.stopConfig().takeProfitPercentageStop().intValue());
            writer.print("trailingStopPercentageStop: ").println(config.stopConfig().trailingStopPercentageStop().intValue());
            writer.print("maxDrawdownPercentageStop: ").println(config.stopConfig().maxDrawdownPercentageStop().intValue());
            writer.print("maxWinStreakStop: ").println(config.stopConfig().maxWinStreakStop().intValue());
            writer.print("maxLossStreakStop: ").println(config.stopConfig().maxLossStreakStop().intValue());
            writer.print("maxRoundsStop: ").println(config.stopConfig().maxRoundsStop().longValue());
            writer.print("stagnationWindowStop: ").println(config.stopConfig().stagnationWindowStop().intValue());
            writer.print("minWinRateThresholdLimit: ").println(config.stopConfig().minWinRateThresholdStop().intValue());
            writer.print("minRoundsForWinRateStop: ").println(config.stopConfig().minRoundsForWinRateStop().longValue());

            writer.print("dangerZoneThresholdRisk: ").println(config.riskConfig().dangerZoneThresholdRisk().intValue());
            writer.print("profitZoneThresholdRisk: ").println(config.riskConfig().profitZoneThresholdRisk().intValue());
            writer.print("normalZoneBetCapRisk: ").println(config.riskConfig().normalZoneBetCapRisk().intValue());
            writer.print("penaltyBoxDurationRisk: ").println(config.riskConfig().penaltyBoxDurationRisk().intValue());

            writer.print("maxBetBalancePercentageLimit: ").println(config.betLimitConfig().maxBetBalancePercentageLimit().intValue());
            writer.print("peakProtectDrawdownStepLimit: ").println(config.betLimitConfig().peakProtectDrawdownStepLimit().intValue());
            writer.print("peakProtectReductionFactorLimit: ").println(config.betLimitConfig().peakProtectReductionFactorLimit().intValue());
            writer.print("minWinRateThresholdLimit: ").println(config.betLimitConfig().minWinRateThresholdLimit().intValue());
            writer.print("minWinRateRoundsLimit: ").println(config.betLimitConfig().minWinRateRoundsLimit().longValue());
            writer.print("floatingMinBetPercentLimit: ").println(config.betLimitConfig().floatingMinBetPercentLimit().intValue());
        } catch (IOException e) {
            FastLogger.error(e);
        }
    }
}
