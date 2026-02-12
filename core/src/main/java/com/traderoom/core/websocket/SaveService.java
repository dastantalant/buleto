package com.traderoom.core.websocket;

import java.io.Closeable;

public interface SaveService extends Closeable {
    Round save(Round round);
}

