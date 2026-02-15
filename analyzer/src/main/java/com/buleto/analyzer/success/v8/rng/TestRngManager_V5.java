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
public class TestRngManager_V5 {

    // ==========================================
    // ГЛАВНАЯ НАСТРОЙКА (МЕНЯТЬ ТОЛЬКО ЗДЕСЬ)
    // ==========================================
    private static final long START_DEPOSIT = 500_00; // Рабочий стек

    // --- Настройки Капитала (в Процентах от DEPOSIT) ---
    private static final double CASHOUT_GROWTH_PERCENT = 0.50; // Вывод, когда выросли на +50%
    private static final double BASE_RISK_PERCENT = 0.002;     // Ставка 0.2% от баланса

    // --- Настройки Сессии (Внутри стратегии) ---
    // NORMAL MODE
    private static final int NORMAL_STOP_LOSS_PCT = 20;    // Перезапуск при просадке 20%
    private static final int NORMAL_TAKE_PROFIT_PCT = 10;  // Перезапуск при профите 10%
    // SURVIVAL MODE (После Rebuy)
    private static final int SURVIVAL_STOP_LOSS_PCT = 10;  // Строгий стоп 10%
    private static final int SURVIVAL_TAKE_PROFIT_PCT = 15; // Нужно накопить 15% чтобы выжить

    // ==========================================

    public static void main(String[] args) {
        // Авто-расчет абсолютных значений
        final long targetCashoutAmount = (long) (START_DEPOSIT * CASHOUT_GROWTH_PERCENT);
        final long cashoutThreshold = START_DEPOSIT + targetCashoutAmount;

        System.out.println("=== PHOENIX PROTOCOL V5 (AUTO-SCALE) ===");
        System.out.println("Start Deposit: " + START_DEPOSIT);
        System.out.println("Target Cashout: +" + targetCashoutAmount + " (at " + cashoutThreshold + ")");
        System.out.println("Base Bet: " + (long)(START_DEPOSIT * BASE_RISK_PERCENT));
        System.out.println("==========================================");

        long globalVault = 0;
        long tableBalance = START_DEPOSIT;

        Deque<Integer> deque = european();

        // Начинаем в НОРМАЛЬНОМ режиме
        Runner runner = createRunner(tableBalance, false);
        boolean isSurvivalMode = false;
        int rebuys = 0;

        while (!deque.isEmpty()) {
            Integer item = deque.poll();

            // --- ЛОГИКА REBUY ---
            // Если баланс упал ниже минимальной ставки
            if (tableBalance < Math.max(1, START_DEPOSIT * BASE_RISK_PERCENT)) {
                if (globalVault >= START_DEPOSIT) {
                    System.out.println("!!! BANKRUPTCY DETECTED !!!");

                    // 1. COOL-DOWN (100 спинов)
                    System.out.println("... Skipping 100 bad spins ...");
                    for (int i=0; i<100 && !deque.isEmpty(); i++) deque.poll();
                    if(deque.isEmpty()) break;

                    // 2. REBUY
                    globalVault -= START_DEPOSIT;
                    tableBalance = START_DEPOSIT;
                    rebuys++;

                    System.out.printf(">>> REBUY #%d. Vault left: %d%n", rebuys, globalVault);

                    // 3. SURVIVAL MODE ON
                    isSurvivalMode = true;
                    runner = createRunner(tableBalance, true);

                    item = deque.poll();
                    if (item == null) break;
                } else {
                    System.out.println("--- GAME OVER (Not enough funds in Vault) ---");
                    break;
                }
            }

            Snapshot snapshot = runner.victory(Spot.getByNumber(item));

            if (!runner.isLive()) {
                long profit = snapshot.netProfit();
                tableBalance += profit;

                // --- ЛОГИКА CASH OUT ---
                if (tableBalance >= cashoutThreshold) {
                    long withdraw = tableBalance - START_DEPOSIT;
                    globalVault += withdraw;

                    System.out.printf("$$$ CASH OUT (+%d). Vault Total: %d%n", withdraw, globalVault);

                    // СБРОС (Reset to Base)
                    tableBalance = START_DEPOSIT;

                    // Если мы выжили и вывели деньги -> Выключаем режим выживания
                    if (isSurvivalMode) {
                        System.out.println("-> SURVIVAL MODE OFF (Phoenix Risen)");
                        isSurvivalMode = false;
                    }

                    runner = createRunner(tableBalance, false);
                }
                else {
                    // Просто перезапуск сессии (сохраняя текущий режим)
                    runner = createRunner(tableBalance, isSurvivalMode);
                }
            }
        }

        System.out.println("=================================");
        System.out.println("Final Table Balance: " + tableBalance);
        System.out.println("REAL PROFIT (VAULT): " + globalVault);
        System.out.println("Rebuys Used: " + rebuys);
        System.out.println("NET RESULT: " + (globalVault + tableBalance - START_DEPOSIT));
    }

    static Runner createRunner(long currentBalance, boolean survivalMode) {
        long minBet = Math.max(1, (long)(currentBalance * BASE_RISK_PERCENT));
        int stopLoss = survivalMode ? SURVIVAL_STOP_LOSS_PCT : NORMAL_STOP_LOSS_PCT;
        int takeProfit = survivalMode ? SURVIVAL_TAKE_PROFIT_PCT : NORMAL_TAKE_PROFIT_PCT;
        Config config = ConfigBuilder.builder()
                .european()
                .name("RNG V5 " + (survivalMode ? "[SURVIVAL]" : "[NORMAL]"))
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