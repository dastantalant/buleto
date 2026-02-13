package com.traderoom.analyzer.success.v7;

import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.Snapshot;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.runner.Runner;
import com.traderoom.common.mapper.ConfigMapper;
import com.traderoom.common.model.RawConfigModel;

import java.util.Deque;
import java.util.LinkedList;

import static com.traderoom.analyzer.BuletoConstants.DEQUE;

/*
won: 45 loss: 451
balance: 100
sum: 21664
*/
@Deprecated
public class RunnerTest {
    private static final int window = 120; // 120
    private static final int limitBet = 10; // 10
    private static final long balance = 200_00;
    private static final long minBet = (long) (((double) balance / 100) * 1.5); // 1.5%
    private static final long maxBet = 15_000_00;
    private static final int stopLossPercentageStop = 70; // 80
    private static final int takeProfitPercentageStop = 1000; // 420
    private static final int floatingMinBetPercentLimit = 10; // 10

    static void main() {
        Runner runner = Runner.of(new FrequencyPatternStrategy(config(), new PatternPredictor(window), limitBet));
        Deque<Integer> deque = european();
        int loss = 0;
        int won = 0;
        long sum = 0;
        while (!deque.isEmpty()) {
            Integer item = deque.poll();
            Snapshot snapshot = runner.victory(Spot.getByNumber(item));
            if (!runner.isLive()) {
                System.out.println(snapshot.netProfit()/100);
                sum = sum + snapshot.netProfit();
                split(deque, 120);
                runner = Runner.of(new FrequencyPatternStrategy(config(), window, limitBet));
                if (snapshot.netProfit() > 0) {
                    won++;
                } else {
                    loss++;
                }
            }
        }
        System.out.println("balance: " + balance/100 + " sum: " + sum/100);
        System.out.println("win: " + won + " loss: " + loss);
    }

    static Config config() {
        return ConfigMapper.INSTANCE.toConfig(RawConfigModel.builder()
                        .name("Test")
                        .realBalance(balance * 10)
                        .startBalance(balance)
                        .minBet(minBet)
                        .maxBet(maxBet)
                        .tableLimit(maxBet)
                        .stopLossPercentageStop(stopLossPercentageStop)
                        .takeProfitPercentageStop(takeProfitPercentageStop)
                        .dangerZoneThresholdRisk(0)
                        .profitZoneThresholdRisk(0)
                        .normalZoneBetCapRisk(100)
                        .penaltyBoxDurationRisk(0)
                        .floatingMinBetPercentLimit(floatingMinBetPercentLimit)
                        .build())
                .toConfig();
    }

    static Deque<Integer> split(Deque<Integer> deque, long count) {
        for (int i = 0; i < count && !deque.isEmpty(); i++) {
            deque.poll();
        }
        return deque;
    }

    private static Deque<Integer> european() {
        Deque<Integer> deque = new LinkedList<>(DEQUE);
        Deque<Integer> result = new LinkedList<>();
        while (!deque.isEmpty()) {
            Integer spot = deque.poll();
            result.add(spot == -1 ? 0 : spot);
        }
        return result;
    }
}
