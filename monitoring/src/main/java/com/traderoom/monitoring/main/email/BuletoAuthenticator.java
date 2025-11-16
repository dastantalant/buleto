package com.traderoom.monitoring.main.email;

import jakarta.mail.Authenticator;
import jakarta.mail.PasswordAuthentication;

class BuletoAuthenticator extends Authenticator {
    private final PasswordAuthentication passwordAuthentication;

    public BuletoAuthenticator(String email, String password) {
        this.passwordAuthentication = new PasswordAuthentication(email, password);
    }

    protected PasswordAuthentication getPasswordAuthentication() {
        return passwordAuthentication;
    }
}