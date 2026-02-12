package com.traderoom.api.utils;

import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.State;
import java.util.Collections;
import java.util.List;

public final class HistoryUtil {
    private HistoryUtil() {}

    public static List<Spot> getSlidingWindow(State state, int windowSize) {
        List<Spot> history = state.getMarket().getHistory();
        int size = history.size();
        if (size == 0) return Collections.emptyList();
        int start = Math.max(0, size - windowSize);
        return history.subList(start, size);
    }
}