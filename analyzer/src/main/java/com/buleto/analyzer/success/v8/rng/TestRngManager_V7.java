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
public class TestRngManager_V7 {

    // ==========================================
    // ГЛАВНАЯ НАСТРОЙКА
    // ==========================================
    private static final long START_DEPOSIT = 6000;

    private static final double CASHOUT_GROWTH_PERCENT = 0.50;
    private static final double BASE_RISK_PERCENT = 0.002;

    // ЗАЩИТА REBUY (ABORT)
    private static final double REBUY_ABORT_LOSS_PERCENT = 0.30;

    // НОВОЕ: ГЛОБАЛЬНАЯ ЗАЩИТА ПРИБЫЛИ (TRAILING STOP НА СЕЙФ)
    // Если Сейф достиг пика, мы не дадим ему упасть более чем на 30%
    private static final double GLOBAL_VAULT_DROP_LIMIT = 0.30;

    // НОВОЕ: МИНИМАЛЬНЫЙ ВХОД
    // Если в сейфе осталось хотя бы 5000, мы продолжаем биться
    private static final long MIN_BUYIN = 100_00;
    // Настройки сессий
    private static final int NORMAL_STOP_LOSS_PCT = 20;
    private static final int NORMAL_TAKE_PROFIT_PCT = 10;
    private static final int SURVIVAL_STOP_LOSS_PCT = 10;
    private static final int SURVIVAL_TAKE_PROFIT_PCT = 15;
    // ==========================================
    // ==========================================

