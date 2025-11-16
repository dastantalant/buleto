package com.traderoom.monitoring.socket.service;

public  interface MailNotificationService {
    void sendNotification(String subject, String body);
}
