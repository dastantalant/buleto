package com.traderoom.bet.web.service;

public interface TimelineQueryService {
    String findAll(int page, int size);
    String findAllByDate(long date);
}
