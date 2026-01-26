//package com.traderoom.strategy.buleto;
//
//import com.traderoom.core.io.text.FastTextWriter;
//import com.traderoom.core.logging.FastLogger;
//import com.traderoom.strategy.model.context.Config;
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
//        writer.append("stopLossPercentage: ").append(config.stopConfig().stopLossPercentage()).newLine();
//        writer.append("takeProfitPercentage: ").append(config.stopConfig().takeProfitPercentage()).newLine();
//        writer.append("trailingStopPercentage: ").append(config.stopConfig().trailingStopPercentage()).newLine();
//        writer.append("maxDrawdownPercentage: ").append(config.stopConfig().maxDrawdownPercentage()).newLine();
//        writer.append("maxWinStreak: ").append(config.stopConfig().maxWinStreak()).newLine();
//        writer.append("maxLossStreak: ").append(config.stopConfig().maxLossStreak()).newLine();
//        writer.append("maxRounds: ").append(config.stopConfig().maxRounds()).newLine();
//        writer.append("maxBetBalancePercentage: ").append(config.stopConfig().maxBetBalancePercentage()).newLine();
//        writer.append("stagnationWindow: ").append(config.stopConfig().stagnationWindow()).newLine();
//        writer.append("minWinRateThreshold: ").append(config.stopConfig().minWinRateThreshold()).newLine();
//        writer.append("minRoundsForWinRate: ").append(config.stopConfig().minRoundsForWinRate()).newLine();
//    }
//
//    @Override
//    public void close() throws Exception {
//        if (writer != null) {
//            writer.close();
//        }
//    }
//}
