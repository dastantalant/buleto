package com.buleto.core.model;

import com.buleto.core.util.DayUtil;

import java.time.Instant;
import java.time.LocalDate;

public record Day(LocalDate date, long start, long end) {
    public static Day now() {
        return DayUtil.day(Instant.now().toEpochMilli());
    }
}