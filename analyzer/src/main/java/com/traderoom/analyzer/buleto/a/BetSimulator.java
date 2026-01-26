//package com.traderoom.strategy.simulation;
//
//import com.traderoom.strategy.IStrategy;
//import com.traderoom.strategy.enums.Spot;
//import com.traderoom.strategy.model.context.Snapshot;
//import com.traderoom.strategy.model.context.State;
//import com.traderoom.strategy.simulation.generator.SpotSupplier;
//
//public class BetSimulator implements Simulator {
//    private final IStrategy strategy;
//    private final SpotSupplier supplier;
//
//    public BetSimulator(IStrategy strategy, SpotSupplier supplier) {
//        this.strategy = strategy;
//        this.supplier = supplier;
//    }
//
//    @Override
//    public Snapshot run() {
//        State state = State.of(strategy.getStartBalance());
//        boolean canContinue = strategy.canContinue(state);
//        boolean hasNext = supplier.hasNext();
//        while (canContinue && hasNext) {
//            Spot spot = supplier.get();
//            if (spot == null) break;
//            strategy.playTurn(spot, state);
//            canContinue = strategy.canContinue(state);
//            hasNext = supplier.hasNext();
//        }
//        return strategy.endGame(state);
//    }
//}
