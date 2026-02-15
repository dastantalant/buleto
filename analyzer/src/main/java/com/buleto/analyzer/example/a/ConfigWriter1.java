//package com.traderoom.strategy.buleto;
//
//import com.toolbox.core.io.text.FastTextWriter;
//import com.toolbox.core.logging.FastLogger;
//import com.trading.roulette.api.config.Config;
//
//import java.io.IOException;
//import java.io.OutputStream;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.nio.file.StandardOpenOption;
//
//@Deprecated
//public class ConfigWriter1 implements AutoCloseable {
//
//    private final FastTextWriter writer;
//    private final Config config;
//
//    public ConfigWriter1(String directory, Config config) throws IOException {
//        Files.createDirectories(Paths.get(directory));
//        String name = config.name();
//        String cleanName = name.endsWith(".yml") ? name : name + ".yml";
//        OutputStream out = Files.newOutputStream(Path.of(directory + "/" + "_CONFIG_" + cleanName),
//                StandardOpenOption.CREATE,
//                StandardOpenOption.TRUNCATE_EXISTING,
//                StandardOpenOption.WRITE);
//
//        this.config = config;
//        writer = new FastTextWriter(out, 64 * 1024);
//    }
//
//    public static Config write(String directory, Config config)  {
//        try (ConfigWriter1 write = new ConfigWriter1(directory, config)) {
//            write.writeInternal();
//        } catch (Exception e){
//            FastLogger.error("Error while writing config file", e);
//        }
//        return config;
//    }
//
//    private void writeInternal() throws IOException {
//        writer.append("name: ").append(config.name()).newLine();
//        writer.append("rouletteType: ").append(config.rouletteType()).newLine();
//        writer.append("minBet: ").append(config.name()).newLine();
//        writer.append("maxBet: ").append(config.maxBet()).newLine();
//        writer.append("startBalance: ").append(config.startBalance()).newLine();
//        writer.append("tableLimit: ").append(config.tableLimit()).newLine();
//
//        writer.append("stopLossPercentageStop: ").append(config.stopConfig().stopLossPercentageStop()).newLine();
//        writer.append("takeProfitPercentageStop: ").append(config.stopConfig().takeProfitPercentageStop()).newLine();
//        writer.append("trailingStopPercentageStop: ").append(config.stopConfig().trailingStopPercentageStop()).newLine();
//        writer.append("maxDrawdownPercentageStop: ").append(config.stopConfig().maxDrawdownPercentageStop()).newLine();
//        writer.append("maxWinStreakStop: ").append(config.stopConfig().maxWinStreakStop()).newLine();
//        writer.append("maxLossStreakStop: ").append(config.stopConfig().maxLossStreakStop()).newLine();
//        writer.append("maxRoundsStop: ").append(config.stopConfig().maxRoundsStop()).newLine();
//        writer.append("maxBetBalancePercentageLimit: ").append(config.stopConfig().maxBetBalancePercentageLimit()).newLine();
//        writer.append("stagnationWindowStop: ").append(config.stopConfig().stagnationWindowStop()).newLine();
//        writer.append("minWinRateThresholdLimit: ").append(config.stopConfig().minWinRateThresholdLimit()).newLine();
//        writer.append("minRoundsForWinRateStop: ").append(config.stopConfig().minRoundsForWinRateStop()).newLine();
//    }
//
//    @Override
//    public void close() throws Exception {
//        if (writer != null) {
//            writer.close();
//        }
//    }
//}
