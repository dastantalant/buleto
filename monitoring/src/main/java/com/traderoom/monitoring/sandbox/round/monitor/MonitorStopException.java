package com.traderoom.monitoring.sandbox.round.monitor;

public class MonitorStopException extends RuntimeException {
    public MonitorStopException() {
        super();
    }

    public MonitorStopException(String message) {
        super(message);
    }
}
