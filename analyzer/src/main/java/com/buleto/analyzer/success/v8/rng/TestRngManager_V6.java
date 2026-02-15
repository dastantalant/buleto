package com.buleto.analyzer.success.v8.rng;

import com.trading.roulette.api.ConfigBuilder;
import com.trading.roulette.api.enums.Spot;
import com.trading.roulette.api.model.Snapshot;
import com.trading.roulette.api.model.config.Config;
import com.trading.roulette.api.runner.Runner;

import java.util.Deque;
import java.util.LinkedList;

import static com.buleto.analyzer.BuletoConstants.DEQUE;

@Deprecated
public class TestRngManager_V6 {

    // ==========================================
    // ГЛАВНАЯ НАСТРОЙКА
    // ==========================================
    private static final long START_DEPOSIT = 1000;

    private static final double CASHOUT_GROWTH_PERCENT = 0.50; // +50% цель
    private static final double BASE_RISK_PERCENT = 0.002;     // 0.2% ставка

    // ЗАЩИТА REBUY (Новое!)
    // Если после докупки мы слили 30% стека -> АВАРИЙНЫЙ ВЫХОД
    private static final double REBUY_ABORT_LOSS_PERCENT = 0.30;

    // Настройки сессий
    private static final int NORMAL_STOP_LOSS_PCT = 20;
    private static final int NORMAL_TAKE_PROFIT_PCT = 10;
    private static final int SURVIVAL_STOP_LOSS_PCT = 10;
    private static final int SURVIVAL_TAKE_PROFIT_PCT = 15;
    // ==========================================

    public static void main(String[] args) {
        final long targetCashoutAmount = (long) (START_DEPOSIT * CASHOUT_GROWTH_PERCENT);
        final long cashoutThreshold = START_DEPOSIT + targetCashoutAmount;
        // Уровень, при котором мы отменяем Rebuy (например, 35000 при старте 50000)
        final long abortThreshold = (long) (START_DEPOSIT * (1.0 - REBUY_ABORT_LOSS_PERCENT));

        System.out.println("=== PHOENIX PROTOCOL V6 (SMART RECOVERY) ===");
        System.out.println("Start Deposit: " + START_DEPOSIT);
        System.out.println("Abort Rebuy at: " + abortThreshold + " (Save remaining funds)");
        System.out.println("==========================================");

        long globalVault = 0;
        long tableBalance = START_DEPOSIT;

        Deque<Integer> deque = european();
        Runner runner = createRunner(tableBalance, false);

        boolean isSurvivalMode = false;
        int rebuys = 0;
        int aborts = 0;

        while (!deque.isEmpty()) {
            Integer item = deque.poll();

            // --- 1. ЛОГИКА REBUY (БАНКРОТСТВО) ---
            if (tableBalance < Math.max(1, START_DEPOSIT * BASE_RISK_PERCENT)) {
                if (globalVault >= START_DEPOSIT) {
                    System.out.println("!!! BANKRUPTCY !!!");
                    performCoolDown(deque); // Skip 100

                    globalVault -= START_DEPOSIT;
                    tableBalance = START_DEPOSIT;
                    rebuys++;

                    System.out.printf(">>> REBUY #%d. Vault left: %d%n", rebuys, globalVault);

                    isSurvivalMode = true;
                    runner = createRunner(tableBalance, true);
                    item = deque.poll();
                } else {
                    System.out.println("--- GAME OVER (Vault Empty) ---");
                    break;
                }
            }

            // --- 2. ЛОГИКА ABORT (СПАСЕНИЕ ОСТАТКОВ REBUY) ---
            // Работает только в режиме выживания
            if (isSurvivalMode && tableBalance < abortThreshold) {
                System.out.printf("!!! ABORT RECOVERY !!! Balance dropped to %d. Saving funds.%n", tableBalance);

                // Возвращаем остатки в сейф
                globalVault += tableBalance;
                tableBalance = 0; // Стол пуст
                aborts++;

                // Теперь запускаем логику REBUY заново (проверяем хватает ли на полный стек)
                // Но сначала ОХЛАЖДЕНИЕ, так как мы только что слили 30%
                performCoolDown(deque);

                if (globalVault >= START_DEPOSIT) {
                    globalVault -= START_DEPOSIT;
                    tableBalance = START_DEPOSIT;
                    rebuys++;
                    System.out.printf(">>> RE-ATTEMPT #%d. Vault left: %d%n", rebuys, globalVault);
                    runner = createRunner(tableBalance, true);
                    item = deque.poll();
                } else {
                    System.out.println("--- GAME OVER (Not enough for full Rebuy after Abort) ---");
                    break;
                }
            }

            if (item == null) break;

            Snapshot snapshot = runner.victory(Spot.getByNumber(item));

            if (!runner.isLive()) {
                long profit = snapshot.netProfit();
                tableBalance += profit;

                // --- 3. ЛОГИКА CASH OUT ---
                if (tableBalance >= cashoutThreshold) {
                    long withdraw = tableBalance - START_DEPOSIT;
                    globalVault += withdraw;
                    System.out.printf("$$$ CASH OUT (+%d). Vault Total: %d%n", withdraw, globalVault);

                    tableBalance = START_DEPOSIT;
                    if (isSurvivalMode) {
                        System.out.println("-> SURVIVAL MODE OFF");
                        isSurvivalMode = false;
                    }
                    runner = createRunner(tableBalance, false);
                }
                else {
                    runner = createRunner(tableBalance, isSurvivalMode);
                }
            }
        }

        System.out.println("=================================");
        System.out.println("Final Table Balance: " + tableBalance);
        System.out.println("REAL PROFIT (VAULT): " + globalVault);
        System.out.println("Rebuys: " + rebuys + " | Aborts: " + aborts);
        System.out.println("NET RESULT: " + (globalVault + tableBalance - START_DEPOSIT));
    }

    private static void performCoolDown(Deque<Integer> deque) {
        System.out.println("... Skipping 100 spins ...");
        for (int i=0; i<100 && !deque.isEmpty(); i++) deque.poll();
    }

    static Runner createRunner(long currentBalance, boolean survivalMode) {
        long minBet = Math.max(1, (long)(currentBalance * BASE_RISK_PERCENT));

        int stopLoss = survivalMode ? SURVIVAL_STOP_LOSS_PCT : NORMAL_STOP_LOSS_PCT;
        int takeProfit = survivalMode ? SURVIVAL_TAKE_PROFIT_PCT : NORMAL_TAKE_PROFIT_PCT;

        Config config = ConfigBuilder.builder()
                .european()
                .name("RNG V6 " + (survivalMode ? "[SURVIVAL]" : "[NORMAL]"))
                .realBalance(currentBalance * 10)
                .startBalance(currentBalance)
                .minBet(minBet)
                .maxBet(15_000_00)
                .tableLimit(15_000_00)
                .stopLossPercentageStop(stopLoss)
                .takeProfitPercentageStop(takeProfit)
                .riskDisabled()
                .floatingMinBetPercentLimit(0)
                .build();

        return Runner.of(new RngSmartCoverageStrategy3(config, survivalMode));
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