package com.traderoom.monitoring.sandbox.socket.socket;

import com.traderoom.monitoring.sandbox.socket.service.MonitorService;
import com.traderoom.monitoring.sandbox.socket.socket.model.Factor;
import com.traderoom.monitoring.sandbox.socket.socket.model.Round;
import com.traderoom.monitoring.sandbox.socket.socket.model.State;
import java.time.Instant;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Monitor {
    private static final Logger logger = LoggerFactory.getLogger(Monitor.class);
    public static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
            .withZone(ZoneOffset.UTC);

    private final Round round;
    private final Factor factor;
    private final MonitorService service;


    public Monitor(Round round, Factor factor, MonitorService service) {
        this.round = round;
        this.factor = factor;
        this.service = service;
    }

    public void fix(String json) {
        if (json.isBlank()) return;

        if (json.startsWith("{\"type\":\"round\"")) {
            round.set(json);
        } else if (json.startsWith("{\"type\":\"factors\"")) {
            factor.set(json);
        }

        if (round.getState() == State.VICTORY) {
            service.save(this);
            logger.info("[{}] {}", FORMATTER.format(Instant.now()), round.log());
            round.setState(State.EMPTY);
            factor.reset();
        }
    }

    public Round getRound() {
        return round;
    }

    public Factor getFactor() {
        return factor;
    }
}
