package com.traderoom.strategy.factory;

import com.traderoom.strategy.group.StrategyType;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
public @interface AStrategy {
    String name() default "";

    StrategyType[] tags() default {StrategyType.UNKOWN};
}
