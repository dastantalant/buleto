package com.traderoom.analyzer.example.model;


import com.traderoom.core.csv.CsvColumn;
import com.traderoom.core.csv.CsvFile;
import com.traderoom.core.csv.Separator;


import lombok.Builder;

@Builder
@CsvFile(separator = Separator.SEMICOLON)
public record AggregatedReport(
        @CsvColumn(value = "Strategy", order = 0)
        String strategyName,

        @CsvColumn(value = "Total Runs", order = 1)
        int totalRuns,

        @CsvColumn(value = "Wins", order = 2)
        int wins,

        @CsvColumn(value = "Losses", order = 3)
        int losses,

        @CsvColumn(value = "Win Rate %", order =4 )
        double winRate,

        @CsvColumn(value = "Total Net Profit", order =5 )
        long totalNetProfit,

        @CsvColumn(value = "Avg Profit", order =6)
        double averageProfit
) {
}