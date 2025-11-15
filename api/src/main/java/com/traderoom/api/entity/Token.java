package com.traderoom.api.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Token {
    public static final String BEARER = "Bearer ";
    public static final String REFRESH = "REFRESH";
    public static final String ACCESS = "ACCESS";

    private long tokenId;
    private String email;
    private String token;
    private boolean expired;
    private boolean revoked;
}
