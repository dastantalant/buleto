package com.traderoom.common.service;

import com.traderoom.core.io.text.FastTextWriter;
import com.traderoom.core.logging.FastLogger;
import com.traderoom.common.model.Round;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;

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
        String dateStr = getDateStr(round);
        try {
            if (!dateStr.equals(currentDateStr) || writer == null) {
                rotateFile(dateStr);
            }
            writer.append(round.roundId()).append(',')
                    .append(round.cell()).append(',')
                    .append(round.factor()).append(',')
                    .append(round.startTime()).append(',')
                    .append(round.victoryTime()).append(',')
                    .append(round.beginValue()).append(',')
                    .append(round.targetValue()).append(',')
                    .append(round.startValue()).append(',')
                    .append(round.endTime()).append(',')
                    .append(round.closedTime()).append(',')
                    .append(round.targetTime()).append(',')
                    .newLine();
            writer.flush();
        } catch (IOException e) {
            FastLogger.error("CSV Write Error: ", e);
        }
        return round;
    }

    public void saveAll(List<Round> rounds) {
        if (rounds == null || rounds.isEmpty()) return;
        rounds.sort(Comparator.comparingLong(Round::roundId));
        for (Round round : rounds) {
            save(round);
        }
    }

    private void rotateFile(String dateStr) throws IOException {
        close();
        File file = new File(dir, dateStr + ".csv");
        boolean isNewFile = !file.exists();
        writer = new FastTextWriter(new FileOutputStream(file, true));
        currentDateStr = dateStr;
        if (isNewFile) {
            writer.append("id,cell,factor,start_time,victory_time,begin_value,target_value,start_value,end_time,closed_time,target_time").newLine();
            writer.flush();
        }
        FastLogger.info("Rotated CSV file to: " + file.getName());
    }

    private String getDateStr(Round round) {
        return Instant.ofEpochMilli(round.victoryTime())
                .atZone(ZoneId.systemDefault())
                .toLocalDate()
                .format(fmt);
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