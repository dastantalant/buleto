package com.traderoom.web.client;

import com.traderoom.web.model.account.Account;import com.traderoom.web.model.account.Credit;

public interface BuletoClient {
    Account login(Credit credit);

    Account updateBalance(Account account);

    boolean updateToken(Account account);
}
