package com.buleto.common.model.buleto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountResponse {
    private long accountNumber;
    private String name;
    private String lastName;
    private long phone;
    private double balance;
    private double tradingBalance;
    private double trainingBalance;
    private String amounts;
    private long betLimit;
    private long contractLimit;
    private List<Pair> pairs;
    private String token;

    @Builder
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    static class Pair {
        @JsonProperty("Id")
        private long id;
        @JsonProperty("Name")
        private String name;
    }
}
