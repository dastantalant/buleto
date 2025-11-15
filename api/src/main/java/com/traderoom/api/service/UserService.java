package com.traderoom.api.service;

import com.traderoom.api.entity.User;
import java.util.Optional;

public interface UserService {
    Optional<User> findByEmail(String email);
}
