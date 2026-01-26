package com.traderoom.core.csv;

import com.traderoom.core.converter.Converter;
import java.lang.invoke.MethodHandle;

final class CsvFieldMeta {
    final String header;
    final int order;
    final Class<?> type;
    final MethodHandle getter;
    final MethodHandle setter;       // null для Record
    final int constructorParamIndex; // -1 для POJO, 0..N для Record
    final Converter<Object, Object> converter;

    CsvFieldMeta(
            String header,
            int order,
            Class<?> type,
            MethodHandle getter,
            MethodHandle setter,
            int constructorParamIndex,
            Converter<Object, Object> converter
    ) {
        this.header = header;
        this.order = order;
        this.type = type;
        this.getter = getter;
        this.setter = setter;
        this.constructorParamIndex = constructorParamIndex;
        this.converter = converter;
    }
}