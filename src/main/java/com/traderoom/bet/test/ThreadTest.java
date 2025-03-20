package com.traderoom.bet.test;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

public class ThreadTest {
    public static void main(String[] args) {

        AtomicInteger count = new AtomicInteger();
        ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
        scheduler.scheduleAtFixedRate(() -> System.out.println(count.incrementAndGet()), 1, 1, TimeUnit.SECONDS);
        scheduler.schedule(scheduler::shutdown, 15, TimeUnit.SECONDS);
    }
}
