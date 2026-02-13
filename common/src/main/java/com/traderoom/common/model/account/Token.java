package com.traderoom.common.model.account;

import lombok.Builder;

import java.time.Instant;

@Builder
public record Token(String token, Instant issued, Instant expires) {
}
