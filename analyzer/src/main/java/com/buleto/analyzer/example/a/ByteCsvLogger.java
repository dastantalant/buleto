//package com.traderoom.strategy.simulation.buleto;
//
//import com.trading.roulette.api.model.Bet;
//import com.trading.roulette.api.model.Snapshot;
//import com.trading.roulette.api.Subscriber;
//
//import java.io.IOException;
//import java.io.OutputStream;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.StandardOpenOption;
//
//@Deprecated
//public class ByteCsvLogger implements Subscriber, AutoCloseable {
//
//    private static final byte SEP = (byte) ';';
//    private static final byte NEW_LINE = (byte) '\n';
//    private static final byte MINUS = (byte) '-';
//    private static final byte DOT = (byte) '.';
//    private static final byte ZERO = (byte) '0';
//    private static final byte COLON = (byte) ':';
//
//    private static final int BUFFER_SIZE = 16 * 1024;
//
//    private final OutputStream outputStream;
//    private final byte[] buffer;
//    private int pos = 0;
//
//    private static final long[] LONG_SIZE_TABLE = {
//            9, 99, 999, 9999, 99999, 999999, 9999999,
//            99999999, 999999999, 9999999999L, 99999999999L,
//            999999999999L, 9999999999999L, 99999999999999L,
//            999999999999999L, 9999999999999999L, 99999999999999999L,
//            999999999999999999L, Long.MAX_VALUE
//    };
//
//    private static final int[] INT_SIZE_TABLE = {
//            9, 99, 999, 9999, 99999, 999999, 9999999,
//            99999999, 999999999, Integer.MAX_VALUE
//    };
//
//    public ByteCsvLogger(String filePath) throws IOException {
//        // Используем BufferedOutputStream не обязательно, так как у нас свой буфер,
//        // но прямой OutputStream из Files наиболее "честный".
//        this.outputStream = Files.newOutputStream(Path.of(filePath),
//                StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
//        this.buffer = new byte[BUFFER_SIZE];
//
//        writeAscii("Round;Spot;Balance;RoundPnL;TotalNetProfit;RoundBetAmt;ROI%;Drawdown%;WinRate%;TotalWagered;Status;Bets");
//        buffer[pos++] = NEW_LINE;
//        flushBuffer();
//    }
//
//    @Override
//    public void onRound(Snapshot snapshot) {
//        try {
//            // Проверка: если места мало, сбрасываем. 512 байт с запасом хватит на строку.
//            if (pos > BUFFER_SIZE - 512) {
//                flushBuffer();
//            }
//
//            putLong(snapshot.roundNumber());
//            buffer[pos++] = SEP;
//
//            if (snapshot.lastSpot() != null) {
//                putInt(snapshot.lastSpot().getNumber()); // Пишем int напрямую
//            } else {
//                buffer[pos++] = MINUS;
//            }
//            buffer[pos++] = SEP;
//
//            putLong(snapshot.realBalance());
//            buffer[pos++] = SEP;
//
//            putLong(snapshot.lastProfit());
//            buffer[pos++] = SEP;
//
//            putLong(snapshot.netProfit());
//            buffer[pos++] = SEP;
//
//            putLong(snapshot.roundBetAmount());
//            buffer[pos++] = SEP;
//
//            putDouble(snapshot.roiPercentage(), 2);
//            buffer[pos++] = SEP;
//
//            putDouble(snapshot.currentDrawdown(), 2);
//            buffer[pos++] = SEP;
//
//            putDouble(snapshot.winRatePercentage(), 2);
//            buffer[pos++] = SEP;
//
//            putLong(snapshot.totalWagered());
//            buffer[pos++] = SEP;
//
//            writeAscii(snapshot.isLive() ? "STOP" : "LIVE");
//            buffer[pos++] = SEP;
//
//            for (Bet bet : snapshot.lastBets()) {
//                writeAscii(bet.type().name());
//                buffer[pos++] = COLON;
//                putLong(bet.value());
//                buffer[pos++] = SEP;
//            }
//
//            buffer[pos++] = NEW_LINE;
//
//        } catch (IOException e) {
//            throw new RuntimeException("Write error", e);
//        }
//    }
//
//    // --- Low Level Writing Methods ---
//
//    /**
//     * Пишет строку как ASCII байты. Zero-allocation (не создает byte[]).
//     */
//    private void writeAscii(String s) throws IOException {
//        int len = s.length();
//        if (pos + len >= BUFFER_SIZE) flushBuffer();
//
//        for (int i = 0; i < len; i++) {
//            // Приводим char к byte. Для латиницы и цифр это корректно.
//            buffer[pos++] = (byte) s.charAt(i);
//        }
//    }
//
//    private void putInt(int i) throws IOException {
//        if (i == Integer.MIN_VALUE) {
//            writeAscii("-2147483648");
//            return;
//        }
//
//        if (i < 0) {
//            buffer[pos++] = MINUS;
//            i = -i;
//        }
//
//        int size = stringSizeInt(i);
//        int charPos = pos + size;
//        pos = charPos; // Сдвигаем курсор сразу вперед
//
//        // Заполнение с конца
//        while (i >= 65536) {
//            int q = i / 100;
//            // r = i - (q * 100)
//            int r = i - ((q << 6) + (q << 5) + (q << 2));
//            i = q;
//            buffer[--charPos] = DigitOnes[r];
//            buffer[--charPos] = DigitTens[r];
//        }
//
//        // Обычный цикл для малых чисел
//        while (true) {
//            int q = (i * 52429) >>> 19; // Аппроксимация деления на 10: (i * 52429) / 2^19
//            int r = i - ((q << 3) + (q << 1)); // r = i - (q * 10)
//            buffer[--charPos] = (byte)(r + ZERO);
//            i = q;
//            if (i == 0) break;
//        }
//    }
//
//    private void putLong(long i) throws IOException {
//        if (i == Long.MIN_VALUE) {
//            writeAscii("-9223372036854775808");
//            return;
//        }
//
//        if (i < 0) {
//            buffer[pos++] = MINUS;
//            i = -i;
//        }
//
//        int size = stringSizeLong(i);
//        int charPos = pos + size;
//        pos = charPos;
//
//        // Заполнение с конца
//        while (i > Integer.MAX_VALUE) {
//            long q = i / 10;
//            int r = (int)(i - ((q << 3) + (q << 1)));
//            buffer[--charPos] = (byte)(r + ZERO);
//            i = q;
//        }
//
//        // Когда число стало int, переходим на int-алгоритм (он быстрее на 32-битных операциях)
//        int i2 = (int)i;
//        while (true) {
//            int q = (i2 * 52429) >>> 19;
//            int r = i2 - ((q << 3) + (q << 1));
//            buffer[--charPos] = (byte)(r + ZERO);
//            i2 = q;
//            if (i2 == 0) break;
//        }
//    }
//
//    private void putDouble(double val, int precision) throws IOException {
//        if (Double.isNaN(val)) { writeAscii("NaN"); return; }
//        // Обработка отрицательных
//        if (val < 0) {
//            buffer[pos++] = MINUS;
//            val = -val;
//        }
//
//        long factor = 1;
//        for(int i=0; i<precision; i++) factor *= 10;
//
//        long whole = (long) val;
//        long frac = Math.round((val - whole) * factor);
//
//        if (frac >= factor) { whole++; frac = 0; }
//
//        putLong(whole);
//        buffer[pos++] = DOT;
//
//        // Дописываем нули для дробной части
//        // Самый быстрый способ без строк:
//        // Если frac = 5, precision = 2 -> нужно "05"
//        // Добавляем factor к frac (100 + 5 = 105), пишем, игнорируем первую цифру '1'
//        long tempFrac = factor + frac;
//        int size = precision; // Длина дробной части всегда равна точности
//        int charPos = pos + size;
//        pos = charPos;
//
//        for (int k = 0; k < size; k++) {
//            long q = tempFrac / 10;
//            int r = (int)(tempFrac - ((q << 3) + (q << 1)));
//            buffer[--charPos] = (byte)(r + ZERO);
//            tempFrac = q;
//        }
//    }
//
//    // Вспомогательные методы для расчета длины
//    private int stringSizeInt(int x) {
//        for (int i = 0; ; i++) if (x <= INT_SIZE_TABLE[i]) return i + 1;
//    }
//
//    private int stringSizeLong(long x) {
//        for (int i = 0; ; i++) if (x <= LONG_SIZE_TABLE[i]) return i + 1;
//    }
//
//    private void flushBuffer() throws IOException {
//        if (pos > 0) {
//            outputStream.write(buffer, 0, pos);
//            pos = 0;
//        }
//    }
//
//    @Override
//    public void onGameEnd(Snapshot finalSnapshot) {
//        try { close(); } catch (IOException e) { e.printStackTrace(); }
//    }
//
//    @Override
//    public void close() throws IOException {
//        flushBuffer();
//        outputStream.flush();
//        outputStream.close();
//    }
//
//    // Таблицы для очень быстрого преобразования двух цифр сразу (опционально, но полезно)
//    private final static byte[] DigitTens = {
//            '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
//            '1', '1', '1', '1', '1', '1', '1', '1', '1', '1',
//            '2', '2', '2', '2', '2', '2', '2', '2', '2', '2',
//            '3', '3', '3', '3', '3', '3', '3', '3', '3', '3',
//            '4', '4', '4', '4', '4', '4', '4', '4', '4', '4',
//            '5', '5', '5', '5', '5', '5', '5', '5', '5', '5',
//            '6', '6', '6', '6', '6', '6', '6', '6', '6', '6',
//            '7', '7', '7', '7', '7', '7', '7', '7', '7', '7',
//            '8', '8', '8', '8', '8', '8', '8', '8', '8', '8',
//            '9', '9', '9', '9', '9', '9', '9', '9', '9', '9',
//    };
//
//    private final static byte[] DigitOnes = {
//            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//    };
//}