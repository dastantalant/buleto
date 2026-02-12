package com.traderoom.web.model.account;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class Account {
    private final Credit credit;
    private final long accountNumber;
    private final String name;
    private final String lastName;
    private final long phone;
    private double balance;
    private Token token;
}
