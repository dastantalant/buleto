package com.traderoom.common.websocket;

public interface Client {

    Client start();

    void stop();

    void connectAndWait();

    static Client base(String url, Publisher publisher) {
        return new BaseClient(url, publisher);
    }

    static Client base(String url, Subscriber subscriber) {
        return new BaseClient(url, Publisher.base(subscriber));
    }

    static Client okHttp(String url, Publisher publisher) {
        return new OkHttpWebSocketClient(url, publisher);
    }

    static Client okHttp(String url, Subscriber subscriber) {
        return new OkHttpWebSocketClient(url, Publisher.base(subscriber));
    }
}
