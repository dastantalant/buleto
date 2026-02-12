package com.traderoom.web.model.account;

import lombok.Builder;

// new Credit("pi6.3.141592@gmail.com", "factorial(6)=720");
@Builder
public record Credit(String username, String password) {
}
