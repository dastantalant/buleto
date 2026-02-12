package com.traderoom.web.repository;

import com.traderoom.web.model.RoundModel;
import com.traderoom.core.websocket.Round;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ParameterizedPreparedStatementSetter;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class RoundJdbcRepository {

    private final JdbcTemplate jdbcTemplate;

    private static final String UPSERT = """
            INSERT INTO round (id, cell, factor, start_time, victory_time)
            VALUES (?, ?, ?, ?, ?)
            ON CONFLICT (id)
            DO UPDATE SET
                cell         = EXCLUDED.cell,
                factor       = EXCLUDED.factor,
                start_time   = EXCLUDED.start_time,
                victory_time = EXCLUDED.victory_time
            """;

    private final ParameterizedPreparedStatementSetter<RoundModel> setterModel = (ps, round) -> {
        ps.setLong(1, round.roundId());
        ps.setInt(2, round.cell());
        ps.setInt(3, round.factor());
        ps.setTimestamp(4, round.startTime() == null ? null : Timestamp.from(round.startTime()));
        ps.setTimestamp(5, round.victoryTime() == null ? null : Timestamp.from(round.victoryTime()));
    };

    private final ParameterizedPreparedStatementSetter<Round> setter = (ps, round) -> {
        ps.setLong(1, round.roundId());
        ps.setInt(2, round.cell());
        ps.setInt(3, round.factor());
        long startMs = round.startTime();
        long victoryMs = round.victoryTime();
        Timestamp startTs = (startMs > 0)
                ? Timestamp.from(Instant.ofEpochMilli(startMs))
                : Timestamp.from(Instant.now());
        Timestamp victoryTs = (victoryMs > 0)
                ? Timestamp.from(Instant.ofEpochMilli(victoryMs))
                : startTs;
        ps.setTimestamp(4, startTs);
        ps.setTimestamp(5, victoryTs);
    };

    // ────────────────────────────────────────────────
    //  RoundModel
    // ────────────────────────────────────────────────

    public void saveModel(RoundModel round) {
        jdbcTemplate.update(UPSERT, ps -> setterModel.setValues(ps, round));
    }

    public void upsertModel(RoundModel round) {
        jdbcTemplate.update(UPSERT, ps -> setterModel.setValues(ps, round));
    }

    // ────────────────────────────────────────────────
    //  Batch — RoundModel
    // ────────────────────────────────────────────────

    public void saveAllModel(List<RoundModel> rounds) {
        if (rounds == null || rounds.isEmpty()) {
            return;
        }
        jdbcTemplate.batchUpdate(UPSERT, rounds, 5000, setterModel);
    }

    public void upsertAllModel(List<RoundModel> rounds) {
        if (rounds == null || rounds.isEmpty()) {
            return;
        }
        jdbcTemplate.batchUpdate(UPSERT, rounds, 5000, setterModel);
    }

    // ────────────────────────────────────────────────
    //  Round (websocket/domain)
    // ────────────────────────────────────────────────

    public void save(Round round) {
        if (round == null) {
            return;
        }
        jdbcTemplate.update(UPSERT, ps -> setter.setValues(ps, round));
    }

    public void upsert(Round round) {
        if (round == null) {
            return;
        }
        jdbcTemplate.update(UPSERT, ps -> setter.setValues(ps, round));
    }

    // ────────────────────────────────────────────────
    //  Batch — Round
    // ────────────────────────────────────────────────

    public void saveAll(List<Round> rounds) {
        if (rounds == null || rounds.isEmpty()) {
            return;
        }
        jdbcTemplate.batchUpdate(UPSERT, rounds, 5000, setter);
    }

    public void upsertAll(List<Round> rounds) {
        if (rounds == null || rounds.isEmpty()) {
            return;
        }
        jdbcTemplate.batchUpdate(UPSERT, rounds, 5000, setter);
    }
}