package com.traderoom.core.websocket;

import java.io.Closeable;

public interface Subscriber extends Closeable {
    void onVictory(Round round);
}
