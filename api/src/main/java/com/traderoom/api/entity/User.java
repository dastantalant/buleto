package com.traderoom.api.entity;

import java.util.Collection;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
@Builder
@RequiredArgsConstructor
public class User implements UserDetails {
    private final String email;
    private final String password;
    private final boolean enabled;
    private final List<String> roles;

    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (roles != null) {
            return roles.stream().map(SimpleGrantedAuthority::new).toList();
        }
        return List.of();
    }

    public String getUsername() {
        return email;
    }
}