    public static void main(String[] args) {
        // Внутри main метода:

// Чем больше депозит, тем МЕНЬШЕ процент мы хотим забрать за раз,
// чтобы время сессии оставалось коротким (безопасным).
//        double dynamicCashoutPercent;
//
//        if (START_DEPOSIT < 5000) {
//            dynamicCashoutPercent = 0.50; // Для мелочи можно рисковать ради +50%
//        } else if (START_DEPOSIT < 20000) {
//            dynamicCashoutPercent = 0.25; // Для средних сумм цель +25%
//        } else {
//            dynamicCashoutPercent = 0.10; // Для крупных сумм цель +10% (Тише едешь - дальше будешь)
//        }
//
//        final long targetCashoutAmount = (long) (START_DEPOSIT * dynamicCashoutPercent);

//        System.out.println("Dynamic Cashout Percent: " + (dynamicCashoutPercent * 100) + "%");
        final long targetCashoutAmount = (long) (START_DEPOSIT * CASHOUT_GROWTH_PERCENT);
        final long abortThresholdPct = (long) (START_DEPOSIT * (1.0 - REBUY_ABORT_LOSS_PERCENT));

        System.out.println("=== PHOENIX PROTOCOL V7 (TITANIUM) ===");
        System.out.println("Start Deposit: " + START_DEPOSIT);
        System.out.println("Global Trailing Stop: -" + (GLOBAL_VAULT_DROP_LIMIT * 100) + "% from Peak Vault");
        System.out.println("==========================================");

        long globalVault = 0;
        long maxGlobalVault = 0; // Пиковый размер сейфа

        long tableBalance = START_DEPOSIT;

        Deque<Integer> deque = european();
        Runner runner = createRunner(tableBalance, false);

        boolean isSurvivalMode = false;
        int rebuys = 0;
        int aborts = 0;

        while (!deque.isEmpty()) {
            Integer item = deque.poll();

            // --- 1. ПРОВЕРКА НА ГЛОБАЛЬНЫЙ СТОП (ЗАБИРАЕМ ПРИБЫЛЬ) ---
            // Если мы заработали много (больше депозита), включаем защиту
            if (globalVault > START_DEPOSIT) {
                if (globalVault > maxGlobalVault) {
                    maxGlobalVault = globalVault;
                    System.out.println(">>> NEW VAULT PEAK: " + maxGlobalVault);
                }

                // Если сейф упал на 30% от пика - УХОДИМ С ДЕНЬГАМИ
                long stopLevel = (long)(maxGlobalVault * (1.0 - GLOBAL_VAULT_DROP_LIMIT));
                // Но стоп-уровень не должен быть ниже стартового депозита (чтобы не уйти в минус, если уже были в плюсе)
                stopLevel = Math.max(stopLevel, START_DEPOSIT);

                if (globalVault < stopLevel && tableBalance < 1000) {
                    System.out.printf("!!! GLOBAL TRAILING STOP HIT !!!%n");
                    System.out.printf("Peak: %d, Current: %d. Stopping to preserve profit.%n", maxGlobalVault, globalVault);
                    break; // ВЫХОД ИЗ ЦИКЛА
                }
            }

            // --- 2. ЛОГИКА REBUY (БАНКРОТСТВО) ---
            if (tableBalance < Math.max(1, tableBalance * BASE_RISK_PERCENT) || tableBalance < 100) {
                // Если на столе пусто, проверяем Сейф

                // Доступные деньги в сейфе
                long availableFunds = globalVault;

                // Если денег хватает хотя бы на минимальный вход
                if (availableFunds >= MIN_BUYIN) {
                    System.out.println("!!! BANKRUPTCY ON TABLE !!!");
                    performCoolDown(deque);

                    // Определяем размер докупки.
                    // Либо полный стек, либо "все что есть" (Partial Rebuy)
                    long buyInAmount = Math.min(START_DEPOSIT, availableFunds);

                    globalVault -= buyInAmount;
                    tableBalance = buyInAmount;
                    rebuys++;

                    System.out.printf(">>> REBUY #%d. Amount: %d. Vault left: %d%n", rebuys, buyInAmount, globalVault);

                    // Если зашли неполным стеком или это ребай - ВСЕГДА SURVIVAL
                    isSurvivalMode = true;
                    runner = createRunner(tableBalance, true);
                    item = deque.poll();
                } else {
                    System.out.println("--- GAME OVER (Vault completely empty) ---");
                    break;
                }
            }

            // --- 3. ЛОГИКА ABORT (СПАСЕНИЕ ОСТАТКОВ) ---
            // Считаем порог стопа от ТЕКУЩЕГО стартового баланса (он мог быть неполным)
            // Но для простоты берем 30% от того, с чем сели за стол в этот раз.
            // (В этой версии упростим: Abort работает, если баланс > 5000, иначе доигрываем)
            if (isSurvivalMode && tableBalance > 5000) {
                // Если слили 30% от START_DEPOSIT (или от текущего входа, если он был меньше)
                // Давайте привяжемся к START_DEPOSIT для жесткости
                if (tableBalance < abortThresholdPct && tableBalance < runner.getStrategy().getStartBalance() * 0.7) {
                    System.out.printf("!!! ABORT RECOVERY !!! Balance: %d. Saving funds.%n", tableBalance);

                    globalVault += tableBalance;
                    tableBalance = 0; // Триггернет Rebuy логику на след. итерации
                    aborts++;

                    performCoolDown(deque);
                    // След. итерация цикла сама разберется с Rebuy
                    continue;
                }
            }

            if (item == null) break;

            Snapshot snapshot = runner.victory(Spot.getByNumber(item));

            if (!runner.isLive()) {
                long profit = snapshot.netProfit();
                tableBalance += profit;

                // --- 4. ЛОГИКА CASH OUT ---
                // Цель - восстановить полный стек + прибыль
                long currentTarget = START_DEPOSIT + targetCashoutAmount;

                if (tableBalance >= currentTarget) {
                    long withdraw = tableBalance - START_DEPOSIT;
                    globalVault += withdraw;
                    System.out.printf("$$$ CASH OUT (+%d). Vault Total: %d%n", withdraw, globalVault);

                    tableBalance = START_DEPOSIT;
                    // Выключаем выживание ТОЛЬКО если у нас в сейфе есть подушка безопасности
                    if (isSurvivalMode && globalVault > START_DEPOSIT) {
                        System.out.println("-> SURVIVAL MODE OFF (Safety cushion established)");
                        isSurvivalMode = false;
                    }
                    runner = createRunner(tableBalance, isSurvivalMode); // Используем isSurvivalMode, который мог измениться
                }
                else {
                    runner = createRunner(tableBalance, isSurvivalMode);
                }
            }
        }

        System.out.println("=================================");
        System.out.println("Final Table Balance: " + tableBalance);
        System.out.println("REAL PROFIT (VAULT): " + globalVault);
        System.out.println("Max Peak Vault: " + maxGlobalVault);
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
                .name("RNG V7 " + (survivalMode ? "[SURVIVAL]" : "[NORMAL]"))
                .realBalance(currentBalance * 10)
                .startBalance(currentBalance)
                .minBet(minBet)
                .maxBet(15_000)
                .tableLimit(15_000)
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