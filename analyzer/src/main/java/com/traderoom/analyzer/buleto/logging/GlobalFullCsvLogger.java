package com.traderoom.analyzer.buleto.logging;

import com.traderoom.analyzer.buleto.GlobalSnapshot;
import com.traderoom.core.csv.FastCsvWriter;
import com.traderoom.core.io.IOFactory;
import com.traderoom.core.io.Output;
import com.traderoom.core.logging.FastLogger;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static com.traderoom.analyzer.buleto.BuletoConstants.OPTIONS;


public class GlobalFullCsvLogger implements AutoCloseable {

    private final FastCsvWriter<GlobalSnapshot> writer;

    public GlobalFullCsvLogger(String directory, String fileName) throws IOException {
        Files.createDirectories(Paths.get(directory));
        String cleanName = fileName.endsWith(".csv") ? fileName : fileName + ".csv";

        Output output = IOFactory.writerOf(Path.of(directory + "/" + cleanName), OPTIONS);
        writer = new FastCsvWriter<>(GlobalSnapshot.class, output);
    }

    public void onRound(GlobalSnapshot snapshot) {
        try {
            writer.write(snapshot);
        } catch (Throwable e) {
            FastLogger.error(e);
        }
    }

    @Override
    public void close() throws IOException {
        try {
            if (writer != null) {
                writer.flush();
                writer.close();
            }
        } catch (Throwable e) {
            FastLogger.error(e);
        }
    }
}