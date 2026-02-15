package com.buleto.common.client;

import com.buleto.common.model.account.Account;
import com.buleto.common.model.account.Credit;

public interface BuletoClient {
    Account login(Credit credit);

    Account updateBalance(Account account);

    boolean updateToken(Account account);
}
