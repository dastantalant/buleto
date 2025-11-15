package com.traderoom.bet.repository;

import com.traderoom.bet.entity.Token;
import com.traderoom.bet.payload.request.TokenRequest;
import com.traderoom.bet.service.TokenService;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import javax.sql.DataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

@Repository
public class TokenRepository implements TokenService {
    private static final Logger logger = LoggerFactory.getLogger(TokenRepository.class);
    private final JdbcClient jdbcClient;
    private final DataSource dataSource;

    public TokenRepository(JdbcClient jdbcClient, DataSource dataSource) {
        this.jdbcClient = jdbcClient;
        this.dataSource = dataSource;
    }

    public Optional<Token> findByTokenId(long tokenId) {
        final String sql = """
                SELECT token_id,
                       email,
                       token,
                       expired,
                       revoked
                FROM token
                WHERE token_id = ?
                """;
        return jdbcClient.sql(sql)
                .param(tokenId)
                .query(Token.class)
                .optional();
    }

    @Override
    public List<Token> findAllByEmailAndExpiredFalseAndRevokedFalse(String email) {
        String sql = """
                SELECT token_id,
                       email,
                       token,
                       expired,
                       revoked
                FROM token
                WHERE email = ?
                AND expired = false
                AND revoked = false
                """;
        return jdbcClient.sql(sql)
                .param(email)
                .query(Token.class)
                .list();
    }

    public Optional<Token> findByToken(String token) {
        final String sql = """
                SELECT token_id,
                       email,
                       token,
                       expired,
                       revoked
                FROM token
                WHERE token = ?
                """;
        return jdbcClient.sql(sql)
                .param(token)
                .query(Token.class)
                .optional();
    }

    public List<Token> findByEmail(String email) {
        final String sql = """
                SELECT token_id,
                       email,
                       token,
                       expired,
                       revoked
                FROM token
                WHERE email = ?
                """;
        return jdbcClient.sql(sql)
                .param(email)
                .query(Token.class)
                .list();
    }

    public Token save(Token token) {
        final String sql = """
                INSERT INTO token (email, token, expired, revoked)
                VALUES (?, ?, ?, ?)
                ON CONFLICT (token) DO UPDATE
                SET expired = EXCLUDED.expired,
                    revoked = EXCLUDED.revoked
                RETURNING token_id, email, token, expired, revoked;
                """;
        return jdbcClient.sql(sql)
                .param(token.getEmail())
                .param(token.getToken())
                .param(token.isExpired())
                .param(token.isRevoked())
                .query(Token.class)
                .optional()
                .orElse(token);
    }
    public void saveAll(List<Token> tokens) {
        final String sql = """
                UPDATE token
                SET token = ?,
                    expired = ?,
                    revoked = ?
                WHERE token_id = ?
                RETURNING token_id, email, token, expired, revoked;
                """;
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement statement = connection.prepareStatement(sql);
            for (Token token : tokens) {
                statement.setString(1, token.getToken());
                statement.setBoolean(2, token.isExpired());
                statement.setBoolean(3, token.isExpired());
                statement.setLong(4, token.getTokenId());
                statement.addBatch();
            }
            statement.executeBatch();
        } catch (SQLException e) {
            logger.error("Error while saving token list", e);
        }
    }
    public Token update(long tokenId, TokenRequest token) {
        final String sql = """
                UPDATE token
                SET token = ?,
                    expired = ?,
                    revoked = ?
                WHERE token_id = ?
                RETURNING token_id, email, token, expired, revoked;
                """;
        return jdbcClient.sql(sql)
                .param(token.token())
                .param(token.expired())
                .param(token.revoked())
                .param(tokenId)
                .query(Token.class)
                .optional()
                .orElse(null);
    }

    public void delete(long tokenId) {
        final String sql = "DELETE FROM token WHERE token_id = ?";
        jdbcClient.sql(sql).param(tokenId).update();
    }

    public void deleteByToken(String token) {
        final String sql = "DELETE FROM token WHERE token = ?";
        jdbcClient.sql(sql).param(token).update();
    }

    public void deleteAllByEmail(String email) {
        final String sql = "DELETE FROM token WHERE email = ?";
        jdbcClient.sql(sql).param(email).update();
    }

    public boolean existByTokenByExpiredFalseAndRevokedFalse(String token) {
        final String sql = """
                SELECT EXISTS (
                    SELECT 1
                    FROM token
                    WHERE token = ?
                    AND expired = false
                    AND revoked = false
                )
                """;
        return jdbcClient.sql(sql)
                .param(token)
                .query(boolean.class)
                .optional()
                .orElse(false);
    }
}
