package com.traderoom.strategy.library;

public final class NumberUtils {
    private NumberUtils() {
    }

    public static final int[] INT_SIZE_TABLE = {9, 99, 999, 9999, 99999, 999999, 9999999, 99999999, 999999999, Integer.MAX_VALUE};

    public static final long[] LONG_SIZE_TABLE = {9, 99, 999, 9999, 99999, 999999, 9999999, 99999999, 999999999,
            9999999999L, 99999999999L, 999999999999L, 9999999999999L, 99999999999999L, 999999999999999L,
            9999999999999999L, 99999999999999999L, 999999999999999999L, Long.MAX_VALUE};

    public static final byte[] DIGIT_TENS = new byte[100];
    public static final byte[] DIGIT_ONES = new byte[100];

    static {
        for (int i = 0; i < 100; i++) {
            DIGIT_TENS[i] = (byte) (i / 10 + '0');
            DIGIT_ONES[i] = (byte) (i % 10 + '0');
        }
    }
}