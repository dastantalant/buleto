package com.traderoom.bet.service;

public interface RoundService {
    long DAY = 86_400_000;
    long HOUR = 3_600_000;

    String findAll(int page, int size);

    String findAllBetween(long from, long to);

    default String findAllByDay(long day) {
        if (day < DAY) {
            day = System.currentTimeMillis();
        }
        long start = day - (day % DAY);
        long end = start + (DAY - 1);
        return  findAllBetween(start, end);
    }

    String findAllByRoundId(long roundId);

    String findLast();
}
