package com.traderoom.analyze;

import lombok.Getter;

@Getter
public class Player {
    private final String email;
    private final String password;
    private final Balance balance;

    public Player(String email, String password, Balance balance) {
        this.email = email;
        this.password = password;
        this.balance = balance;
    }

    public String toString() {
        return String.format("Player{ %s %s }", email, balance);
    }
}
