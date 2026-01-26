package com.traderoom.monitoring.api;

import com.traderoom.monitoring.model.Round;

import java.io.Closeable;

public interface SaveService extends com.traderoom.core.SaveService<Round, Round>, Closeable {
}
