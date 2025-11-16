package com.traderoom.monitoring.playwright.model;

public class NotFoundCellException extends RuntimeException {
    public NotFoundCellException() {
        super();
    }

    public NotFoundCellException(String message) {
        super(message);
    }
}
