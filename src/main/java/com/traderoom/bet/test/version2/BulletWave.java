package com.traderoom.bet.test.version2;

import java.math.BigDecimal;
import java.util.concurrent.ConcurrentLinkedDeque;
import java.util.concurrent.atomic.AtomicInteger;

public class BulletWave {
    private final ConcurrentLinkedDeque<BigDecimal> wave = new ConcurrentLinkedDeque<>();
    private final AtomicInteger count = new AtomicInteger();
    private static final int SIZE = 10;

    public int add(BigDecimal bullet) {
        if (bullet == null) {
            return getFree();
        }
        synchronized (this) {
            BigDecimal last = wave.peekLast();
            if (last != null && last.compareTo(bullet) == 0) {
                return getFree();
            }
            wave.add(bullet);
            count.incrementAndGet();
            return getFree();
        }
    }

    public int getFree() {
        return SIZE - count.get();
    }

    public BigDecimal pollFirst() {
        synchronized (this) {
            BigDecimal bullet = wave.pollFirst();
            if (bullet != null) {
                count.decrementAndGet();
            }
            return bullet;
        }
    }
}