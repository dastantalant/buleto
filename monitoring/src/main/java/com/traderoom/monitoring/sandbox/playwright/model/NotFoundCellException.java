package com.traderoom.monitoring.sandbox.playwright.model;

public class NotFoundCellException extends RuntimeException {
    public NotFoundCellException() {
        super();
    }

    public NotFoundCellException(String message) {
        super(message);
    }
}
