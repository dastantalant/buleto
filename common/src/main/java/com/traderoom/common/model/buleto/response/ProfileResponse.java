package com.traderoom.common.model.buleto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileResponse {
    private long accountNumber;
    private String name;
    private String lastName;
    private long phone;
    private String email;
    private Instant birthdate;
}
