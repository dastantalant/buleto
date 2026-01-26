package com.traderoom.core;

public interface SaveService<R, T> {
    R save(T t);
}
