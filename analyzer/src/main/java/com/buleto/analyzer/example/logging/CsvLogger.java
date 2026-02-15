//package com.traderoom.analyzer.buleto.logging;
//
//import com.toolbox.core.csv.FastCsvWriter;
//import com.toolbox.core.io.IOFactory;
//import com.toolbox.core.io.Output;
//import com.toolbox.core.logging.FastLogger;
//import com.trading.roulette.api.model.Snapshot;
//
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//
//import static com.traderoom.analyzer.buleto.BuletoConstants.OPTIONS;
//
//public class CsvLogger implements AutoCloseable {
//
//    private final FastCsvWriter<Snapshot> writer;
//
//    public CsvLogger(String directory, String strategy) throws IOException {
//        Files.createDirectories(Paths.get(directory));
//        String fileName = strategy.endsWith(".csv") ? strategy : strategy + ".csv";
//
//        Output output = IOFactory.writerOf(Path.of(directory + "/" + fileName),OPTIONS);
//        writer = new FastCsvWriter<>(Snapshot.class, output);
//    }
//
//    public void onRound(Snapshot s) {
//        try {
//            writer.write(s);
//        } catch (Throwable e) {
//            FastLogger.error(e);
//        }
//    }
//
//    @Override
//    public void close() throws IOException {
//        try {
//            if (writer != null) {
//                writer.flush();
//                writer.close();
//            }
//        } catch (Throwable e) {
//            FastLogger.error(e);
//        }
//    }
//}