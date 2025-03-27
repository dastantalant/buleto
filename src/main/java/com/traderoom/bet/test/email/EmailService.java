package com.traderoom.bet.test.email;

import jakarta.mail.MessagingException;

public interface EmailService {
    boolean sendSimpleMail(EmailDetails details);
    boolean sendMailWithAttachment(EmailDetails details) throws MessagingException;
}
