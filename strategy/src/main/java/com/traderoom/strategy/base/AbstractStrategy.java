package com.traderoom.strategy.base;

import com.traderoom.core.util.StringUtil;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.Snapshot;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.api.Subscriber;
import com.traderoom.strategy.stop.StopCondition;
import com.traderoom.strategy.utils.BetHelper;

import lombok.Getter;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import static com.traderoom.strategy.enums.Constants.BALANCE_HISTORY_SIZE;

public abstract class AbstractStrategy extends AbstractMetricStrategy {
    @Getter
    private final String name;
    private final Set<Subscriber> subscribers = new CopyOnWriteArraySet<>();
    @Getter
    private final List<StopCondition> stopConditions;

    protected AbstractStrategy(Config config) {
        this(config, "");
    }

    protected AbstractStrategy(Config config, String name) {
        super(config);
        this.name = StringUtil.isBlank(name) ? getClass().getSimpleName() : name;
        stopConditions = config.createConditions();
//        // Логический разогрев (прогон onRoundCustom)
//        if (!config.initialHistory().isEmpty()) {
//            // Внимание: State уже заполнен в super(),
//            // мы просто триггерим логику обновления предикторов
//            for (Integer num : config.initialHistory()) {
//                try {
//                    Spot s = Spot.getByNumber(num);
//                    // Вызываем хук с пустыми ставками
//                    onRoundCustom(Collections.emptyList(), s);
//                } catch (Exception ignored) {}
//            }
//        }
    }

    @Override
    public final Snapshot playTurn(Spot spot, State state) {
        List<Bet> rawBets = decide(state);
        List<Bet> finalBets = getRiskManager().apply(rawBets, getBalance(), state, getConfig());
        state.registerSpot(spot);
        return onRoundEnd(finalBets, spot, state);
    }

    @Override
    public Snapshot endGame(State state) {
        stop();
        Snapshot snapshot = snapshot(List.of(), null, getBalance());
        return publishGameEnd(snapshot);
    }

    protected final Snapshot onRoundEnd(List<Bet> bets, Spot spot, State state) {
        long oldBalance = getBalance();
        update(bets, spot);
        onRoundCustom(bets, spot, state);
        getRiskManager().updateState(getBalance());
        state.setBalance(getBalance());
        Snapshot snapshot = snapshot(bets, spot, oldBalance);
        return publish(snapshot);
    }

    protected void onRoundCustom(List<Bet> bets, Spot spot, State state) {
    }

    private void update(List<Bet> betList, Spot spot) {
        if (betList == null || betList.isEmpty()) {
            return;
        }
        long bValue = BetHelper.getTotalBetValue(betList);
        long bPayout = BetHelper.getTotalPayout(betList, spot);
        setBalance(getBalance() - bValue + bPayout);

        setTotalWagered(getTotalWagered() + bValue);
        setTotalPayout(getTotalPayout() - bPayout);

        incrementBet();
        if (bPayout > bValue) {
            incrementWon();
        } else {
            incrementLost();
        }

        var hBalance = getHistoryBalance();
        hBalance.offer(getBalance());
        if (hBalance.size() > BALANCE_HISTORY_SIZE) {
            hBalance.poll();
        }

        if (getBalance() > getPeakBalance()) {
            setPeakBalance(getBalance());
        }

        if (getPeakBalance() > 0) {
            double cMaxDrawdown = (double) (getPeakBalance() - getBalance()) / getPeakBalance();
            if (cMaxDrawdown > getMaxDrawdown()) {
                setMaxDrawdown(cMaxDrawdown);
            }
        }
    }

    @Override
    public final Subscriber addSubscriber(Subscriber subscriber) {
        subscribers.add(subscriber);
        return subscriber;
    }

    @Override
    public final Snapshot publish(Snapshot snapshot) {
        for (Subscriber sub : subscribers) {
            sub.onRound(snapshot);
        }
        return snapshot;
    }

    protected final Snapshot publishGameEnd(Snapshot snapshot) {
        for (Subscriber sub : subscribers) {
            sub.onGameEnd(snapshot);
        }
        return snapshot;
    }
}
