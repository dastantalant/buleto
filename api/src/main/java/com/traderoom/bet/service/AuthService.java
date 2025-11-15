package com.traderoom.bet.service;

import com.traderoom.bet.entity.Token;
import com.traderoom.bet.payload.request.AuthRequest;
import com.traderoom.bet.payload.response.AuthResponse;
import com.traderoom.bet.security.JwtTokenProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserDetailsService userService;
    private final TokenService tokenService;

    public AuthService(
            AuthenticationManager authenticationManager,
            JwtTokenProvider tokenProvider,
            UserDetailsService userService,
            TokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.userService = userService;
        this.tokenService = tokenService;
    }

    public AuthResponse authenticate(AuthRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.email(),
                            request.password()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String accessToken = tokenProvider.generateAccessToken(authentication);
            String refreshToken = tokenProvider.generateRefreshToken(authentication);
            saveRefreshToken(request.email(), refreshToken);

            return new AuthResponse(accessToken, refreshToken);
        } catch (BadCredentialsException ex) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Неверные данные");
        }
    }

    public AuthResponse refreshToken(String refreshToken) {
        refreshToken = getToken(refreshToken);
        if (!tokenProvider.validateToken(refreshToken, Token.REFRESH)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Токен не является refresh-токеном");
        }

        boolean exist = tokenService.existByTokenByExpiredFalseAndRevokedFalse(refreshToken);
        if(!exist) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Недействительный refresh-токен");
        }
        String username = tokenProvider.extractEmailFromToken(refreshToken);
        UserDetails userDetails = userService.loadUserByUsername(username);
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );
        String newAccessToken = tokenProvider.generateAccessToken(authentication);
        return new AuthResponse(newAccessToken, refreshToken);
    }

    public void logout(String token) {
        String actualToken = getToken(token);
        if (checkToken(actualToken)) {
            tokenService.deleteByToken(actualToken);
            SecurityContextHolder.clearContext();
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Недействительный токен");
        }
    }

    public void logoutAll(String token) {
        String actualToken = getToken(token);
        if (checkToken(actualToken)) {
            String email = tokenProvider.extractEmailFromToken(actualToken);
            tokenService.deleteAllByEmail(email);
            SecurityContextHolder.clearContext();
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Недействительный токен");
        }
    }

    private String getToken(String token) {
        return token.startsWith(Token.BEARER) ? token.substring(7) : token;
    }

    private boolean checkToken(String token) {
        String actualToken = getToken(token);
        return tokenProvider.validateToken(actualToken, Token.ACCESS)
               || tokenProvider.validateToken(actualToken, Token.REFRESH);
    }

    private void saveRefreshToken(String email, String refreshToken) {
        Token token = Token.builder()
                .email(email)
                .token(refreshToken)
                .expired(false)
                .revoked(false)
                .build();
        tokenService.save(token);
    }
}