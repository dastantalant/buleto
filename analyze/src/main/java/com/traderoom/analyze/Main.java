package com.traderoom.analyze;

import java.util.NavigableMap;
import java.util.Set;

public class Main {
    public static void main(String[] args)  {
        Repository repository = new Repository();
        NavigableMap<Long, Round> rounds = repository.getRound();
//        Analyzer.countMax(rounds, 35, 100, 20);
        Analyzer.run2(rounds, Set.of(4));
    }

}
