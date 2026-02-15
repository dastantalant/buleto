package com.buleto.analyzer.example.model;

import com.toolbox.core.csv.CsvColumn;
import com.toolbox.core.csv.CsvFile;
import com.toolbox.core.csv.CsvIgnore;
import com.toolbox.core.csv.Separator;
import com.trading.roulette.api.enums.Spot;
import com.trading.roulette.api.model.Bet;
import com.trading.roulette.api.model.Snapshot;

import lombok.Builder;

import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Builder
@CsvFile(separator = Separator.SEMICOLON)
public record CsvSnapshot(
        @CsvIgnore
        String strategyName,
        @CsvColumn(value = "round", order = 1)
        long roundNumber,
        @CsvColumn(value = "realBalance", order = 2)
        long balance,
        @CsvColumn(value = "lastProf", order = 4)
        long lastProfit,
        @CsvColumn(value = "netProf", order = 5)
        long netProfit,
        @CsvColumn(value = "roundBet", order = 6)
        long roundBetAmount,
        @CsvColumn(value = "ROI%", order = 7)
        double roiPercentage,
        @CsvColumn(value = "winRate%", order = 8)
        double winRatePercentage,
        @CsvColumn(value = "curDD", order = 9)
        double currentDrawdown,
        @CsvColumn(value = "maxDD", order = 10)
        double maxDrawdown,
        @CsvColumn(value = "PF", order = 11)
        double profitFactor,
        @CsvColumn(value = "lastSpot", order = 12)
        Spot lastSpot,
        @CsvColumn(value = "betCount", order = 13)
        long betCount,
        @CsvColumn(value = "won", order = 14)
        long totalWon,
        @CsvColumn(value = "lost", order = 15)
        long totalLost,
        @CsvColumn(value = "peak", order = 16)
        long peakBalance,
        @CsvColumn(value = "wagered", order = 17)
        long totalWagered,
        @CsvColumn(value = "payout", order = 18)
        long totalPayout,
        @CsvColumn(value = "bets", order = 19, converter = BetListConverter.class)
        List<Bet> lastBets,
        @CsvColumn(value = "start", order = 20)
        long startBalance,
        @CsvIgnore
        boolean isLive
) {
    public static Collection<CsvSnapshot> from(Collection<Snapshot> snapshot) {
        return snapshot.stream()
                .map(CsvSnapshot::from)
                .collect(Collectors.toCollection(LinkedList::new));
    }

    public static CsvSnapshot from(Snapshot snapshot) {
        return CsvSnapshot.builder()
                .strategyName(snapshot.strategyName())
                .roundNumber(snapshot.roundNumber())
                .balance(snapshot.realBalance())
                .lastProfit(snapshot.lastProfit())
                .netProfit(snapshot.netProfit())
                .roundBetAmount(snapshot.roundBetAmount())
                .roiPercentage(snapshot.roiPercentage())
                .winRatePercentage(snapshot.winRatePercentage())
                .currentDrawdown(snapshot.currentDrawdown())
                .maxDrawdown(snapshot.maxDrawdown())
                .profitFactor(snapshot.profitFactor())
                .lastSpot(snapshot.lastSpot())
                .betCount(snapshot.betCount())
                .totalWon(snapshot.totalWon())
                .totalLost(snapshot.totalLost())
                .peakBalance(snapshot.peakBalance())
                .totalWagered(snapshot.totalWagered())
                .totalPayout(snapshot.totalPayout())
                .lastBets(snapshot.lastBets())
                .startBalance(snapshot.startBalance())
                .isLive(snapshot.isLive())
                .build();
    }
}
