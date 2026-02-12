package com.traderoom.web.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoundModel {
    @JsonProperty("id")
    private long roundId;
    private int cell;
    @JsonProperty("start_time")
    private Instant startTime;
    @JsonProperty("victory_time")
    private Instant victoryTime;
    private int factor;

    public long roundId() {
        return roundId;
    }

    public void roundId(long roundId) {
        this.roundId = roundId;
    }

    public int cell() {
        return cell;
    }

    public void cell(int cell) {
        this.cell = cell;
    }

    public Instant startTime() {
        return startTime;
    }

    public void startTime(Instant startTime) {
        this.startTime = startTime;
    }

    public Instant victoryTime() {
        return victoryTime;
    }

    public void victoryTime(Instant victoryTime) {
        this.victoryTime = victoryTime;
    }

    public int factor() {
        return factor;
    }

    public void factor(int factor) {
        this.factor = factor;
    }
}
