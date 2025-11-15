package com.traderoom.analyze;

import lombok.Getter;

import java.util.function.BiFunction;


public class Strategy {
    private final int start;
    @Getter private int bet;
    private final BiFunction<Integer, Integer, Integer> win;
    private final BiFunction<Integer, Integer, Integer> lose;

    public Strategy(
            int start,
            BiFunction<Integer, Integer, Integer> win,
            BiFunction<Integer, Integer, Integer> lose
    ) {
        this.start = start;
        this.win = win;
        this.lose = lose;
        bet = start;
    }

    public int win() {
        bet = win.apply(start, bet);
        return bet;
    }

    public int lose() {
        bet = lose.apply(start, bet);
        return bet;
    }
}
