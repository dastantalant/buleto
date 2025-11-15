package com.traderoom.api.enums;

public enum Amount {
    _10(10),
    _25(25),
    _50(50),
    _100(100),
    _250(250),
    ;

    private final int amount;

    Amount(int amount) {
        this.amount = amount;
    }

    public int getAmount() {
        return amount;
    }
}
