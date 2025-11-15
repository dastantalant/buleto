package com.traderoom.analyze;

import lombok.Getter;

@Getter
public class Balance {
    private long balance;

    public Balance(long balance) {
        this.balance = balance;
    }

    public long add(long add) {
        balance = balance + Math.abs(add);
        return balance;
    }

    public long sub(long sub) {
        balance = balance - Math.abs(sub);
        return balance;
    }

    public long diff(long summ){
        return balance - Math.abs(summ);
    }

    public String toString() {
        return String.format("Balance{ %d }", balance);
    }
}
