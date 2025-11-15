package com.traderoom.bet.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

@Builder
public record TokenRequest(
        @NotBlank(message = "Email не может быть пустым")
        @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[az]{2,3}",
                flags = Pattern.Flag.CASE_INSENSITIVE)
        String email,
        @NotBlank(message = "Токен не может быть пустым")
        String token,
        boolean expired,
        boolean revoked
) {
}
