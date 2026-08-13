package com.buleto.analyzer.csv;

import com.toolbox.core.csv.CsvReader;
import com.buleto.core.model.Round;
import com.buleto.core.service.RoundPostgresDAO;

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
            try (var dao = new RoundPostgresDAO()) {
                dao.saveAll(all);
            }
        }
    }
}
