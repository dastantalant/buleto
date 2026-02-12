package com.traderoom.analyzer;

import com.traderoom.core.util.CsvDataLoader;

import java.nio.file.OpenOption;
import java.text.SimpleDateFormat;
import java.util.Deque;
import java.util.LinkedList;

import static java.nio.file.StandardOpenOption.CREATE;
import static java.nio.file.StandardOpenOption.TRUNCATE_EXISTING;
import static java.nio.file.StandardOpenOption.WRITE;

public class BuletoConstants {

    public static final SimpleDateFormat FORMAT = new SimpleDateFormat("dd.MM.yyyy_HH.mm.ss.SSS");

    public static final String VICTORY = "C:\\Users\\dastan\\Desktop\\victory.csv";

    public static final String DIRECTORY = "C:\\Users\\dastan\\Desktop\\result";

    public static final OpenOption[] OPTIONS = new OpenOption[]{CREATE, TRUNCATE_EXISTING, WRITE};

    public static final Deque<Integer> DEQUE;

    static {
        Deque<Integer> deque = CsvDataLoader.load(BuletoConstants.VICTORY);
//        Deque<Integer> deque = new LinkedList<>();
        D20260123.deque(deque);
        D20260124.deque(deque);
        D20260125.deque(deque);
        D20260126.deque(deque);
        D20260127.deque(deque);
        D20260128.deque(deque);
        D20260129.deque(deque);
        D20260130.deque(deque);
        D20260201.deque(deque);
        DEQUE = deque;
    }
}
