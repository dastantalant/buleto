package com.traderoom.bet.buleto.model.round;

import java.util.List;
import java.util.Objects;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@ToString(of = {"number", "wave"})
public class Cell {
    private final byte number;
    private final WebElement cell;
    private double wave;
    private boolean victory;

    public void update() {
        victory = false;
        List<WebElement> spans = cell.findElements(By.tagName("span"));
        for (WebElement span : spans) {
            if (Objects.requireNonNull(span.getAttribute("class")).contains("cell__factor")) {
                String factor = span.getText();
                wave = Double.parseDouble(factor);
            }
        }
    }

    public boolean isVictory() {
        return Objects.requireNonNull(cell.getAttribute("class")).contains("cell-victory");
    }
}
