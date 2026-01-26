package com.traderoom.strategy.config;

import com.traderoom.core.converter.Converter;
import com.traderoom.strategy.model.Bet;

import java.util.List;

public class BetListConverter implements Converter<List<Bet>, String> {
    @Override
    public String convert(List<Bet> source) {
        StringBuilder sb = new StringBuilder();
        source.forEach(bet -> sb.append(bet.type().name()).append(':').append(bet.value()));
        return sb.toString();
    }
}
