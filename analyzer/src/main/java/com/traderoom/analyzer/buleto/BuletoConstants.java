package com.traderoom.analyzer.buleto;

import lombok.experimental.UtilityClass;

import java.nio.file.OpenOption;
import java.text.SimpleDateFormat;

import static java.nio.file.StandardOpenOption.CREATE;
import static java.nio.file.StandardOpenOption.TRUNCATE_EXISTING;
import static java.nio.file.StandardOpenOption.WRITE;

public class BuletoConstants {

    public static final SimpleDateFormat FORMAT = new SimpleDateFormat("dd.MM.yyyy_HH.mm.ss.SSS");

    public static final String VICTORY = "C:\\Users\\dastan\\Desktop\\victory.csv";

    public static final String DIRECTORY = "C:\\Users\\dastan\\Desktop\\result";

    public static final OpenOption[] OPTIONS = new OpenOption[]{CREATE, TRUNCATE_EXISTING, WRITE};
}
