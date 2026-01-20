package com.traderoom.monitoring.sandbox.round.email;

import jakarta.mail.Authenticator;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.AddressException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Properties;

public class BuletoMailSender {
    private static final Logger logger = LoggerFactory.getLogger(BuletoMailSender.class);
    private final Properties properties;
    private final Session session;
    private final InternetAddress sender;
    private final InternetAddress defaultRecipient;

    public BuletoMailSender(String sender, String password, String recipient) {
        properties = new Properties();
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.port", "587");

        Authenticator authenticator = new BuletoAuthenticator(sender, password);
        session = Session.getInstance(properties, authenticator);

        this.sender = parseAddress(sender, "Sender email is invalid");
        defaultRecipient = parseAddress(recipient, "Recipient email is invalid");
    }

    private InternetAddress parseAddress(String address, String errorMessage) {
        try {
            return new InternetAddress(address);
        } catch (AddressException ae) {
            throw new IllegalArgumentException(errorMessage + ": " + ae.getMessage(), ae);
        }
    }

    public boolean sendToMe(String subject, String messageBody) {
        return sendMessage(defaultRecipient, subject, messageBody);
    }

    public boolean sendMessage(String recipient, String subject, String messageBody) {
        InternetAddress recipientAddress = parseAddress(recipient, "Invalid recipient email");
        return sendMessage(recipientAddress, subject, messageBody);
    }

    private boolean sendMessage(InternetAddress recipient, String subject, String messageBody) {
        try {
            Message message = createMessage(recipient, subject, messageBody);
            Transport.send(message);
            logger.info("Email sent successfully to {}", recipient);
            return true;
        } catch (MessagingException me) {
            logger.error("Error sending email", me);
            return false;
        }
    }

    private Message createMessage(InternetAddress recipient, String subject, String messageBody) throws MessagingException {
        Message message = new MimeMessage(session);
        message.setFrom(sender);
        message.setRecipient(Message.RecipientType.TO, recipient);
        message.setSubject(subject);
        message.setText(messageBody);
        return message;
    }
}
