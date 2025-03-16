//package com.selenium.java.buleto.model;
//
//import java.math.BigDecimal;
//import java.util.concurrent.ConcurrentLinkedDeque;
//import java.util.concurrent.atomic.AtomicInteger;
//import org.springframework.stereotype.Component;
//
//@Component
//public class BulletWave {
//    private final static ConcurrentLinkedDeque<BigDecimal> wave = new ConcurrentLinkedDeque<>();
//    private final static AtomicInteger count = new AtomicInteger();
//
//    private static final int SIZE = 100;
//
//    public BigDecimal pollFirst() {
//        if (count.decrementAndGet() < 0) {
//            count.set(0);
//        }
//        return wave.pollFirst();
//    }
//
//    public int add(String bullet) {
//        return add(new BigDecimal(bullet));
//    }
//
//    public int add(BigDecimal bullet) {
//        if (bullet == null) {
//            return getFree();
//        }
//        synchronized (wave) {
//            BigDecimal last = wave.peekLast();
//            if (last != null && last.compareTo(bullet) == 0) {
//                return getFree();
//            }
//            wave.add(bullet);
//            count.incrementAndGet();
//            return getFree();
//        }
//    }
//
//    public int getFree() {
//        return SIZE - count.get();
//    }
//}
