package com.traderoom.core.csv;

import java.lang.invoke.MethodHandle;
import java.util.List;

final class CsvClassMeta {
    final List<CsvFieldMeta> fields;
    final MethodHandle constructor; // Для Record - канонический, для POJO - no-args
    final boolean isRecord;
    final int recordComponentCount; // Количество аргументов конструктора рекорда

    CsvClassMeta(List<CsvFieldMeta> fields, MethodHandle constructor, boolean isRecord, int recordComponentCount) {
        this.fields = fields;
        this.constructor = constructor;
        this.isRecord = isRecord;
        this.recordComponentCount = recordComponentCount;
    }
}