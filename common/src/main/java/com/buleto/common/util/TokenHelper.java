package com.buleto.common.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.buleto.common.model.account.Token;

import java.time.Duration;
import java.time.Instant;

public class TokenHelper {

    public static Token extract(String token) {
        DecodedJWT decode = JWT.decode(token);
        Instant issued = decode.getIssuedAtAsInstant();
        Instant expires = decode.getExpiresAtAsInstant();
        return new Token(decode.getToken(), issued, expires);
    }

    public static boolean validToken(Token token) {
        var between = Duration.between(Instant.now(), token.expires());
        return between.toMinutes() > 15;
    }
}
