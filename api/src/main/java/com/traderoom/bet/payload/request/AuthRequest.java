package com.traderoom.bet.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record AuthRequest(
        @NotBlank(message = "Email не может быть пустым")
        @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[az]{2,3}",
                flags = Pattern.Flag.CASE_INSENSITIVE)
        @Size(min = 3, max = 50, message = "Email должен содержать от 3 до 50 символов")
        String email,
        @NotBlank(message = "Пароль не может быть пустым")
        String password
) {
}
