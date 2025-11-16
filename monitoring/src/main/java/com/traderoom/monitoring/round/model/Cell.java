package com.traderoom.monitoring.round.model;

import java.util.List;
import java.util.Objects;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class Cell {
    private final byte number;
    private final WebElement cell;
    private double wave;
    private boolean victory;

    public Cell(byte number, WebElement cell) {
        this.number = number;
        this.cell = cell;
    }

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

    public byte getNumber() {
        return number;
    }

    public WebElement getCell() {
        return cell;
    }

    public double getWave() {
        return wave;
    }

    public void setWave(double wave) {
        this.wave = wave;
    }

    public void setVictory(boolean victory) {
        this.victory = victory;
    }
}
