package com.traderoom.api;

import com.traderoom.api.model.Snapshot;

public interface Publisher {

    Subscriber addSubscriber(Subscriber subscriber);

    Snapshot publish(Snapshot snapshot);

}