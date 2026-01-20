package com.traderoom.strategy.monitoring;

import com.traderoom.strategy.model.context.Snapshot;

public interface Publisher {

    Subscriber addSubscriber(Subscriber subscriber);

    Snapshot publish(Snapshot snapshot);

}