package com.traderoom.analyzer.buleto;

import java.util.List;

import com.traderoom.core.csv.CsvColumn;
import com.traderoom.core.csv.CsvFile;
import com.traderoom.core.csv.CsvIgnore;
import com.traderoom.core.csv.Separator;
import com.traderoom.strategy.simulate.SimulateResult;
import com.traderoom.strategy.model.context.Snapshot;

import lombok.Builder;

@Builder
@CsvFile(separator = Separator.SEMICOLON)
public record GlobalSnapshot(
        @CsvColumn(value = "strategy", order= 1)
        String strategyName,
        @CsvColumn(value = "config", order= 2)
        String config,
        @CsvColumn(value = "repeat", order= 3)
        int repeat,
        @CsvColumn(value = "rounds", order= 4)
        long roundNumber,
        @CsvColumn(value = "balance", order= 5)
        long balance,
        @CsvColumn(value = "start", order= 6)
        long startBalance,
//        @CsvColumn(value = "lastPt", order= 6)
//        long lastProfit,
        @CsvColumn(value = "profit", order= 7)
        long netProfit,
//        @CsvColumn(value = "roundBetAm", order= 8)
//        long roundBetAmount,
        @CsvColumn(value = "roi%", order= 9)
        double roiPercentage,
        @CsvColumn(value = "win_rate%", order= 10)
        double winRatePercentage,
        @CsvColumn(value = "curDrawdown", order= 11)
        double currentDrawdown,
        @CsvColumn(value = "maxDrawdown", order= 12)
        double maxDrawdown,
        @CsvColumn(value = "PF", order= 13)
        double profitFactor,
//        @CsvColumn(value = "lastSpot", order= 14)
//        Spot lastSpot,
        @CsvColumn(value = "won", order= 15)
        long totalWon,
        @CsvColumn(value = "lost", order= 16)
        long totalLost,
        @CsvColumn(value = "wagered", order= 17)
        long totalWagered,
        @CsvColumn(value = "payout", order= 18)
        long totalPayout,
//        @CsvColumn(value = "bets", converter = BetListConverter.class, order= 20)
//        List<Bet> lastBets,
//        @CsvColumn(value = "status", converter = StopedConverter.class, order= 19)
//        boolean isStopped,
        @CsvIgnore
        List<SimulateResult> results
) {
    // Helper method to convert Simulation Result to Global Snapshot Entry
    public static GlobalSnapshot from(SimulateResult res, int repeat) {
        Snapshot s = res.result().snapshot();
        return GlobalSnapshot.builder()
                .strategyName(res.strategy())
                .config(res.config())
                .repeat(repeat)
                .roundNumber(s.roundNumber())
                .balance(s.balance())
                .startBalance(s.startBalance())
//                .lastProfit(s.lastProfit())
                .netProfit(s.netProfit())
//                .roundBetAmount(s.roundBetAmount())
                .roiPercentage(s.roiPercentage())
                .winRatePercentage(s.winRatePercentage())
                .currentDrawdown(s.currentDrawdown())
                .maxDrawdown(s.maxDrawdown())
                .profitFactor(s.profitFactor())
//                .lastSpot(s.lastSpot())
                .totalWon(s.totalWon())
                .totalLost(s.totalLost())
                .totalWagered(s.totalWagered())
                .totalPayout(s.totalPayout())
//                .lastBets(s.lastBets())
//                .isStopped(s.isStopped())
                .build();
    }

    public double getRoi() {
        return startBalance == 0 ? 0 : ((double) netProfit / startBalance) * 100;
    }
}