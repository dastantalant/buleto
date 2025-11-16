package com.traderoom.monitoring.round.monitor;

public class MonitorStopException extends RuntimeException {
    public MonitorStopException() {
        super();
    }

    public MonitorStopException(String message) {
        super(message);
    }
}
