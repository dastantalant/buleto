package com.traderoom.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
public class RoundEntity {
    @Id
    @Column(name = "id")
    private long id;
    private int cell;
    private Instant startTime;
    private Instant victoryTime;
    private int factor;
}
