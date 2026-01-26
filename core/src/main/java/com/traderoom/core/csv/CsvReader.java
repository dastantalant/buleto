package com.traderoom.core.csv;

import com.traderoom.core.converter.IdentityConverter;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

public final class CsvReader<T> {

    private final char sep;
    private final CsvClassMeta classMeta;
    private final boolean hasHeader;

    public CsvReader(Class<T> type) {
        CsvFile cfg = type.getAnnotation(CsvFile.class);
        this.sep = (cfg != null ? cfg.separator() : Separator.COMMA).symbol();
        this.hasHeader = cfg == null || cfg.header();
        this.classMeta = MetadataCache.get(type);
    }

    public List<T> read(InputStream in) {
        List<T> result = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(in, StandardCharsets.UTF_8))) {
            String line;
            boolean firstLine = true;
            while ((line = reader.readLine()) != null) {
                if (line.trim().isEmpty()) continue;
                if (firstLine && hasHeader) {
                    firstLine = false;
                    continue;
                }
                result.add(parseRow(line));
            }
        } catch (Throwable e) {
            throw new RuntimeException("Error reading CSV", e);
        }
        return result;
    }

    @SuppressWarnings("unchecked")
    private T parseRow(String line) throws Throwable {
        List<String> tokens = splitLine(line);
        List<CsvFieldMeta> fields = classMeta.fields;

        if (classMeta.isRecord) {
            // === ЛОГИКА ДЛЯ RECORD ===
            // Создаем массив аргументов для конструктора
            // Он инициализируется null/0/false по умолчанию
            Object[] args = new Object[classMeta.recordComponentCount];

            for (int i = 0; i < fields.size() && i < tokens.size(); i++) {
                CsvFieldMeta meta = fields.get(i);
                // Заполняем только если поле привязано к конструктору (для рекордов всегда так)
                if (meta.constructorParamIndex >= 0) {
                    args[meta.constructorParamIndex] = convert(tokens.get(i), meta);
                }
            }
            // Вызываем канонический конструктор
            return (T) classMeta.constructor.invokeWithArguments(args);

        } else {
            // === ЛОГИКА ДЛЯ POJO ===
            // Создаем объект через пустой конструктор
            T instance = (T) classMeta.constructor.invoke();

            for (int i = 0; i < fields.size() && i < tokens.size(); i++) {
                CsvFieldMeta meta = fields.get(i);
                Object val = convert(tokens.get(i), meta);
                meta.setter.invoke(instance, val);
            }
            return instance;
        }
    }

    private Object convert(String token, CsvFieldMeta meta) {
        if (meta.converter.getClass() != IdentityConverter.class) {
            return meta.converter.convert(token);
        }
        return PrimitiveParser.parse(token, meta.type);
    }

    // Простой парсер строки с учетом кавычек
    private List<String> splitLine(String line) {
        List<String> tokens = new ArrayList<>();
        StringBuilder sb = new StringBuilder();
        boolean inQuotes = false;

        for (int i = 0; i < line.length(); i++) {
            char c = line.charAt(i);

            if (c == '"') {
                // Проверка на экранированную кавычку ""
                if (inQuotes && i + 1 < line.length() && line.charAt(i + 1) == '"') {
                    sb.append('"');
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (c == sep && !inQuotes) {
                tokens.add(sb.toString());
                sb.setLength(0);
            } else {
                sb.append(c);
            }
        }
        tokens.add(sb.toString());
        return tokens;
    }
}