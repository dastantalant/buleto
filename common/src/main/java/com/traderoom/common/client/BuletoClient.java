package com.traderoom.common.client;

import com.traderoom.common.model.account.Account;import com.traderoom.common.model.account.Credit;

public interface BuletoClient {
    Account login(Credit credit);

    Account updateBalance(Account account);

    boolean updateToken(Account account);
}
