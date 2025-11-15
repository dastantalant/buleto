package com.traderoom.bet.service;

import com.traderoom.bet.entity.Token;
import com.traderoom.bet.payload.request.TokenRequest;
import java.util.List;
import java.util.Optional;

public interface TokenService {
    Optional<Token> findByTokenId(long tokenId);

    List<Token> findAllByEmailAndExpiredFalseAndRevokedFalse(String email);

    Optional<Token> findByToken(String token);

    List<Token> findByEmail(String email);

    Token save(Token token);

    void saveAll(List<Token> tokens);

    Token update(long tokenId, TokenRequest token);

    void delete(long tokenId);

    void deleteByToken(String token);

    void deleteAllByEmail(String email);

    boolean existByTokenByExpiredFalseAndRevokedFalse(String token);
}
