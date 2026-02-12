package com.traderoom.analyzer.predictor.test;

import com.traderoom.api.enums.RouletteType;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.SpotPrediction;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

public class TestRunner {
    static void run(PredictorTest prediction, RouletteType rouletteType, LinkedList<Integer> deque, int windowSize, int limit, boolean debug) {
        LinkedList<Spot> history = new LinkedList<>();
        int i = 0;
        int won = 0;
        int loss = 0;
        StringBuilder builder = new StringBuilder();
        for (Integer spot : deque) {
            i++;
            List<SpotPrediction> predict = prediction.predict(history, rouletteType, windowSize).stream()
                    .limit(limit)
                    .toList();
            if (!predict.isEmpty()) {
                boolean pred = false;
                for (SpotPrediction item : predict) {
                    pred = item.spot().getNumber() == spot || pred;
                }
                if (debug) {
                    String joining = joining(predict, pred);
                    builder.append(String.format("%4d. %2d: %s\n", i, spot, joining));
                }
                if (pred) won++;
                else loss++;
            }
            history.add(Spot.getByNumber(spot));
        }
        if(debug) builder.append("\n");
        int all = won + loss;
        builder.append(String.format("%20s %5d: %5d = won: %5d loss: %5d %d%%", prediction.getClass().getSimpleName(),i, all, won, loss , (won*100)/all));
        System.out.println(builder);
    }

    private static String joining(List<SpotPrediction> predict, boolean pred) {
        if (predict.isEmpty()) return "";
        String joining = predict.stream()
                .map(SpotPrediction::show)
                .collect(Collectors.joining(" | "));
        return "[" + predict.size() + "]" + (pred ? "[true]" : "    ") + joining;
    }
}
