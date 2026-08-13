package com.buleto.core.websocket;

import com.buleto.core.model.Round;
import com.buleto.core.util.RoundJsonParser;
import com.toolbox.core.logging.FastLogger;

import java.io.Closeable;
import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public interface Publisher extends Closeable {

    Subscriber add(Subscriber subscriber);

    void publish(CharSequence message);

    static Publisher base() {
        return new Base();
    }

    static Publisher base(Subscriber subscriber) {
        var pub = new Base();
        pub.add(subscriber);
        return pub;
    }

    class Base implements Publisher {
        private final ExecutorService executor = Executors.newCachedThreadPool();
        private final Set<Subscriber> subscribers = new CopyOnWriteArraySet<>();
        private volatile long lastSavedRoundId = -1;

        @Override
        public Subscriber add(Subscriber subscriber) {
            subscribers.add(subscriber);
            return subscriber;
        }

        @Override
        public void publish(CharSequence message) {
            executor.submit(() -> {
                try {
                    long id = RoundJsonParser.extractRoundId(message);
                    if (id == -1 || id == lastSavedRoundId) {
                        return;
                    }
                    if (!RoundJsonParser.hasVictory(message)) {
                        return;
                    }
                    Round round = RoundJsonParser.parseVictory(message);
                    if (round != null && round.isComplete()) {
                        lastSavedRoundId = round.roundId();
                        subscribers.forEach(subscriber -> executor.submit(() -> subscriber.onVictory(round)));
                    }
                } catch (Exception e) {
                    FastLogger.error("Parse Error", e);
                }
            });
        }

        @Override
        public void close() throws IOException {
            subscribers.forEach(subscriber -> executor.submit(() -> {
                try {
                    subscriber.close();
                } catch (IOException _) {
                }
            }));
        }
    }
}
