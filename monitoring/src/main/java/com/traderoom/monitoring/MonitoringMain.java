package com.traderoom.monitoring;

import com.traderoom.monitoring.client.BlockingRunner;

public class MonitoringMain {
    static void main() {
        new BlockingRunner().start();
    }
}
