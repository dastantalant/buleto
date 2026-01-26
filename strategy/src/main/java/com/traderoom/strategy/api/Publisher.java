package com.traderoom.strategy.api;

import com.traderoom.strategy.model.context.Snapshot;

import java.io.Serializable;

public interface Publisher  extends Serializable {

    Subscriber addSubscriber(Subscriber subscriber);

    Snapshot publish(Snapshot snapshot);

}