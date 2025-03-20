package com.traderoom.bet.buleto.model.profile;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@RequiredArgsConstructor
@ToString
public class Profile {
    private final String email;
    private final String password;
    private final User owner;
    private final long balance;
}
