package com.traderoom.bet.service;

public interface CellService {
    long DAY = 86_400_000;
    long HOUR = 3_600_000;

    String findAll(int page, int size);

    String findAllBetween(long from, long to);

    String findAllByDay(long day);

    String findAllByRoundId(long roundId);
}
