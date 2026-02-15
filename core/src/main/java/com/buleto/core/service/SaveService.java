package com.buleto.core.service;

import com.buleto.core.model.Round;

import java.io.Closeable;

public interface SaveService extends Closeable {
    Round save(Round round);
}

