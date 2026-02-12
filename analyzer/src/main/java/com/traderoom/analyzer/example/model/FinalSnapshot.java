package com.traderoom.analyzer.example.model;

import java.util.List;

import com.traderoom.core.csv.CsvColumn;
import com.traderoom.core.csv.CsvFile;
import com.traderoom.core.csv.CsvIgnore;
import com.traderoom.core.csv.Separator;
import com.traderoom.api.runner.SimulateResult;
import com.traderoom.api.model.Snapshot;

import lombok.Builder;

@Builder
@CsvFile(separator = Separator.SEMICOLON)
public record FinalSnapshot(
        @CsvColumn(value = "strategy", order= 1)
        String strategyName,
        @CsvColumn(value = "config", order= 2)
        String config,
        @CsvColumn(value = "repeat", order= 3)
        int repeat,
        @CsvColumn(value = "rounds", order= 4)
        long roundNumber,
        @CsvColumn(value = "start", order= 5)
        long startBalance,
        @CsvColumn(value = "realBalance", order= 6)
        long balance,
        @CsvColumn(value = "peak", order= 7)
        long peakBalance,
        @CsvColumn(value = "profit", order= 8)
        long netProfit,
        @CsvColumn(value = "roi%", order= 9)
        double roiPercentage,
        @CsvColumn(value = "win_rate%", order= 10)
        double winRatePercentage,
        @CsvColumn(value = "curDD", order= 11)
        double currentDrawdown,
        @CsvColumn(value = "maxDD", order= 12)
        double maxDrawdown,
        @CsvColumn(value = "PF", order= 13)
        double profitFactor,
        @CsvColumn(value = "betCount", order = 14)
        long betCount,
        @CsvColumn(value = "won", order= 15)
        long totalWon,
        @CsvColumn(value = "lost", order= 16)
        long totalLost,
        @CsvColumn(value = "wagered", order= 17)
        long totalWagered,
        @CsvColumn(value = "payout", order= 18)
        long totalPayout,
        @CsvIgnore
        List<SimulateResult> results
) {
    public static FinalSnapshot from(SimulateResult res, int repeat) {
        Snapshot snapshot = res.runnerResult().snapshot();
        return FinalSnapshot.builder()
                .strategyName(res.strategy())
                .config(res.config())
                .repeat(repeat)
                .roundNumber(snapshot.roundNumber())
                .balance(snapshot.realBalance())
                .startBalance(snapshot.startBalance())
                .peakBalance(snapshot.peakBalance())
                .netProfit(snapshot.netProfit())
                .roiPercentage(snapshot.roiPercentage())
                .winRatePercentage(snapshot.winRatePercentage())
                .currentDrawdown(snapshot.currentDrawdown())
                .maxDrawdown(snapshot.maxDrawdown())
                .profitFactor(snapshot.profitFactor())
                .betCount(snapshot.betCount())
                .totalWon(snapshot.totalWon())
                .totalLost(snapshot.totalLost())
                .totalWagered(snapshot.totalWagered())
                .totalPayout(snapshot.totalPayout())
                .build();
    }

    public double getRoi() {
        return startBalance == 0 ? 0 : ((double) netProfit / startBalance) * 100;
    }
}