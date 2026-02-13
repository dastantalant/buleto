package com.traderoom.common.subscriber;

import com.traderoom.common.model.Round;
import com.traderoom.common.websocket.Subscriber;

import java.io.IOException;

public class BetSubscriber implements Subscriber {
    @Override
    public void onVictory(Round round) {
        System.out.println(round);
    }

    @Override
    public void close() throws IOException {
    }
}
