package com.traderoom.common.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.time.Instant;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true, fluent = true)
public class RoundModel {
    @JsonProperty("id")
    private long roundId;
    private int cell;
    @JsonProperty("start_time")
    private Instant startTime;
    @JsonProperty("victory_time")
    private Instant victoryTime;
    private int factor;
    @JsonProperty("begin_value")
    private int beginValue;
    @JsonProperty("target_value")
    private int targetValue;
    @JsonProperty("start_value")
    private int startValue;
    @JsonProperty("end_time")
    private Instant endTime;
    @JsonProperty("closed_time")
    private Instant closedTime;
    @JsonProperty("target_time")
    private Instant targetTime;
}
