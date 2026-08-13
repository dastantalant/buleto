package com.buleto.core.util;

import com.buleto.core.model.Round;

import static com.toolbox.core.util.CharSequenceUtil.findStringBounds;
import static com.toolbox.core.util.CharSequenceUtil.indexOf;
import static com.toolbox.core.util.CharSequenceUtil.parseFixedPointInt;
import static com.toolbox.core.util.CharSequenceUtil.parseSimpleLong;
import static com.toolbox.core.util.DateTimeUtil.parseIso8601;

public final class RoundJsonParser {
    private RoundJsonParser() {
    }

    private static final String KEY_ID = "\"id\":";
    private static final String KEY_RR = "\"rr\":"; // victory
    private static final String KEY_SD = "\"sd\":";
    private static final String KEY_C = "\"c\":";
    private static final String KEY_DT = "\"dt\":";
    private static final String KEY_V = "\"v\":";

    private static final String KEY_BV = "\"bv\":";
    private static final String KEY_TV = "\"tv\":";
    private static final String KEY_SV = "\"sv\":";

    private static final String KEY_BTD = "\"btd\":";
    private static final String KEY_BCD = "\"bcd\":";
    private static final String KEY_ED = "\"ed\":";

    public static Round parseVictory(CharSequence json) {
        if (indexOf(json, "round", 0) == -1) return null;
        int index = indexOf(json, KEY_RR, 0);
        if (index == -1) return null;
        var builder = Round.builder();
        buildVictory(json, builder, index);
        buildValue(json, builder);
        buildDate(json, builder);
        return builder.build();
    }

    private static Round.RoundBuilder buildValue(CharSequence json, Round.RoundBuilder builder) {
        int index = indexOf(json, KEY_ID, 0);
        if (index != -1) builder.roundId(parseSimpleLong(json, index + KEY_ID.length()));

        index = indexOf(json, KEY_BV, 0);
        if (index != -1) builder.beginValue(parseFixedPointInt(json, index + KEY_BV.length()));

        index = indexOf(json, KEY_TV, 0);
        if (index != -1) {
            builder.targetValue(parseFixedPointInt(json, index + KEY_TV.length()));
        }
        index = indexOf(json, KEY_SV, 0);
        if (index != -1) builder.startValue(parseFixedPointInt(json, index + KEY_SV.length()));
        return builder;
    }

    private static Round.RoundBuilder buildVictory(CharSequence json, Round.RoundBuilder builder, int rrIdx) {
        int index = indexOf(json, KEY_C, rrIdx);
        if (index != -1) builder.cell((int) parseSimpleLong(json, index + KEY_C.length()));
        index = indexOf(json, KEY_DT, rrIdx);
        if (index != -1) {
            long range = findStringBounds(json, index + KEY_DT.length());
            if (range != -1) builder.victoryTime(parseIso8601(json, (int) (range >> 32), (int) range));
        }
        index = indexOf(json, KEY_V, rrIdx);
        if (index != -1) builder.factor(parseFixedPointInt(json, index + KEY_V.length()));
        return builder;
    }

    private static Round.RoundBuilder buildDate(CharSequence json, Round.RoundBuilder builder) {
        int index = indexOf(json, KEY_SD, 0);
        if (index != -1) {
            long range = findStringBounds(json, index + KEY_SD.length());
            if (range != -1) builder.startTime(parseIso8601(json, (int) (range >> 32), (int) range));
        }
        index = indexOf(json, KEY_BTD, 0);
        if (index != -1) {
            long range = findStringBounds(json, index + KEY_BTD.length());
            if (range != -1) builder.targetTime(parseIso8601(json, (int) (range >> 32), (int) range));
        }
        index = indexOf(json, KEY_BCD, 0);
        if (index != -1) {
            long range = findStringBounds(json, index + KEY_BCD.length());
            if (range != -1) builder.closedTime(parseIso8601(json, (int) (range >> 32), (int) range));
        }
        index = indexOf(json, KEY_ED, 0);
        if (index != -1) {
            long range = findStringBounds(json, index + KEY_ED.length());
            if (range != -1) builder.endTime(parseIso8601(json, (int) (range >> 32), (int) range));
        }
        return builder;
    }

    public static long extractRoundId(CharSequence json) {
        int index = indexOf(json, KEY_ID, 0);
        if (index == -1) return -1;
        return parseSimpleLong(json, index + KEY_ID.length());
    }

    public static boolean hasVictory(CharSequence json) {
        return indexOf(json, KEY_RR, 0) != -1;
    }
}