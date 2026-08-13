package com.buleto.core.service;

import com.buleto.core.model.Round;
import com.buleto.core.websocket.Subscriber;

import java.util.List;

public interface CsvService extends Subscriber {
    void save(List<Round> list);
}
