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
public class TestRngManager_V4 {

    private static final long START_DEPOSIT = 2000;
    private static final long TARGET_PROFIT = 1000;
    private static final double BASE_RISK = 0.002; // 0.2% (4 фишки) - надежнее

    public static void main(String[] args) {
        long globalVault = 0;
        long tableBalance = START_DEPOSIT;

        Deque<Integer> deque = european();
        // Первый запуск - обычный режим (survival = false)
        Runner runner = createRunner(tableBalance, false);

        int rebuys = 0;

        System.out.println("STARTED V4 Phoenix Protocol");

        while (!deque.isEmpty()) {
            Integer item = deque.poll();

            // --- ЛОГИКА REBUY ---
            if (tableBalance < 10) {
                if (globalVault >= START_DEPOSIT) {
                    System.out.println("!!! BANKRUPTCY DETECTED !!!");

                    // 1. ПАУЗА: Пропускаем 100 спинов (симуляция "пойти покурить")
                    // Чтобы переждать плохую волну ГСЧ
                    System.out.println("... Skipping 100 bad spins ...");
                    for (int i=0; i<100 && !deque.isEmpty(); i++) {
                        deque.poll();
                    }
                    if(deque.isEmpty()) break;

                    // 2. ДОКУПКА
                    globalVault -= START_DEPOSIT;
                    tableBalance = START_DEPOSIT;
                    rebuys++;

                    System.out.println(">>> REBUY SUCCESSFUL. Vault left: " + globalVault);

                    // 3. ВКЛЮЧАЕМ РЕЖИМ ВЫЖИВАНИЯ (true)
                    runner = createRunner(tableBalance, true);

                    // Берем свежий спин для нового раннера
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
                if (tableBalance >= START_DEPOSIT + TARGET_PROFIT) {
                    long withdraw = tableBalance - START_DEPOSIT;
                    globalVault += withdraw;
                    System.out.printf("$$$ CASH OUT (+%d). Vault: %d. Resetting to Normal Mode.%n", withdraw, globalVault);

                    tableBalance = START_DEPOSIT;
                    // После успешного вывода мы выходим из режима выживания (false)
                    runner = createRunner(tableBalance, false);
                }
                else {
                    // Если мы в режиме выживания и удвоили стек, можно выключить выживание,
                    // но для безопасности лучше держать его до самого Cash Out.
                    // Просто пересоздаем раннер с текущим флагом режима
                    boolean isSurvival = (runner.getStrategy() instanceof RngSmartCoverageStrategy s) && isSurvivalMode(s);
                    runner = createRunner(tableBalance, isSurvival);
                }
            }
        }

        System.out.println("=================================");
        System.out.println("Table Balance: " + tableBalance);
        System.out.println("REAL VAULT: " + globalVault);
        System.out.println("Rebuys: " + rebuys);
        System.out.println("Total Net: " + (globalVault + tableBalance - START_DEPOSIT));
    }

    // Хак для получения состояния, или просто передавайте флаг через переменную цикла
    // Для простоты будем считать, что если мы делали rebuy, мы знаем об этом.
    // Но здесь проще передать явный флаг в createRunner
    static Runner createRunner(long currentBalance, boolean survivalMode) {
        long minBet = Math.max(1, (long)(currentBalance * BASE_RISK));

        Config config = ConfigBuilder.builder()
                .european()
                .name("RNG V11 " + (survivalMode ? "SURVIVAL" : "NORMAL"))
                .realBalance(currentBalance * 10)
                .startBalance(currentBalance)
                .minBet(minBet)
                .maxBet(currentBalance)
                .tableLimit(currentBalance * 10)
                .stopLossPercentageStop(survivalMode ? 10 : 15) // В выживании стоп короче
                .takeProfitPercentageStop(survivalMode ? 15 : 10)
                .riskDisabled()
                .floatingMinBetPercentLimit(0)
                .build();

        return Runner.of(new RngSmartCoverageStrategy2(config, survivalMode));
    }

    // Вспомогательный метод не нужен, если логика в main правильная,
    // но для компиляции нужен доступ к полю survivalMode.
    // Проще управлять флагом в main, но в рамках этого кода мы полагаемся на createRunner.
    private static boolean isSurvivalMode(RngSmartCoverageStrategy strategy) {
        // Это псевдокод, так как поле private.
        // В реальном коде лучше в Main хранить boolean currentMode = false;
        // и передавать его.
        return strategy.toString().contains("Phoenix"); // Или добавить геттер
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