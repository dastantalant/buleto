package com.buleto.core.util;

import com.buleto.core.model.Day;
import com.buleto.core.model.Round;
import com.toolbox.core.csv.CsvReader;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.nio.file.StandardOpenOption.CREATE;

public final class RoundUtil {
    private RoundUtil() {
    }

    public static List<Round> read(String dir, String fileName) throws IOException {
        return read(Paths.get(dir, fileName));
    }

    public static List<Round> read(Path path) throws IOException {
        return read(Files.newInputStream(path, CREATE));
    }

    public static List<Round> read(InputStream is) {
        try {
            return sort(CsvReader.read(Round.class, is));
        } catch (Exception _) {
            return new ArrayList<>();
        }
    }

    public static List<Round> sort(List<Round> rounds) {
        if (rounds == null || rounds.isEmpty()) return List.of();
        rounds.sort(Comparator.comparingLong(Round::roundId));
        return rounds;
    }

    public static Map<Day, List<Round>> group(List<Round> rounds) {
        if (rounds == null || rounds.isEmpty()) return Map.of();
        var map = new HashMap<Day, List<Round>>();
        var sort = sort(rounds);
        var day = DayUtil.day(sort.getFirst());
        var start = day.start();
        var end = day.end();
        for (Round round : sort) {
            if (!(start <= round.victoryTime() && round.victoryTime() <= end)) {
                day = DayUtil.day(round);
                start = day.start();
                end = day.end();
            }
            map.getOrDefault(day, new ArrayList<>()).add(round);
        }
        return map;
    }
}
