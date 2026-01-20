package com.traderoom.strategy.library;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.ByteBufAllocator;

import java.nio.ByteBuffer;

public class SeqRwPerfTest {

    static final int N = 4 << 10; // 4KB buffer
    static final int M = 500_000; // Количество итераций

    public static void main(String[] args) {
        System.out.println("Starting Warmup (ignoring results)...");
        // Прогреваем JVM, чтобы сработал JIT-компилятор
        for (int i = 0; i < 5; i++) {
            runAllTests(false);
        }
        System.out.println("Warmup done. Starting Measurements...");
        System.out.println("--------------------------------------------------");

        // Реальный замер
        runAllTests(true);
    }

    private static void runAllTests(boolean print) {
        testByteaRw(print);
        testNioHeapRw(print);
        testNioDirectRw(print); // Добавили Direct ByteBuffer
        testNettyRw(print);
        if(print) System.out.println("--------------------------------------------------");
    }

    public static void testNettyRw(boolean print) {
        // Используем Pooled буфер (стандарт для Netty)
        ByteBuf buf = ByteBufAllocator.DEFAULT.directBuffer(N);
        long start = System.nanoTime();
        long checkSum = 0;

        for (int i = 0; i < M; ++i) {
            buf.clear(); // Сброс индексов, без пересоздания (Zero Allocation)

            // Write
            for (int j = 0; j < N; ++j) {
                buf.writeByte((byte) j);
            }

            // Read
            for (int j = 0; j < N; ++j) {
                checkSum += buf.readByte();
            }
        }
        buf.release(); // Важно освободить Direct память

        long duration = System.nanoTime() - start;
        if (print) printResult("Netty Direct ByteBuf (Pooled)", duration, checkSum);
    }

    public static void testNioHeapRw(boolean print) {
        // Выделяем один раз (reusable), чтобы тестировать скорость доступа, а не GC
        ByteBuffer buf = ByteBuffer.allocate(N);
        long start = System.nanoTime();
        long checkSum = 0;

        for (int i = 0; i < M; ++i) {
            buf.clear();

            // Write
            for (int j = 0; j < N; ++j) {
                buf.put((byte) j);
            }

            buf.flip(); // Переключение на чтение

            // Read
            for (int j = 0; j < N; ++j) {
                checkSum += buf.get();
            }
        }

        long duration = System.nanoTime() - start;
        if (print) printResult("Java NIO ByteBuffer (Heap)", duration, checkSum);
    }

    public static void testNioDirectRw(boolean print) {
        // Direct буфер (вне кучи), аналог Netty по умолчанию
        ByteBuffer buf = ByteBuffer.allocateDirect(N);
        long start = System.nanoTime();
        long checkSum = 0;

        for (int i = 0; i < M; ++i) {
            buf.clear();
            for (int j = 0; j < N; ++j) {
                buf.put((byte) j);
            }
            buf.flip();
            for (int j = 0; j < N; ++j) {
                checkSum += buf.get();
            }
        }

        long duration = System.nanoTime() - start;
        if (print) printResult("Java NIO ByteBuffer (Direct)", duration, checkSum);
    }

    public static void testByteaRw(boolean print) {
        byte[] buf = new byte[N];
        long start = System.nanoTime();
        long checkSum = 0;

        for (int i = 0; i < M; ++i) {
            // Массивы не нужно "очищать", мы просто перезаписываем их по индексам

            // Write
            for (int j = 0; j < N; ++j) {
                buf[j] = (byte) j;
            }

            // Read
            for (int j = 0; j < N; ++j) {
                checkSum += buf[j];
            }
        }

        long duration = System.nanoTime() - start;
        if (print) printResult("Java primitive byte[]", duration, checkSum);
    }

    private static void printResult(String name, long nanos, long checkSum) {
        double ms = nanos / 1_000_000.0;
        System.out.printf("%-30s : %8.2f ms (Check: %d)%n", name, ms, checkSum);
    }
}