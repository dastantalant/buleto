package com.traderoom.common.websocket;

import com.traderoom.common.model.Round;

import java.io.Closeable;

public interface Subscriber extends Closeable {
    void onVictory(Round round);
}
