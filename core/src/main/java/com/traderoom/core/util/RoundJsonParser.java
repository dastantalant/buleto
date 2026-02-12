package com.traderoom.core.util;

import com.traderoom.core.websocket.Round;

import static com.traderoom.core.util.CharSequenceUtil.findStringBounds;
import static com.traderoom.core.util.CharSequenceUtil.indexOf;
import static com.traderoom.core.util.CharSequenceUtil.parseFixedPointInt;
import static com.traderoom.core.util.CharSequenceUtil.parseSimpleLong;
import static com.traderoom.core.util.DateTimeUtil.parseIso8601;

public final class RoundJsonParser {
    private RoundJsonParser() {
    }

    private static final String KEY_ID = "\"id\":";
    private static final String KEY_RR = "\"rr\":"; // victory
    private static final String KEY_SD = "\"sd\":";
    private static final String KEY_C = "\"c\":";
    private static final String KEY_DT = "\"dt\":";
    private static final String KEY_V = "\"v\":";

    public static Round parseVictory(CharSequence json) {
        if (indexOf(json, "round", 0) == -1) {
            return null;
        }

        int rrIdx = indexOf(json, KEY_RR, 0);
        if (rrIdx == -1) {
            return null;
        }

        var builder = Round.builder();

        int idIdx = indexOf(json, KEY_ID, 0);
        if (idIdx != -1) {
            builder.roundId(parseSimpleLong(json, idIdx + KEY_ID.length()));
        }

        int sdIdx = indexOf(json, KEY_SD, 0);
        if (sdIdx != -1) {
            long range = findStringBounds(json, sdIdx + KEY_SD.length());
            if (range != -1) {
                builder.startTime(parseIso8601(json, (int) (range >> 32), (int) range));
            }
        }

        int cIdx = indexOf(json, KEY_C, rrIdx);
        if (cIdx != -1) {
            builder.cell((int) parseSimpleLong(json, cIdx + KEY_C.length()));
        }

        int dtIdx = indexOf(json, KEY_DT, rrIdx);
        if (dtIdx != -1) {
            long range = findStringBounds(json, dtIdx + KEY_DT.length());
            if (range != -1) {
                builder.victoryTime(parseIso8601(json, (int) (range >> 32), (int) range));
            }
        }

        int vIdx = indexOf(json, KEY_V, rrIdx);
        if (vIdx != -1) {
            builder.factor(parseFixedPointInt(json, vIdx + KEY_V.length()));
        }

        return builder.build();
    }

    public static long extractRoundId(CharSequence json) {
        int idIdx = indexOf(json, KEY_ID, 0);
        if (idIdx == -1) return -1;
        return parseSimpleLong(json, idIdx + KEY_ID.length());
    }

    public static boolean hasVictory(CharSequence json) {
        return indexOf(json, KEY_RR, 0) != -1;
    }
}