package com.traderoom.bet.service;

import com.traderoom.bet.entity.User;
import java.util.Optional;

public interface UserService {
    Optional<User> findByEmail(String email);
}
