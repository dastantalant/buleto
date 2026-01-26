package com.traderoom.monitoring.service;

import com.traderoom.core.io.text.FastTextWriter;
import com.traderoom.core.logging.FastLogger;
import com.traderoom.monitoring.model.Round;
import com.traderoom.monitoring.api.SaveService;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class CsvService implements SaveService {

    private final String dir;
    private final DateTimeFormatter fmt;
    private FastTextWriter writer;
    private String currentDateStr;

    public CsvService(String dir) {
        this.dir = dir;
        fmt = DateTimeFormatter.ofPattern("yyyyMMdd");
        new File(dir).mkdirs();
    }

    public Round save(Round round) {
        if (round == null) return null;
        try {
            rotateFileIfNeeded();
            writer.append(round.roundId()).append(',')
                    .append(round.cell()).append(',')
                    .append(round.factor()).append(',')
                    .append(round.startTime()).append(',')
                    .append(round.victoryTime())
                    .newLine();
            writer.flush();
        } catch (IOException e) {
            FastLogger.error("CSV Write Error: ", e);
        }
        return round;
    }

    private void rotateFileIfNeeded() throws IOException {
        String today = LocalDate.now().format(fmt);
        if (!today.equals(currentDateStr) || writer == null) {
            close();
            File file = new File(dir, today + ".csv");
            boolean isNewFile = !file.exists();
            writer = new FastTextWriter(new FileOutputStream(file, true));
            currentDateStr = today;
            if (isNewFile) {
                writer.append("id,cell,factor,start_time,victory_time").newLine();
                writer.flush();
            }
            FastLogger.info("Rotated CSV file to: " + file.getName());
        }
    }

    public void close() {
        if (writer != null) {
            try {
                writer.close();
            } catch (IOException _) {
            }
            writer = null;
        }
    }
}