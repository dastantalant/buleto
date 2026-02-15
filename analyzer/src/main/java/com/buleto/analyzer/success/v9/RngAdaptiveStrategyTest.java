package com.buleto.analyzer.success.v9;

import com.trading.roulette.api.ConfigBuilder;
import com.trading.roulette.api.enums.Spot;
import com.trading.roulette.api.model.Snapshot;
import com.trading.roulette.api.model.config.Config;
import com.trading.roulette.api.runner.Runner;

import java.util.Deque;
import java.util.LinkedList;

import static com.buleto.analyzer.BuletoConstants.DEQUE;

public class RngAdaptiveStrategyTest {

    private static final long START_DEPOSIT = 1_000;
    private static final double BASE_RISK_PERCENT = 0.002; // 0.2%
    private static final double CASHOUT_PCT = 0.20; // Cash out at +20%
    private static final long MIN_BUYIN = 100;

     static void main() {
        long globalVault = 0;
        long tableBalance = START_DEPOSIT;
        long cashoutThreshold = (long)(START_DEPOSIT * (1.0 + CASHOUT_PCT));

        Deque<Integer> deque = european();
        Runner runner = createRunner(tableBalance);

        int rebuys = 0;
        int cashouts = 0;

        System.out.println("=== RNG V13 CHAMELEON TEST ===");
        System.out.println("Start: " + START_DEPOSIT + " | Risk: " + (BASE_RISK_PERCENT*100) + "%");
        while (!deque.isEmpty()) {
            Integer item = deque.poll();

            // --- REBUY / BANKRUPTCY LOGIC ---
            if (tableBalance < 500) {
                if (globalVault >= MIN_BUYIN) {
                    System.out.println("!!! BANKRUPTCY !!! Skipping 100 spins...");
                    for (int i=0; i<100 && !deque.isEmpty(); i++) deque.poll();

                    long buyIn = Math.min(START_DEPOSIT, globalVault);
                    globalVault -= buyIn;
                    tableBalance = buyIn;
                    rebuys++;

                    System.out.printf(">>> REBUY #%d. Amount: %d. Vault left: %d%n", rebuys, buyIn, globalVault);

                    // Reset strategy memory
                    runner = createRunner(tableBalance);
                    item = deque.poll();
                } else {
                    System.out.println("--- GAME OVER (Vault Empty) ---");
                    break;
                }
            }

            if (item == null) break;

            Snapshot snapshot = runner.victory(Spot.getByNumber(item));
//            System.out.println(snapshot.virtualBalance()/100);

            if (!runner.isLive()) {
                long profit = snapshot.netProfit();
                tableBalance += profit;

                // --- CASH OUT LOGIC ---
                if (tableBalance >= cashoutThreshold) {
                    long withdraw = tableBalance - START_DEPOSIT;
                    globalVault += withdraw;
                    cashouts++;
                    System.out.printf("$$$ CASH OUT #%2d (+%d). Vault Total: %6d Balance: %6d%n", cashouts, withdraw, globalVault, snapshot.virtualBalance());

                    tableBalance = START_DEPOSIT;
                    runner = createRunner(tableBalance);
                }
                else {
                    // Just refresh runner, keep balance
                    runner = createRunner(tableBalance);
                }
            }
        }

        System.out.println("=================================");
        System.out.println("Final Table Balance: " + tableBalance);
        System.out.println("REAL PROFIT (VAULT): " + globalVault);
        System.out.println("Stats: Cashouts: " + cashouts + " | Rebuys: " + rebuys);
        System.out.println("NET RESULT: " + (globalVault + tableBalance - START_DEPOSIT));
    }

    static Runner createRunner(long currentBalance) {
        long minBet = Math.max(1, (long)(currentBalance * BASE_RISK_PERCENT));

        Config config = ConfigBuilder.builder()
                .european()
                .name("RNG V13 Adaptive")
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

        return Runner.of(new RngAdaptiveStrategy(config));
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