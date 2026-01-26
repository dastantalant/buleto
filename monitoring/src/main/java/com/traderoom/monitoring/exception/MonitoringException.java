package com.traderoom.monitoring.exception;

public class MonitoringException extends RuntimeException {

    public MonitoringException(String message) {
        super(message);
    }

    public MonitoringException() {
    }

    public MonitoringException(String message, Throwable cause) {
        super(message, cause);
    }
}
