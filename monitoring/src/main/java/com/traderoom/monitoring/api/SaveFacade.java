package com.traderoom.monitoring.api;

import com.traderoom.core.SaveService;
import com.traderoom.monitoring.model.Round;

import java.io.Closeable;

public interface SaveFacade extends SaveService<Round, CharSequence>, Closeable {
}
