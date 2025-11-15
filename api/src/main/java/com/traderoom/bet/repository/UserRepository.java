package com.traderoom.bet.repository;

import com.traderoom.bet.entity.User;
import com.traderoom.bet.service.UserService;
import java.util.List;
import java.util.Optional;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository implements UserService {
    private final JdbcClient jdbcClient;
    private final RowMapper<User> mapper;

    public UserRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
        mapper= (rs, rowNum) -> new User(
                rs.getString("email"),
                rs.getString("password"),
                rs.getBoolean("enabled"),
                List.of(rs.getString("roles").split(","))
        );
    }

    public Optional<User> findByEmail(String email) {
        final String sql ="""
                SELECT email,
                       password,
                       enabled,
                       STRING_AGG(role.name, ',') as roles
                FROM users
                    INNER JOIN user_role ON users.email = user_role.user_id
                    INNER JOIN role ON user_role.role_id = role.role_id
                WHERE users.email = ?
                GROUP BY email,
                         password,
                         enabled
                """;
        return jdbcClient.sql(sql)
                .param(email)
                .query(mapper)
                .optional();
    }
}
