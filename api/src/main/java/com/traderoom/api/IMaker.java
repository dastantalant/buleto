package com.traderoom.api;

import com.traderoom.api.model.Bet;

import java.util.List;

@FunctionalInterface
public interface IMaker {
    List<Bet> decide();
}