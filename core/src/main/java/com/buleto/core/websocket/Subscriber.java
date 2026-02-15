package com.buleto.core.websocket;

import com.buleto.core.model.Round;

import java.io.Closeable;

public interface Subscriber extends Closeable {
    void onVictory(Round round);
}
