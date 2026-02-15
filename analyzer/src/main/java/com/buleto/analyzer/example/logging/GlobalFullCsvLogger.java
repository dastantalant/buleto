//package com.traderoom.analyzer.buleto.logging;
//
//import com.traderoom.analyzer.buleto.model.FinalSnapshot;
//import com.toolbox.core.csv.FastCsvWriter;
//import com.toolbox.core.io.IOFactory;
//import com.toolbox.core.io.Output;
//import com.toolbox.core.logging.FastLogger;
//
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//
//import static com.traderoom.analyzer.buleto.BuletoConstants.OPTIONS;
//
//
//public class GlobalFullCsvLogger implements AutoCloseable {
//
//    private final FastCsvWriter<FinalSnapshot> writer;
//
//    public GlobalFullCsvLogger(String directory, String fileName) throws IOException {
//        Files.createDirectories(Paths.get(directory));
//        String cleanName = fileName.endsWith(".csv") ? fileName : fileName + ".csv";
//
//        Output output = IOFactory.writerOf(Path.of(directory + "/" + cleanName), OPTIONS);
//        writer = new FastCsvWriter<>(FinalSnapshot.class, output);
//    }
//
//    public void onRound(FinalSnapshot snapshot) {
//        try {
//            writer.write(snapshot);
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