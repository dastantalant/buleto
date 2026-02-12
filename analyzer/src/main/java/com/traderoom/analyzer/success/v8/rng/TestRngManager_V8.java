package com.traderoom.analyzer.success.v8.rng;

import com.traderoom.api.ConfigBuilder;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.Snapshot;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.runner.Runner;

import java.util.Deque;
import java.util.LinkedList;

import static com.traderoom.analyzer.BuletoConstants.DEQUE;

@Deprecated
public class TestRngManager_V8 {

    private static final long START_DEPOSIT = 2000;
    private static final double BASE_RISK_PERCENT = 0.002; // 0.2% (100 фишек)

    // Динамическая цель Cash Out
    // Для больших сумм ставим скромные цели, чтобы чаще выводить
    private static final double CASHOUT_PCT = 0.20; // +20% (10,000)

    public static void main(String[] args) {
        long globalVault = 0;
        long tableBalance = START_DEPOSIT;
        long cashoutThreshold = (long)(START_DEPOSIT * (1.0 + CASHOUT_PCT));

        Deque<Integer> deque = european();
        Runner runner = createRunner(tableBalance);

        int rebuys = 0;
        int cashouts = 0;

        System.out.println("=== RNG V12 TREND FOLLOWER ===");
        System.out.println("Analyzing Trends (Black/Red Bias) + Hot Numbers");

        while (!deque.isEmpty()) {
            Integer item = deque.poll();

            // REBUY LOGIC
            if (tableBalance < 500) {
                if (globalVault >= START_DEPOSIT) {
                    System.out.println("!!! BANKRUPTCY !!! Skipping 100 spins...");
                    for (int i=0; i<100 && !deque.isEmpty(); i++) deque.poll();

                    globalVault -= START_DEPOSIT;
                    tableBalance = START_DEPOSIT;
                    rebuys++;
                    System.out.println(">>> REBUY. Vault left: " + globalVault);
                    runner = createRunner(tableBalance);
                    item = deque.poll();
                } else {
                    System.out.println("--- GAME OVER ---");
                    break;
                }
            }
            if (item == null) break;

            Snapshot snapshot = runner.victory(Spot.getByNumber(item));

            if (!runner.isLive()) {
                long profit = snapshot.netProfit();
                tableBalance += profit;

                // CASH OUT
                if (tableBalance >= cashoutThreshold) {
                    long withdraw = tableBalance - START_DEPOSIT;
                    globalVault += withdraw;
                    cashouts++;
                    System.out.printf("$$$ CASH OUT #%d (+%d). Vault: %d%n", cashouts, withdraw, globalVault);

                    tableBalance = START_DEPOSIT;
                    runner = createRunner(tableBalance);
                }
                else {
                    runner = createRunner(tableBalance);
                }
            }
        }

        System.out.println("=================================");
        System.out.println("Final Table Balance: " + tableBalance);
        System.out.println("REAL PROFIT: " + globalVault);
        System.out.println("NET RESULT: " + (globalVault + tableBalance - START_DEPOSIT));
    }

    static Runner createRunner(long currentBalance) {
        long minBet = Math.max(1, (long)(currentBalance * BASE_RISK_PERCENT));

        Config config = ConfigBuilder.builder()
                .european()
                .name("RNG V12 Trend")
                .realBalance(currentBalance * 10)
                .startBalance(currentBalance)
                .minBet(minBet)
                .maxBet(15000)
                .tableLimit(15000)
                .stopLossPercentageStop(20)
                .takeProfitPercentageStop(10)
                .riskDisabled()
                .floatingMinBetPercentLimit(0)
                .build();

        return Runner.of(new RngTrendFollowerStrategy(config));
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