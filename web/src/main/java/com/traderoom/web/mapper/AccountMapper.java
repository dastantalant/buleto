package com.traderoom.web.mapper;

import com.traderoom.web.entity.AccountEntity;
import com.traderoom.web.model.account.Account;
import com.traderoom.web.model.account.Credit;
import com.traderoom.web.model.buleto.response.AccountResponse;
import com.traderoom.web.model.request.AccountRequest;
import com.traderoom.web.util.TokenHelper;

public class AccountMapper {
    public static Account toAccount(Credit credit, AccountResponse response) {
        var token = TokenHelper.extract(response.getToken());
        return Account.builder()
                .accountNumber(response.getAccountNumber())
                .phone(response.getPhone())
                .name(response.getName())
                .lastName(response.getLastName())
                .balance(response.getBalance())
                .credit(credit)
                .token(token)
                .build();
    }

    public static Credit toCredit(AccountRequest request) {
        return new Credit(request.getUsername(), request.getPassword());
    }

    public static AccountEntity toEntity(AccountRequest request) {
        return new AccountEntity(request.getUsername(), request.getPassword());
    }
}
