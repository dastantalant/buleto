package com.traderoom.bet.test.email;

import jakarta.mail.Authenticator;
import jakarta.mail.Message;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import java.util.Properties;


/**
 * itcuties mail example
 *
 * @author itcuties
 *
 */
public class JavaMailSender {

    // Run the mail example
    public static void main(String[] args) {
        // Send email
        sendEmail();

    }

    /**
     * Send the email via SMTP using TLS and SSL
     */
    private static void sendEmail() {

        // Create all the needed properties
        Properties connectionProperties = new Properties();
        // SMTP host
        connectionProperties.put("mail.smtp.host", "smtp.gmail.com");
        // Is authentication enabled
        connectionProperties.put("mail.smtp.auth", "true");
        // Is TLS enabled
        connectionProperties.put("mail.smtp.starttls.enable", "true");
        // SSL Port
        connectionProperties.put("mail.smtp.socketFactory.port", "465");
        // SSL Socket Factory class
        connectionProperties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        // SMTP port, the same as SSL port :)
        connectionProperties.put("mail.smtp.port", "465");

        System.out.print("Creating the session...");

        // Create the session
        Session session = Session.getDefaultInstance(connectionProperties,
                new Authenticator() {	// Define the authenticator
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication("datumcrmsystem@gmail.com","adkm szxa amfe khmr");
                    }
                });

        System.out.println("done!");

        // Create and send the message
        try {
            // Create the message
            Message message = new MimeMessage(session);
            // Set sender
            message.setFrom(new InternetAddress("datumcrmsystem@gmail.com"));
            // Set the recipients
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse("makkambaevdastan@gmail.com"));
            // Set message subject
            message.setSubject("Hello from Buleto");
            // Set message text
            message.setText("Java is easy when you watch our tutorials ;)");

            System.out.print("Sending message...");
            // Send the message
            Transport.send(message);

            System.out.println("done!");

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

}