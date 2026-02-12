package com.traderoom.api.stop;

import com.traderoom.api.IStrategy;

@FunctionalInterface
public interface StopCondition  {
    boolean should(IStrategy strategy);
}