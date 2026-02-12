package com.traderoom.analyzer.test;

import com.traderoom.analyzer.BuletoConstants;
import com.traderoom.core.util.CsvDataLoader;

import java.util.Comparator;
import java.util.Deque;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.stream.Collectors;

public class VictoryCounterTest {
    public static void main(String[] args) {
        Deque<Integer> deque = CsvDataLoader.load(BuletoConstants.VICTORY);
        var map = new HashMap<String, Integer>(deque.size());
        var result =new LinkedList<String>();

        var iterator = deque.iterator();
        Integer item1 = iterator.next();
        Integer item2;
        while (iterator.hasNext()) {
            item2 = iterator.next();
            item2 = item2 == -1 ? 0 : item2;
            String key = item1 + "_" + item2;
//            Integer count = map.getOrDefault(key, 0);
//            map.put(key, count + 1);
            item1 = item2;
            result.add(key);
        }
//        var collect = map.entrySet()
//                .stream()
//                .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
//                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (oldV, newV) -> oldV, LinkedHashMap::new));
//        collect.forEach((key, value) -> System.out.printf("%6s: %d\n", key, value));
        result.forEach(System.out::println);
    }
    public static void analyzeFour() {
        Deque<Integer> deque = CsvDataLoader.load(BuletoConstants.VICTORY);
        var map = new HashMap<String, Integer>(deque.size());

        var iterator = deque.iterator();
        Integer item1 = iterator.next();
        Integer item2 = iterator.next();
        Integer item3  = iterator.next();
        Integer item4;
        while (iterator.hasNext()) {
            item4 = iterator.next();
            item2 = item2 == -1 ? 0 : item2;
            item3 = item3 == -1 ? 0 : item3;
            item4 = item4 == -1 ? 0 : item4;
            String key = item1 + "_" + item2+"_"+item3+"_"+item4;
            Integer count = map.getOrDefault(key, 0);
            map.put(key, count + 1);
            item1 = item2;
            item2  = item3;
            item3  = item4;
        }
        var collect = map.entrySet()
                .stream()
                .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (oldV, newV) -> oldV, LinkedHashMap::new));
        collect.forEach((key, value) -> System.out.printf("%6s: %d\n", key, value));
    }

    public static void analyzeTriple() {
        Deque<Integer> deque = CsvDataLoader.load(BuletoConstants.VICTORY);
        var map = new HashMap<String, Integer>(deque.size());

        var iterator = deque.iterator();
        Integer item1 = iterator.next();
        Integer item2 = iterator.next();
        Integer item3 ;
        while (iterator.hasNext()) {
            item3 = iterator.next();
            item2 = item2 == -1 ? 0 : item2;
            item3 = item3 == -1 ? 0 : item3;
            String key = item1 + "_" + item2+"_"+item3;
            Integer count = map.getOrDefault(key, 0);
            map.put(key, count + 1);
            item1 = item2;
            item2  = item3;
        }
        var collect = map.entrySet()
                .stream()
                .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (oldV, newV) -> oldV, LinkedHashMap::new));
        collect.forEach((key, value) -> System.out.printf("%6s: %d\n", key, value));
    }

    public static void analyzeDouble() {
        Deque<Integer> deque = CsvDataLoader.load(BuletoConstants.VICTORY);
        var map = new HashMap<String, Integer>(deque.size());

        var iterator = deque.iterator();
        Integer item1 = iterator.next();
        Integer item2;
        while (iterator.hasNext()) {
            item2 = iterator.next();
            item2 = item2 == -1 ? 0 : item2;
            String key = item1 + "_" + item2;
            Integer count = map.getOrDefault(key, 0);
            map.put(key, count + 1);
            item1 = item2;
        }
        var collect = map.entrySet()
                .stream()
                .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (oldV, newV) -> oldV, LinkedHashMap::new));
        collect.forEach((key, value) -> System.out.printf("%6s: %d\n", key, value));
    }


    static void statMain() {
//        D20260123.deque();
//        D20260124.deque();
//        D20260125.deque();
//        D20260126.deque();
//        D20260127.deque();
//        D20260128.deque();
//        D20260129.deque();
//        var deque = new LinkedList<Integer>();
//        deque.addAll(D20260123.deque());
//        deque.addAll(D20260124.deque());
//        deque.addAll(D20260125.deque());
//        deque.addAll(D20260126.deque());
//        deque.addAll(D20260127.deque());
//        deque.addAll(D20260128.deque());
//        deque.addAll(D20260129.deque());
//        stat(CsvDataLoader.load(BuletoConstants.VICTORY));
    }

    static void stat(Deque<Integer> deque) {
        var map = new HashMap<Integer, Integer>();
        for (Integer item : deque) {
            map.put(item, map.getOrDefault(item, 0) + 1);
        }
        map.put(0, map.get(-1) + map.get(0));
        map.remove(-1);
        LinkedHashMap<Integer, Integer> collect = map.entrySet()
                .stream()
                .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (oldV, newV) -> oldV, LinkedHashMap::new));
        collect.forEach((key, value) -> System.out.printf("%2d: %2d\n", key, value));
    }
}
