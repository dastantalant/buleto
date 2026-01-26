package com.traderoom.strategy.api;

import com.traderoom.strategy.enums.Tag;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
public @interface AStrategy {
    String name() default "";

    Tag[] tags() default {Tag.UNKOWN};
}
