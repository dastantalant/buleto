package com.traderoom.bet.test.email;

import jakarta.mail.Authenticator;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import java.util.Properties;

public class EmailSendTest {
    public static void main(String[] args) {
        // Настройки SMTP-сервера (пример для Gmail)
        String host = "smtp.gmail.com";
        String port = "587";
        String mailFrom = "datumcrmsystem@gmail.com"; // Ваш email
        String password = "cboz xliq yovb ziay";   // Пароль приложения (для Gmail нужен специальный пароль)

        // Номер телефона и шлюз оператора
        String phoneNumber = "79161234567"; // Номер получателя
        String smsGateway = phoneNumber + "@sms.mts.ru"; // Шлюз для МТС

        // Текст сообщения (короткий, так как SMS ограничен по длине)
        String messageText = "Привет, это тестовое SMS!";

        // Настройка свойств SMTP
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", port);

        // Создание сессии с аутентификацией
        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(mailFrom, password);
            }
        });

        try {
            // Создание сообщения
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(mailFrom));
            message.setRecipient(Message.RecipientType.TO, new InternetAddress(smsGateway));
            message.setSubject(""); // Тема обычно не нужна для SMS
            message.setText(messageText);

            // Отправка сообщения
            Transport.send(message);
            System.out.println("SMS успешно отправлено на " + phoneNumber);

        } catch (MessagingException e) {
            System.out.println("Ошибка при отправке SMS: " + e.getMessage());
        }
    }
}