package com.buleto.analyzer.predictor.test;

import com.buleto.analyzer.D20260123;
import com.buleto.analyzer.D20260124;
import com.buleto.analyzer.D20260125;
import com.buleto.analyzer.D20260126;
import com.buleto.analyzer.D20260127;
import com.buleto.analyzer.D20260128;
import com.buleto.analyzer.D20260129;
import com.buleto.analyzer.D20260130;
import com.buleto.analyzer.D20260201;
import com.trading.roulette.api.enums.RouletteType;

import java.util.LinkedList;

import static com.buleto.analyzer.BuletoConstants.DEQUE;
import static com.trading.roulette.api.enums.RouletteType.EUROPEAN;

public class Test {
    static int windowSize = 160;
    static int limit = 6;
    static int old = 1;
    static boolean debug = false;
    static RouletteType type = EUROPEAN;

    static void main() {
        LinkedList<Integer> deque = deque();
        TestRunner.run(new EnsemblePredictor(), EUROPEAN, deque, windowSize, limit, debug);
//        TestRunner.run(new BayesianTest(), EUROPEAN, deque, windowSize, limit, debug);
//        TestRunner.run(new FrequencyTest(), EUROPEAN, deque, windowSize, limit, debug);
//        TestRunner.run(new PatternTest(), EUROPEAN, deque, windowSize, limit, debug);
    }

    static LinkedList<Integer> deque() {
        LinkedList<Integer> deque = deque(old);
        if (type == EUROPEAN) {
            LinkedList<Integer> history = new LinkedList<>();
            for (Integer spot : deque) {
                history.add(spot == -1 ? 0 : spot);
            }
            return history;
        }
        return deque;
    }

    static LinkedList<Integer> deque(int old) {
        return old == 1 ? new LinkedList<>(DEQUE) : new LinkedList<>() {{
            addAll(D20260123.deque());
            addAll(D20260124.deque());
            addAll(D20260125.deque());
            addAll(D20260126.deque());
            addAll(D20260127.deque());
            addAll(D20260128.deque());
            addAll(D20260129.deque());
            addAll(D20260130.deque());
            addAll(D20260201.deque());
        }};
    }
}
