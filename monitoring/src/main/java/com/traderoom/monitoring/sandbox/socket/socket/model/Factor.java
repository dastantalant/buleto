package com.traderoom.monitoring.sandbox.socket.socket.model;

import com.jsoniter.JsonIterator;
import com.jsoniter.any.Any;
import java.util.LinkedHashMap;
import java.util.List;

public class Factor {
    private static final short CAP = 512;

    private final LinkedHashMap<String, Double> factors;

    public Factor() {
        factors = new LinkedHashMap<>(CAP);
    }

    public void reset() {
        factors.clear();
    }

    public void set(String json) {
        Any deserialize = JsonIterator.deserialize(json);
        Any data = deserialize.get("data");
        List<Any> list = data.asList();
        for (int i = list.size() - 1; i > 0; i--) {
            if (factors.containsKey(list.get(i).toString("dt"))) break;
            factors.put(list.get(i).toString("dt"), Double.parseDouble(list.get(i).toString("v")));
        }
    }

    public LinkedHashMap<String, Double> getFactors() {
        return factors;
    }
}

