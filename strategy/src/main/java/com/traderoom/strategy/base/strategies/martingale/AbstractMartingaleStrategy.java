package com.traderoom.strategy.base.strategies.martingale;

import com.traderoom.strategy.base.AbstractStrategy;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;

import java.util.ArrayList;
import java.util.List;
import java.util.function.LongSupplier;

public abstract class AbstractMartingaleStrategy extends AbstractStrategy {
    private final List<BetType> types;
    private final int size;
    private final boolean single;
    protected final LongSupplier supplier;

    protected AbstractMartingaleStrategy(Config config, BetType type, LongSupplier supplier) {
        this(config, List.of(type), supplier);
    }

    protected AbstractMartingaleStrategy(Config config, List<BetType> types, LongSupplier supplier) {
        super(config);
        this.supplier = supplier;
        this.types = types;
        size = types.isEmpty() ? 1 : types.size();
        single = size == 1;
    }

    protected AbstractMartingaleStrategy(Config config) {
        this(config, List.of(BetType.RED));
    }

    protected AbstractMartingaleStrategy(Config config, LongSupplier supplier) {
        this(config, List.of(BetType.RED), supplier);
    }

    protected AbstractMartingaleStrategy(Config config, BetType type) {
        this(config, List.of(type));
    }

    protected AbstractMartingaleStrategy(Config config, List<BetType> types) {
        super(config);
        this.types = types;
        supplier = () -> calculateNext(config);
        size = types.isEmpty() ? 1 : types.size();
        single = size == 1;
    }

    @Override
    public List<Bet> decide(State state) {
        if (single) {
            return single(state, getNextBetType(state));
        }
        return create(state);
    }

    public BetType getNextBetType(State state) {
        return types.isEmpty() ? BetType.RED : types.getFirst();
    }

    protected long calculateNext(Config config) {
        return getLastBet() * 2;
    }


    protected List<Bet> create(State state) {
        List<Bet> bets = new ArrayList<>(size);
        for (BetType type : types) {
            bets.add(create(state, type, size));
        }
        return bets;
    }

    protected List<Bet> single(State state, BetType type) {
        return List.of(create(state, type,  1));
    }

    protected Bet create(State state, BetType type, int divisor) {
        long balance = getBalance();
        long value = calculate(state);
        long safeValue = Math.min(value, balance / divisor);
        if (safeValue <= 0 && balance > 0) {
            safeValue = getConfig().minBet();
        }
        return Bet.of(type, safeValue);
    }

    protected long calculate(State state) {
        return (!isLastBet() || isLastBetWon(state)) ? getConfig().minBet() : supplier.getAsLong();
    }
}
