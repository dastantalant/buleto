package com.traderoom.bet.service;

import jakarta.validation.constraints.Min;

public interface VictoryService {
    long DAY = 86_400_000;
    long HOUR = 3_600_000;

    String findAllByBetween(long from, long to);

    default String findAllByDay(long day) {
        if (day < DAY) {
            day = System.currentTimeMillis();
        }
        long start = day - (day % DAY);
        long end = start + DAY;
        return findAllByBetween(start, end);
    }

    default String findAllByHour(long hour) {
        if (hour < HOUR) {
            hour = System.currentTimeMillis();
        }
        long start = hour - (hour % HOUR);
        long end = start + HOUR;
        return findAllByBetween(start, end);
    }

    default String findAllByHourCount(long start, long count) {
        if (start < HOUR) {
            start = System.currentTimeMillis();
        }
        long from = start - (start % HOUR);
        long to = from + count * HOUR;
        return findAllByBetween(from, to);
    }

   default String findAllStatisticByDay(long day){
        if (day < DAY) {
            day = System.currentTimeMillis();
        }
        long start = day - (day % DAY);
        long end = start + DAY;
        return findAllStatisticByBetween(start, end);
    }

    String findAllStatisticByBetween(long start, long end);

    String findAllWithLineByBetween(long from, long to);
}
