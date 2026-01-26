package com.traderoom.core.util;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Deque;
import java.util.LinkedList;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class CsvDataLoader {

    private CsvDataLoader() {}

    public static Deque<Integer> load(String filePath) throws IOException {
        return load(Paths.get(filePath));
    }

    public static Deque<Integer> load(Path path) throws IOException {
        if (!Files.exists(path)) {
            throw new FileNotFoundException("Файл не найден: " + path);
        }
        try (Stream<String> lines = Files.lines(path)) {
            return lines
                    .skip(1)
                    .map(String::trim)
                    .filter(line -> !line.isEmpty())
                    .map(Integer::parseInt)
                    .collect(Collectors.toCollection(LinkedList::new));
        }
    }
}