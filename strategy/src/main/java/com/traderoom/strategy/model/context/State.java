package com.traderoom.strategy.model.context;

import com.traderoom.strategy.enums.Spot;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Getter
@Setter
@ToString
public class State implements Serializable {
    private long balance;
    private final MarketData marketData;

    public State(long startBalance, MarketData marketData) {
        this.marketData = marketData;
        balance = startBalance;
    }

    public State(long startBalance) {
        marketData = new MarketData();
        balance = startBalance;
    }

    public static State of(long startBalance, MarketData marketData) {
        return new State(startBalance, marketData);
    }

    public static State of(long startBalance) {
        return new State(startBalance);
    }

    public Spot registerSpot(Spot spot) {
        marketData.addSpot(spot);
        return spot;
    }
}