package com.traderoom.analyze;

import lombok.Getter;

import java.util.Set;

public class Game {
    private final Set<Integer> set;
    private final int betSize;
    private final int lostSize;
    private final Strategy strategy;
    private final Balance balance;
    @Getter private boolean win;

    public Game(Set<Integer> set, Strategy strategy, Balance balance) {
        this.set = set;
        betSize = 36 - set.size();
        lostSize = set.size();
        this.strategy = strategy;
        this.balance = balance;
    }

    public int victory(int cell) {
        int victory;
        if (cell == 0 || cell == 37 || set.contains(cell)) {
            victory = -strategy.getBet() * betSize;
            balance.sub(victory);
            strategy.lose();
            win =false;
        } else {
            victory = strategy.getBet() * lostSize;
            balance.add(victory);
            strategy.win();
            win =true;
        }
        return victory;
    }
}
