package com.buleto.core.util;

import com.buleto.core.model.Day;
import com.buleto.core.model.Round;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

public final class DayUtil {

    private DayUtil() {
    }

    public static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyyMMdd");
    public static final long MILLI_DAY = 86_400_000L;

    public static Day day(Round round) {
        return round == null ? Day.now() : day(round.victoryTime());
    }

    public static Day day(long time) {
        var start = Math.floorDiv(time, MILLI_DAY) * MILLI_DAY;
        var end = start + MILLI_DAY - 1;
        var date = Instant.ofEpochMilli(start)
                .atZone(ZoneOffset.UTC)
                .toLocalDate();
        return new Day(date, start, end);
    }

    public static Day day(LocalDate date) {
        if (date == null) return Day.now();
        var start = date.atStartOfDay(ZoneOffset.UTC).toInstant().toEpochMilli();
        var end = start + MILLI_DAY - 1;
        return new Day(date, start, end);
    }

    public static String fileName(Round round) {
        return fileName(round == null ? Instant.now().toEpochMilli() : round.victoryTime());
    }

    public static String fileName(long epoch) {
        return fileName(Instant.ofEpochMilli(epoch).atZone(ZoneOffset.UTC).toLocalDate());
    }

    public static String fileName(LocalDate day) {
        return day == null ? LocalDate.now().format(FORMATTER) : day.format(FORMATTER);
    }
}
