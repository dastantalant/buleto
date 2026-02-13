package com.traderoom.common.service;

import com.traderoom.common.model.Round;

import java.io.Closeable;

public interface SaveService extends Closeable {
    Round save(Round round);
}

