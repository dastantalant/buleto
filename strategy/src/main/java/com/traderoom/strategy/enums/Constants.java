package com.traderoom.strategy.enums;

import lombok.experimental.UtilityClass;

import java.security.SecureRandom;
import java.util.Random;

@UtilityClass
public class Constants {
    public static final Random RANDOM = new SecureRandom();

    public static final int SPOT_HISTORY_LIST_SIZE = 100;

    public static final int BALANCE_HISTORY_SIZE = 100;

    public static final String PACKAGE = "com.traderoom.strategy";
}