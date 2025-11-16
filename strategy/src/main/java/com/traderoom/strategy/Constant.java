package com.traderoom.strategy;

import java.io.File;
import java.security.SecureRandom;
import java.util.Random;

public class Constant {
    private Constant() {
        throw new IllegalStateException("Constant class");
    }

    public static final Random RANDOM = new SecureRandom();

    public static final int SPOT_HISTORY_LIST_SIZE = 100;

    public static final int BALANCE_HISTORY_SIZE = 100;

    public static final File SETTING_FILE_DIRECTORY = new File("data/settings");

    public static final String ENABLE_STRATEGY_TXT = "enable-strategy.txt";
}