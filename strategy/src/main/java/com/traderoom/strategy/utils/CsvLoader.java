package com.traderoom.strategy.utils;

import com.traderoom.strategy.enums.Spot;
import lombok.experimental.UtilityClass;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;

@UtilityClass
public class CsvLoader {

    public static List<Spot> loadSpotsFromCsv(String filePath) {
        Path path = Paths.get(filePath);
        if (!Files.exists(path)) {
            System.err.println("Ошибка: Файл не найден по пути: " + filePath);
            return Collections.emptyList();
        }

        try {
            return Files.lines(path)
                    .skip(1)
                    .map(String::trim)
                    .map(Integer::parseInt)
                    .map(number -> Spot.getByNumber((number == 37) ? -1 : number))
                    .toList();
        } catch (IOException e) {
            System.err.println("Ошибка чтения файла: " + e.getMessage());
        } catch (NumberFormatException e) {
            System.err.println("Ошибка формата данных в файле: " + e.getMessage());
        }
        return Collections.emptyList();
    }
}