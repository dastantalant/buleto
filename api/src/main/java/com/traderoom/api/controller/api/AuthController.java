package com.traderoom.api.controller.api;

import com.traderoom.api.payload.request.AuthRequest;
import com.traderoom.api.payload.response.AuthResponse;
import com.traderoom.api.service.AuthService;
import jakarta.validation.constraints.NotBlank;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody @NonNull AuthRequest request) {
        logger.debug("Login request: {}", request);
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken(
            @RequestHeader("Authorization") @NotBlank String refreshToken
    ) {
        logger.debug("Refresh token request: {}", refreshToken);
        return ResponseEntity.ok(authService.refreshToken(refreshToken));
    }
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            @RequestHeader("Authorization") @NotBlank String refreshToken
    ) {
        logger.debug("Logout request: {}", refreshToken);
        authService.logout(refreshToken);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/logout/all")
    public ResponseEntity<Void> logoutAll(
            @RequestHeader("Authorization") @NotBlank String refreshToken
    ) {
        logger.debug("Logout all request: {}", refreshToken);
        authService.logoutAll(refreshToken);
        return ResponseEntity.noContent().build();
    }
}
