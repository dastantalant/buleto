package com.buleto.core.model;

import com.toolbox.core.csv.CsvColumn;
import com.toolbox.core.csv.CsvFile;

import lombok.Builder;

import java.util.Objects;

@Builder
@CsvFile
public record Round(
        @CsvColumn(value = "id") long roundId,
        @CsvColumn(value = "cell") int cell,
        @CsvColumn(value = "start_time") long startTime,
        @CsvColumn(value = "victory_time") long victoryTime,
        @CsvColumn(value = "factor") int factor,
        @CsvColumn(value = "begin_value") int beginValue,
        @CsvColumn(value = "target_value") int targetValue,
        @CsvColumn(value = "start_value") int startValue,
        @CsvColumn(value = "end_time") long endTime,
        @CsvColumn(value = "closed_time") long closedTime,
        @CsvColumn(value = "target_time") long targetTime
) {
    public boolean isComplete() {
        return roundId > 0 && cell >= 0 && victoryTime > 0;
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Round round)) return false;
        return roundId == round.roundId;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(roundId);
    }
}