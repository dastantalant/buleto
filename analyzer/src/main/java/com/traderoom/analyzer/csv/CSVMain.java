package com.traderoom.analyzer.csv;

import com.traderoom.core.csv.CsvReader;
import com.traderoom.common.model.Round;
import com.traderoom.common.service.RoundDAO;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.LinkedList;
import java.util.List;

public class CSVMain {
    static void main() throws Exception {
        var path = Paths.get("D:\\other\\buleto-backup\\rounds");
        try (var stream = Files.list(path)) {
            List<Path> list = stream.filter(Files::isRegularFile)
                    .filter(p -> p.toString().toLowerCase().endsWith(".csv"))
                    .toList();
            var all = new LinkedList<Round>();
            for (Path p : list) {
                all.addAll(CsvReader.read(Round.class, Files.newInputStream(p)));
            }
            try (var dao = new RoundDAO()) {
                dao.saveAll(all);
            }
        }
    }
}
