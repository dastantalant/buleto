package com.traderoom.common.client;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.traderoom.common.mapper.AccountMapper;
import com.traderoom.common.model.account.Account;
import com.traderoom.common.model.account.Credit;
import com.traderoom.common.model.buleto.response.AccountResponse;
import com.traderoom.common.model.buleto.response.BalanceResponse;
import com.traderoom.common.exception.AuthenticationException;
import com.traderoom.common.exception.HttpRequestException;
import com.traderoom.common.util.TokenHelper;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;

public class DefaultBuletoClient implements BuletoClient, AutoCloseable {

    private static final String LOGIN = "https://buleto.com/api/auth?login=%s&password=%s";
    private static final URI BALANCE = URI.create("https://buleto.com/api/balance");

    private final ObjectMapper mapper;
    private final HttpClient client;
    private final Map<Credit, HttpRequest> loginRequests;
    private final Map<Credit, HttpRequest> balanceRequests;

    public DefaultBuletoClient() {
        mapper = new ObjectMapper();
        client = HttpClient.newHttpClient();
        loginRequests = new HashMap<>();
        balanceRequests = new HashMap<>();
    }

    public Account login(Credit credit) {
        try {
            loginRequests.remove(credit);
            var request = getLoginRequest(credit);
            var send = client.send(request, HttpResponse.BodyHandlers.ofString());
            var response = mapper.readValue(send.body(), AccountResponse.class);
            return AccountMapper.toAccount(credit, response);
        } catch (Exception e) {
            throw new AuthenticationException(e);
        }
    }

    private HttpRequest getLoginRequest(Credit credit) {
        if (loginRequests.containsKey(credit)) {
            return loginRequests.get(credit);
        }
        var request = HttpRequest.newBuilder()
                .uri(URI.create(String.format(LOGIN, credit.username(), credit.password())))
                .GET()
                .build();
        loginRequests.put(credit, request);
        return request;
    }

    public Account updateBalance(Account account) {
        if (updateToken(account)) {
            return account;
        }
        var request = getBalanceRequest(account);
        var balance = getBalance(request);
        account.setBalance(balance);
        return account;
    }

    private double getBalance(HttpRequest request) {
        try {
            var send = client.send(request, HttpResponse.BodyHandlers.ofString());
            var response = mapper.readValue(send.body(), BalanceResponse.class);
            return response.getValue();
        } catch (Exception e) {
            throw new HttpRequestException(e);
        }
    }

    private HttpRequest getBalanceRequest(Account account) {
        Credit credit = account.getCredit();
        if (balanceRequests.containsKey(credit)) {
            return balanceRequests.get(credit);
        }
        var request = HttpRequest.newBuilder()
                .uri(BALANCE)
                .header("Authorization", "Bearer " + account.getToken().token())
                .GET()
                .build();
        balanceRequests.put(credit, request);
        return request;
    }

    public boolean updateToken(Account account) {
        if (TokenHelper.validToken(account.getToken())) {
            return false;
        }
        var login = login(account.getCredit());
        account.setBalance(login.getBalance());
        account.setToken(login.getToken());
        return true;
    }

    public void close() throws Exception {
        if (client != null) {
            client.close();
        }
    }
}
