package com.buleto.analyzer.example.model;

import com.toolbox.core.converter.Converter;
import com.trading.roulette.api.model.Bet;

import java.util.List;

public class BetListConverter implements Converter<List<Bet>, String> {
    @Override
    public String convert(List<Bet> source) {
        if (source == null || source.isEmpty()) {
            return "";
        }
        StringBuilder sb = new StringBuilder();
        source.forEach(bet -> sb.append(bet.type().name())
                .append(':')
                .append(bet.value())
                .append(' '));
        return sb.toString();
    }
}
