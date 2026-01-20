package com.traderoom.monitoring.sandbox.socket.socket.model;

import com.jsoniter.JsonIterator;
import com.jsoniter.ValueType;
import com.jsoniter.any.Any;
import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Round {
    private static final byte CAP = 38;

    private long lastId;
    private long roundId; // id

    private long startDate; // sd
    private long endDate; // ed
    private long betCloseDate; //bcd
    private long betTargetDate; //btd

    private double beginValue; // bv
    private double targetValue; // tv
    private double startValue; //sv

    private final Map<Byte, Cell> cells; //cls
    private byte victoryCellNumber;
    private long victoryDate;
    private double victoryValue;
    private State state;

    public Round() {
        state = State.EMPTY;
        cells = new HashMap<>();
        for (byte i = 0; i < CAP; i++) {
            cells.put(i, new Cell(i));
        }
    }

    public State set(String json) {
        Any deserialize = JsonIterator.deserialize(json);
        Any data = deserialize.get("data");
        int s = Integer.parseInt(data.toString("s"));
        long id = Long.parseLong(data.toString("id"));
        if (id != roundId && state == State.EMPTY && s == 5) {
            initState(data, id);
            return state;
        }
        if (id == roundId && state == State.FIll && s == 5) {
            initVictory(data);
            return state;
        }
        return state;
    }

    private void initState(Any data, long id) {
        state = State.FIll;
        lastId = lastId == 0 ? id : roundId;
        roundId = id;
        beginValue = Double.parseDouble(data.toString("bv"));
        targetValue = Double.parseDouble(data.toString("tv"));
        startValue = Double.parseDouble(data.toString("sv"));
        startDate = Instant.parse(data.toString("sd")).toEpochMilli();
        endDate = Instant.parse(data.toString("ed")).toEpochMilli();
        betCloseDate = Instant.parse(data.toString("bcd")).toEpochMilli();
        betTargetDate = Instant.parse(data.toString("btd")).toEpochMilli();
        List<Any> list = data.get("cls").asList();
        for (Any any : list) {
            int c = any.toInt("c");
            Cell cell = cells.get((byte) c);
            double vt = Double.parseDouble(any.toString("vt"));
            double vf = Double.parseDouble(any.toString("vf"));
            cell.setVictory(false);
            cell.setTarget(vt);
            cell.setBegin(vf);
        }
    }

    private void initVictory(Any data) {
        Any rr = data.get("rr");
        if (rr.valueType() != ValueType.INVALID) {
            victoryDate = Instant.parse(rr.toString("dt")).toEpochMilli();
            victoryCellNumber = (byte) rr.toInt("c");
            cells.get(victoryCellNumber).setVictory(true);
            victoryValue = Double.parseDouble(rr.toString("v"));
            state = State.VICTORY;
        }
    }

    public long getLastId() {
        return lastId;
    }

    public void setLastId(long lastId) {
        this.lastId = lastId;
    }

    public long getRoundId() {
        return roundId;
    }

    public void setRoundId(long roundId) {
        this.roundId = roundId;
    }

    public long getStartDate() {
        return startDate;
    }

    public void setStartDate(long startDate) {
        this.startDate = startDate;
    }

    public long getEndDate() {
        return endDate;
    }

    public void setEndDate(long endDate) {
        this.endDate = endDate;
    }

    public long getBetTargetDate() {
        return betTargetDate;
    }

    public void setBetTargetDate(long betTargetDate) {
        this.betTargetDate = betTargetDate;
    }

    public long getBetCloseDate() {
        return betCloseDate;
    }

    public void setBetCloseDate(long betCloseDate) {
        this.betCloseDate = betCloseDate;
    }

    public double getBeginValue() {
        return beginValue;
    }

    public void setBeginValue(double beginValue) {
        this.beginValue = beginValue;
    }

    public double getTargetValue() {
        return targetValue;
    }

    public void setTargetValue(double targetValue) {
        this.targetValue = targetValue;
    }

    public double getStartValue() {
        return startValue;
    }

    public void setStartValue(double startValue) {
        this.startValue = startValue;
    }

    public Map<Byte, Cell> getCells() {
        return cells;
    }

    public byte getVictoryCellNumber() {
        return victoryCellNumber;
    }

    public void setVictoryCellNumber(byte victoryCellNumber) {
        this.victoryCellNumber = victoryCellNumber;
    }

    public long getVictoryDate() {
        return victoryDate;
    }

    public void setVictoryDate(long victoryDate) {
        this.victoryDate = victoryDate;
    }

    public double getVictoryValue() {
        return victoryValue;
    }

    public void setVictoryValue(double victoryValue) {
        this.victoryValue = victoryValue;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public String toString() {
        return "Round{" +
               "lastId=" + lastId +
               ", roundId=" + roundId +
               ", startDate=" + startDate +
               ", endDate=" + endDate +
               ", betCloseDate=" + betCloseDate +
               ", betTargetDate=" + betTargetDate +
               ", beginValue=" + beginValue +
               ", targetValue=" + targetValue +
               ", startValue=" + startValue +
               ", victoryCell=" + victoryCellNumber +
               ", victoryDate=" + victoryDate +
               ", victoryWave=" + victoryValue +
               '}';
    }

    public String log() {
        return "roundId=" + roundId +
               ", victoryCell=" + victoryCellNumber +
               ", victoryWave=" + victoryValue;
    }
}
