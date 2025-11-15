package com.traderoom.analyze;

import java.io.FileWriter;
import java.io.IOException;
import java.util.Iterator;
import java.util.NavigableMap;
import java.util.Set;

public class Analyzer {
    private static final String S1 = "%2d,,";
    private static final String S2 = ",%5d,";
    private static final String S3 = ",,%8d";

    public static void run(NavigableMap<Long, Round> rounds, Set<Integer> noneBet) {
        Iterator<Long> iterator = rounds.navigableKeySet().iterator();
        int balance = 10000;
        int start = 1;
        int bet = start;
        int allVictory = 0;
        int lostCount = 2;
        int i = 0;
        int everyVictory = bet * 36 + bet * (noneBet.size() - 37);
        boolean last = false;
        StringBuilder sb = new StringBuilder();
        sb.append("number,round,cell,balance,victory,bet,allBet,allVictory,win").append("\n");
        while (iterator.hasNext()) {
            Long key = iterator.next();
            Round round = rounds.get(key);
            int cell = round.getCell();
            int victory = calculateWin(noneBet, bet, cell);
            allVictory = allVictory + everyVictory;
            int allBet = calculateAllBet(noneBet, bet);
            balance = balance + victory;
            if (last) {
                lostCount++;
            } else {
                lostCount = 2;
            }
            last = victory < 0;
            bet = calculateBet(noneBet, victory, start, everyVictory * lostCount);
            sb.append(++i).append(',');
            sb.append(round.getId()).append(',');
            sb.append(round.getCell()).append(',');
            sb.append(balance).append(',');
            sb.append(victory).append(',');
            sb.append(bet).append(',');
            sb.append(allBet).append(',');
            sb.append(allVictory).append(',');
            if (victory < 0)
                sb.append(false);
            sb.append("\n");
        }
        try (FileWriter fw = new FileWriter("bet.csv")) {
            fw.write(sb.toString());
            fw.flush();
        } catch (IOException ignore) {
        }
    }

    public static void run2(NavigableMap<Long, Round> rounds, Set<Integer> noneBet) {
        Iterator<Long> iterator = rounds.navigableKeySet().iterator();
        Balance balance = new Balance(1_000_000);
        Strategy strategy = new Strategy(
                1,
                (start, bet) -> ++bet,
                (start, bet) -> start
        );
        Game game = new Game(noneBet, strategy, balance);
        StringBuilder sb = new StringBuilder();
        sb.append("№,balance,victory,bet,win\n");
        int i = 0;
        while (iterator.hasNext()) {
            int cell = rounds.get(iterator.next()).getCell();
            sb.append(++i).append(',');
            sb.append(balance.getBalance()).append(',');
            sb.append(game.victory(cell)).append(',');
            sb.append(strategy.getBet()).append(',');
            if (!game.isWin())
                sb.append(false);
            sb.append(',');
            sb.append('\n');
        }
        try (FileWriter fw = new FileWriter("bet.csv")) {
            fw.write(sb.toString());
            fw.flush();
        } catch (IOException ignore) {
        }
    }

    private static int calculateWin(Set<Integer> noneBet, int bet, int victory) {
        return noneBet.contains(victory) ? bet * (noneBet.size() - 37) : bet * 36 + bet * (noneBet.size() - 37);
    }

    private static int calculateBet(Set<Integer> noneBet, int victory, int start, int add) {
        return victory > 0 ? start :
                (int) (Math.ceil((Math.abs((double) victory) + add))) / (36 - (37 - noneBet.size()));
    }

    private static int calculateAllBet(Set<Integer> noneBet, int bet) {
        return -(37 - noneBet.size()) * bet;
    }

    public static void countMax(NavigableMap<Long, Round> rounds, int count, int max, int next) {
        Iterator<Long> iterator = rounds.navigableKeySet().iterator();
        CountMax countMax = new CountMax(count, max);
        int i = 0;
        StringBuilder sb = new StringBuilder();
        while (iterator.hasNext()) {
            Long key = iterator.next();
            Round round = rounds.get(key);
            if (countMax.isFinal()) {
                sb.append(round.getCell()).append(' ');
                if (++i == next) {
                    break;
                }
            } else {
                countMax.victory(round.getCell());
            }
        }
        System.out.println(countMax.getState());
        System.out.println(sb);
    }

    public static void exportCSV(NavigableMap<Long, Round> rounds) {
        Iterator<Long> iterator = rounds.navigableKeySet().iterator();
        StringBuilder sb = new StringBuilder();
        sb.append('0');
        for (int i = 1; i < 38; sb.append(',').append(i++)) {
        }
        sb.append('\n');
        while (iterator.hasNext()) {
            Long key = iterator.next();
            Round round = rounds.get(key);
            int cell = round.getCell();
            for (int i = 0; i < 38; i++, sb.append(',')) {
                if (i == cell) sb.append(cell);
            }
            sb.append('\n');
        }
        try (FileWriter fileWriter = new FileWriter("static.csv")) {
            fileWriter.write(sb.toString());
            fileWriter.flush();
        } catch (IOException ignore) {
        }
    }

    public static void exportCSVTreeSection(NavigableMap<Long, Round> rounds) {
        Iterator<Long> iterator = rounds.navigableKeySet().iterator();
        StringBuilder sb = new StringBuilder();
        sb.append("0-12,13-24,25-37").append('\n');
        while (iterator.hasNext()) {
            Long key = iterator.next();
            Round round = rounds.get(key);
            int cell = round.getCell();
            String result;
            if (cell < 13) result = String.format(S1, cell);
            else if (cell < 25) result = String.format(S2, cell);
            else result = String.format(S3, cell);
            sb.append(result).append('\n');
        }
        try (FileWriter fileWriter = new FileWriter("staticTree.csv")) {
            fileWriter.write(sb.toString());
            fileWriter.flush();
        } catch (IOException ignore) {
        }
    }
}
