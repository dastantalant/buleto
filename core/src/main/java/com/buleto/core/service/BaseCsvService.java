package com.buleto.core.service;

import com.buleto.core.model.Round;
import com.buleto.core.util.DayUtil;
import com.buleto.core.util.RoundUtil;
import com.toolbox.core.csv.FastCsvWriter;
import com.toolbox.core.logging.FastLogger;

import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.List;
import java.util.concurrent.CompletableFuture;

import static java.nio.file.StandardOpenOption.CREATE_NEW;

public class BaseCsvService implements CsvService {

    private final RoundRepository dao;
    private final String dir;
    private LocalDate today;

    public BaseCsvService(RoundRepository dao) {
        this(dao, "csv");
    }

    public BaseCsvService(RoundRepository dao, String dir) {
        this.dao = dao;
        this.dir = dir;
        today = LocalDate.now(ZoneOffset.UTC);
    }

    @Override
    public void onVictory(Round round) {
        var now = LocalDate.now(ZoneOffset.UTC);
        if (now.isBefore(today)) {
            CompletableFuture.runAsync(this::save);
            today = now;
        }
    }

    private void save() {
        var rounds = dao.findAllBy(DayUtil.day(today));
        if (rounds == null || rounds.isEmpty()) return;
        save(rounds);
    }

    @Override
    public void save(List<Round> list) {
        try {
            var group = RoundUtil.group(list);
            for (var entry : group.entrySet()) {
                var fileName = DayUtil.fileName(entry.getKey().date()) + ".csv";
                var path = Paths.get(dir, fileName);
                var rounds = entry.getValue();
                rounds.addAll(RoundUtil.read(path));
                FastCsvWriter.write(RoundUtil.sort(rounds), path, CREATE_NEW);
                FastLogger.info("CSV Write Success: {}", fileName);
            }
        } catch (IOException e) {
            FastLogger.error("CSV Write Error: ", e);
        }
    }

    @Override
    public void close() throws IOException {
    }
}
