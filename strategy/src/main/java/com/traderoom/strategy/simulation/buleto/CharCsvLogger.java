package com.traderoom.strategy.simulation.buleto;

import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Snapshot;
import com.traderoom.strategy.monitoring.Subscriber;

import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

@Deprecated
public class CharCsvLogger implements Subscriber, AutoCloseable {

    // import  jdk.jfr.internal.Bits;
    private static final char SEP = ';';
    private static final char NEW_LINE = '\n';
    private static final int BUFFER_SIZE = 8192;

    private final BufferedWriter writer;
    private final char[] buffer;
    private int pos = 0;

    public CharCsvLogger(String filePath) throws IOException {
        writer = Files.newBufferedWriter(Path.of(filePath), StandardCharsets.UTF_8,
                StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
        buffer = new char[BUFFER_SIZE];
        writeRaw("Round;Spot;Balance;RoundPnL;TotalNetProfit;RoundBetAmt;ROI%;Drawdown%;WinRate%;TotalWagered;Status;Bets");
        flushBufferToFile();
    }

    @Override
    public void onRound(Snapshot snapshot) {
        try {
            if (pos > BUFFER_SIZE - 512) {
                flushBufferToFile();
            }

            putLong(snapshot.roundNumber());
            putChar(SEP);

            if (snapshot.lastSpot() != null) {
                putInt(snapshot.lastSpot().getNumber());
            } else {
                putChar('-');
            }
            putChar(SEP);

            putLong(snapshot.balance());
            putChar(SEP);

            putLong(snapshot.lastProfit());
            putChar(SEP);

            putLong(snapshot.netProfit());
            putChar(SEP);

            putLong(snapshot.roundBetAmount());
            putChar(SEP);

            putDouble(snapshot.roiPercentage(), 2);
            putChar(SEP);

            putDouble(snapshot.currentDrawdown(), 2);
            putChar(SEP);

            putDouble(snapshot.winRatePercentage(), 2);
            putChar(SEP);

            putLong(snapshot.totalWagered());
            putChar(SEP);

            writeRaw(snapshot.isStopped() ? "STOP" : "LIVE");
            putChar(SEP);

            for (Bet bet : snapshot.lastBets()) {
                writeRaw(bet.type().name());
                putChar(':');
                putLong(bet.value());
                putChar(SEP);
            }

            putChar(NEW_LINE);

        } catch (IOException e) {
            throw new RuntimeException("Error writing CSV", e);
        }
    }

    private void putChar(char c) {
        buffer[pos++] = c;
    }

    private void writeRaw(String s) {
        int len = s.length();
        if (pos + len >= BUFFER_SIZE) {
            try {
                flushBufferToFile();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        s.getChars(0, len, buffer, pos);
        pos += len;
    }

    private void putLong(long i) {
        if (i == Long.MIN_VALUE) {
            writeRaw("-9223372036854775808");
            return;
        }

        int size = (i < 0) ? stringSize(-i) + 1 : stringSize(i);

        if (pos + size >= BUFFER_SIZE) {
            try {
                flushBufferToFile();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        int charPos = pos + size;
        long q = (i < 0) ? -i : i;

        while (q >= 100) {
            long q2 = q / 10;
            int r = (int) (q - (q2 * 10));
            buffer[--charPos] = (char) ('0' + r);
            q = q2;
        }

        while (q > 0) {
            long q2 = q / 10;
            int r = (int) (q - (q2 * 10));
            buffer[--charPos] = (char) ('0' + r);
            q = q2;
        }

        if (i == 0) {
            buffer[--charPos] = '0';
        } else if (i < 0) {
            buffer[--charPos] = '-';
        }

        pos += size;
    }

    private int stringSize(long x) {
        long p = 10;
        for (int i = 1; i < 19; i++) {
            if (x < p) return i;
            p = 10 * p;
        }
        return 19;
    }

    private void putDouble(double val, int precision) {
        if (Double.isNaN(val)) {
            writeRaw("NaN");
            return;
        }
        if (Double.isInfinite(val)) {
            writeRaw(val > 0 ? "Infinity" : "-Infinity");
            return;
        }

        if (val < 0) {
            putChar('-');
            val = -val;
        }

        long factor = 1;
        for (int i = 0; i < precision; i++) factor *= 10;

        long wholePart = (long) val;
        long fractionalPart = Math.round((val - wholePart) * factor);

        if (fractionalPart >= factor) {
            wholePart++;
            fractionalPart = 0;
        }

        putLong(wholePart);
        putChar('.');

        String fracStr = Long.toString(fractionalPart);
        int padding = precision - fracStr.length();
        for (int i = 0; i < padding; i++) putChar('0');
        putLong(fractionalPart);
    }

    private static final int[] INT_SIZE_TABLE = {9, 99, 999, 9999, 99999, 999999, 9999999, 99999999, 999999999, Integer.MAX_VALUE};

    private void putInt(int i) {
        if (i == Integer.MIN_VALUE) {
            writeRaw("-2147483648");
            return;
        }

        int size = (i < 0) ? stringSizeInt(-i) + 1 : stringSizeInt(i);

        if (pos + size >= BUFFER_SIZE) {
            try {
                flushBufferToFile();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        int charPos = pos + size;
        int q = (i < 0) ? -i : i;

        while (q >= 65536) {
            int q2 = q / 10;
            int r = q - (q2 * 10);
            buffer[--charPos] = (char) ('0' + r);
            q = q2;
        }

        while (q > 0) {
            int q2 = q / 10;
            int r = q - (q2 * 10);
            buffer[--charPos] = (char) ('0' + r);
            q = q2;
        }

        if (i == 0) {
            buffer[--charPos] = '0';
        } else if (i < 0) {
            buffer[--charPos] = '-';
        }

        pos += size;
    }

    private int stringSizeInt(int x) {
        for (int i = 0; ; i++) {
            if (x <= INT_SIZE_TABLE[i]) return i + 1;
        }
    }

    private void flushBufferToFile() throws IOException {
        if (pos == 0) return;
        writer.write(buffer, 0, pos);
        pos = 0;
    }

    @Override
    public void onGameEnd(Snapshot finalSnapshot) {
        try {
            close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void close() throws IOException {
        flushBufferToFile();
        writer.flush();
        writer.close();
    }
}