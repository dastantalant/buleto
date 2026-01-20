package com.traderoom.strategy.base.strategies.martingale;

import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;

@AStrategy
public class EastCoastProgressionStrategy extends AbstractMartingaleStrategy {

    public EastCoastProgressionStrategy(Config config) {
        super(config, () -> config.minBet() * 2);

    }

    @Override
    protected long calculate(State state) {
        long balance = getBalance();
        long startBalance = getStartBalance();
        return (isLastBetWon(state) && balance > startBalance)
                ? Math.max((balance - startBalance) / 2, getConfig().minBet())
                : supplier.getAsLong();
    }
}