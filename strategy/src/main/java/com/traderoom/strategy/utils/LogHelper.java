package com.traderoom.strategy.utils;

import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;

import java.text.SimpleDateFormat;
import java.util.Date;

@Slf4j
@UtilityClass
public class LogHelper {

    public static void info(String message) {
        log.info(getFormattedLogMessage("INFO", message));
    }

    public static void debug(String message) {
        log.debug(getFormattedLogMessage("DEBUG", message));
    }

    public static void error(String message) {
        log.error(getFormattedLogMessage("ERROR", message));
    }

    private static String getFormattedLogMessage(String logLevel, String message) {
        return String.format("%s [%s] from %s - %s", getDateString(), logLevel, getCalledFrom(), message);
    }

    private static String getCalledFrom() {
        int useIndex = 4;
        StackTraceElement[] steArray = Thread.currentThread().getStackTrace();
        if (steArray.length <= useIndex) {
            return "NOT AVAILABLE";
        }
        StackTraceElement stackTraceElement = steArray[useIndex];
        return stackTraceElement.getClassName() + "#" + stackTraceElement.getMethodName();
    }

    private static String getDateString() {
        return new SimpleDateFormat("yyyy/MM/dd HH:mm:ss,SSS").format(new Date());
    }
}