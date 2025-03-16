package com.traderoom.bet.test.version2;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

public class GridService {
    public boolean save(Grid grid) {
        try {
            Files.write(Paths.get("grid.bw"), grid.get().getBytes(), StandardOpenOption.APPEND);
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean save(String grid) {
        try {
            Files.write(Paths.get("grid.bw"), grid.getBytes(), StandardOpenOption.APPEND);
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }
}
