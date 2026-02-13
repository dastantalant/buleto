package com.traderoom.analyzer.predictor.test;

import com.traderoom.api.enums.RouletteType;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.SpotPrediction;

import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

@Deprecated
public class NeighborTest implements PredictorTest {
    private final int neighborCount = 2;

    @Override
    public List<SpotPrediction> predict( Deque<Spot> history, RouletteType rouletteType, int windowSize) {
        if(history.isEmpty()) return List.of();
        Spot lastSpot = history.getLast();
        if (lastSpot == null) return List.of();

        Spot[] layout = Spot.getWheelLayouts().get(rouletteType);
        if (layout == null) return List.of();
        int wheelSize = layout.length;
        int lastPos = lastSpot.getWheelPosition(rouletteType);
        if (lastPos == -1) return List.of();
        List<SpotPrediction> predictions = new ArrayList<>();
        for (int i = -neighborCount; i <= neighborCount; i++) {
            int index = (lastPos + i + wheelSize) % wheelSize;
            Spot neighbor = layout[index];
            predictions.add(SpotPrediction.of(neighbor, 1.0));
        }
        return predictions;
    }
}
