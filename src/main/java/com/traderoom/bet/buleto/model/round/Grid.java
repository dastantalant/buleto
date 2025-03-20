package com.traderoom.bet.buleto.model.round;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import lombok.Getter;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

@Getter
public class Grid {
    private static final byte SIZE = 36;
    private final Map<Byte, Cell> cells;
    private Cell victoryCell;

    public Grid(WebElement grid) {
        cells = new HashMap<>(SIZE);
        for (byte i = 0; i <= SIZE; i++) {
            try {
                WebElement cell = grid.findElement(By.className("div" + i));
                if ("div".equals(cell.getTagName()) &&
                    Objects.requireNonNull(cell.getAttribute("class")).contains("cell")) {
                    List<WebElement> spans = cell.findElements(By.tagName("span"));
                    for (WebElement span : spans) {
                        if (Objects.requireNonNull(span.getAttribute("class")).contains("cell__count")) {
                            byte number = Byte.parseByte(span.getText());
                            if (number == i) {
                                cells.put(i, new Cell(number, cell));
                            }
                        }
                    }
                }
            } catch (Exception e) {
                System.err.println("Ошибка инициализации ячейки " + i + ": " + e.getMessage());
            }
        }
        update();
    }

    public boolean checkVictoryCell() {
        for (Cell cell : cells.values()) {
            if (cell.isVictory()) {
                victoryCell = cell;
                cell.setVictory(true);
                return true;
            }
        }
        return false;
    }

    public void update() {
        cells.forEach((k, v) -> v.update());
    }
}
