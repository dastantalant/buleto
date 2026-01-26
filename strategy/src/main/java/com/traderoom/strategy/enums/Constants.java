package com.traderoom.strategy.enums;

import com.traderoom.strategy.StrategyMain;

import lombok.experimental.UtilityClass;

import java.security.SecureRandom;
import java.util.Random;

@UtilityClass
public class Constants {
    public static final Random RANDOM = new SecureRandom();

    public static final int SPOT_HISTORY_LIST_SIZE = 10000;

    public static final int BALANCE_HISTORY_SIZE = 10000;

    public static final Package PACKAGE = StrategyMain.class.getPackage();
}