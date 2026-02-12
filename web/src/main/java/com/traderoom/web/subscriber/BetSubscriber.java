package com.traderoom.web.subscriber;

import com.traderoom.core.websocket.Round;
import com.traderoom.core.websocket.Subscriber;

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
