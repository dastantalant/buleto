package com.buleto.common.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(name = "round")

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true, fluent = true)
public class RoundEntity {
    @Id
    @Column(name = "id")
    private long id;
    private int cell;
    private Instant startTime;
    private Instant victoryTime;
    private int factor;
    private int beginValue;
    private int targetValue;
    private int startValue;
    private Instant endTime;
    private Instant closedTime;
    private Instant targetTime;
}
