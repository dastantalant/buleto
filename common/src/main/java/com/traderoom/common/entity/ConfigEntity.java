package com.traderoom.common.entity;

import com.traderoom.common.model.RawConfigModel;
import com.traderoom.common.strategy.StrategyEnum;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "config")

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ConfigEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @JdbcTypeCode(SqlTypes.JSON)
    private RawConfigModel payload;

    @Enumerated(EnumType.STRING)
    private List<StrategyEnum> strategies = new ArrayList<>();

    @CreationTimestamp
    private Instant created;
    @UpdateTimestamp
    private Instant updated;
}
