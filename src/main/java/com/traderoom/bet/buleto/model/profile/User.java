package com.traderoom.bet.buleto.model.profile;

import java.util.LinkedList;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@RequiredArgsConstructor
@ToString
public class User {
    private final String email;
    private final String password;
    private final LinkedList<Profile> profiles;
}
