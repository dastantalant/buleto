# Project Dump

- Root: C:\Users\dastan\home\github\buleto\.
- Files: 183
- Generated: 2026-01-26T16:27:14.904327400

## com/traderoom/strategy/api/Maker.java

```java
package com.traderoom.strategy.api;
@FunctionalInterface
public interface Maker {
List<Bet> decide(State state);
}
```

## com/traderoom/strategy/api/Manager.java

```java
package com.traderoom.strategy.api;
public interface Manager extends IStrategy {
List<IStrategy> getPortfolio();
IStrategy add(IStrategy strategy);
List<IStrategy> add(List<IStrategy> strategies);
IStrategy remove(IStrategy strategy);
Optional<IStrategy> create(Class<? extends IStrategy> clazz, Config config);
static List<IStrategy> generateAllCombinations(Config config) {
List<IStrategy> combinations = new ArrayList<>();
List<Predictor> predictors = new ArrayList<>();
predictors.add(new MultiOrderMarkovPredictor());
predictors.add(new ImprovedMarkovPredictor());
predictors.add(new EfficientCountPredictor());
predictors.add(new PatternPredictor());
predictors.add(new RandomPredictor());
List<Sizing> sizing = new ArrayList<>();
sizing.add(new FlatSizing());
sizing.add(new MartingaleSizing());
sizing.add(new KellySizing());
sizing.add(new DAlembertSizing());
for (Predictor p : predictors) {
for (Sizing s : sizing) {
combinations.add(ModularStrategy.of(config, p, s));
}
}
return combinations;
}
static String formatName(Predictor predictor, Sizing sizing) {
String pName = predictor.getClass().getSimpleName().replace("Predictor", "");
String sName = sizing.getClass().getSimpleName().replace("Sizing", "");
return pName + "_" + sName;
}
}
```

## com/traderoom/strategy/api/Metric.java

```java
package com.traderoom.strategy.api;
public interface Metric extends Naming {
Config getConfig();
long getBalance();
long getStartBalance();
long getPeakBalance();
double getMaxDrawdown();
long getWonCount();
long getLostCount();
long getBetCount();
long getTotalWagered();
long getTotalPayout();
List<Bet> getLastBets();
RiskManager getRiskManager();
}
```

## com/traderoom/strategy/api/Naming.java

```java
package com.traderoom.strategy.api;
public interface Naming {
String getName();
}
```

## com/traderoom/strategy/api/Publisher.java

```java
package com.traderoom.strategy.api;
public interface Publisher  extends Serializable {
Subscriber addSubscriber(Subscriber subscriber);
Snapshot publish(Snapshot snapshot);
}
```

## com/traderoom/strategy/api/Subscriber.java

```java
package com.traderoom.strategy.api;
public interface Subscriber extends Serializable {
void onRound(Snapshot snapshot);
default void onGameEnd(Snapshot snapshot) {
}
default Deque<Snapshot> deque() {
return new LinkedList<>();
}
static Subscriber storage() {
return new Storage(new ArrayDeque<>());
}
record Storage(Deque<Snapshot> deque) implements Subscriber {
public void onRound(Snapshot snapshot) {
deque.addLast(snapshot);
}
public void onGameEnd(Snapshot snapshot) {
deque.addLast(snapshot);
}
}
}
```

## com/traderoom/strategy/base/AbstractMetricStrategy.java

```java
package com.traderoom.strategy.base;
@Getter
public abstract class AbstractMetricStrategy extends AbstractStateStrategy {
private final long startBalance;
private long wonCount;
private long lostCount;
private long betCount;
private double maxDrawdown;
private long peakBalance;
private long totalWagered;
private long totalPayout;
private final RiskManager riskManager;
protected AbstractMetricStrategy(Config config) {
super(config);
startBalance = config.startBalance();
riskManager = new ZoneRiskManager(startBalance);
peakBalance = startBalance;
}
protected double getAverage() {
return betCount == 0 ? 0 : (double) wonCount / betCount;
}
protected void setWonCount(long wonCount) {
this.wonCount = wonCount;
}
protected void incrementWon() {
wonCount++;
}
protected void setLostCount(long lostCount) {
this.lostCount = lostCount;
}
protected void incrementLost() {
lostCount++;
}
protected void setBetCount(long betCount) {
this.betCount = betCount;
}
protected void incrementBet() {
betCount++;
}
protected void setMaxDrawdown(double maxDrawdown) {
this.maxDrawdown = maxDrawdown;
}
protected void setPeakBalance(long peakBalance) {
this.peakBalance = peakBalance;
}
protected void setTotalWagered(long totalWagered) {
this.totalWagered = totalWagered;
}
protected void setTotalPayout(long totalPayout) {
this.totalPayout = totalPayout;
}
}
```

## com/traderoom/strategy/base/AbstractStateStrategy.java

```java
package com.traderoom.strategy.base;
public abstract class AbstractStateStrategy implements IStrategy {
private final UUID id = UUID.randomUUID();
@Getter
private final Config config;
@Getter
private long balance;
@Getter
private List<Bet> lastBets;
@Getter
private boolean live;
private final Queue<Long> historyBalance;
protected AbstractStateStrategy(Config config) {
this.config = config;
this.balance = config.startBalance();
historyBalance = new LinkedList<>();
lastBets = Collections.emptyList();
live = true;
}
void setBalance(long balance) {
this.balance = balance;
}
protected boolean isLastBetWon(State state) {
Spot lastSpot = state.getMarketData().getLastSpot();
var bets = getLastBets();
if (bets == null || bets.isEmpty() || lastSpot == null) {
return false;
}
return BetHelper.hasWin(bets, lastSpot);
}
protected boolean isLastBet() {
return lastBets != null && !lastBets.isEmpty();
}
protected long getLastBet() {
return BetHelper.getTotalBetValue(lastBets);
}
protected void setLastBets(List<Bet> lastBets) {
this.lastBets = lastBets;
}
public void stop() {
live = false;
}
protected Queue<Long> getHistoryBalance() {
return historyBalance;
}
@Override
public final int hashCode() {
return Objects.hash(id);
}
@Override
public final boolean equals(Object obj) {
if (this == obj) return true;
if (obj == null || getClass() != obj.getClass()) return false;
AbstractStateStrategy that = (AbstractStateStrategy) obj;
return Objects.equals(id, that.id);
}
}
```

## com/traderoom/strategy/base/AbstractStrategy.java

```java
package com.traderoom.strategy.base;
public abstract class AbstractStrategy extends AbstractMetricStrategy {
@Getter
private final String name;
private final Set<Subscriber> subscribers = new CopyOnWriteArraySet<>();
@Getter
private final List<StopCondition> stopConditions;
protected AbstractStrategy(Config config) {
this(config, "");
}
protected AbstractStrategy(Config config, String name) {
super(config);
this.name = StringUtil.isBlank(name) ? getClass().getSimpleName() : name;
stopConditions = config.createConditions();
}
@Override
public final Snapshot playTurn(Spot spot, State state) {
List<Bet> rawBets = decide(state);
List<Bet> finalBets = getRiskManager().apply(rawBets, getBalance(), state, getConfig());
state.registerSpot(spot);
return onRoundEnd(finalBets, spot, state);
}
@Override
public Snapshot endGame(State state) {
stop();
Snapshot snapshot = snapshot(List.of(), null, getBalance());
return publishGameEnd(snapshot);
}
protected final Snapshot onRoundEnd(List<Bet> bets, Spot spot, State state) {
long oldBalance = getBalance();
update(bets, spot);
onRoundCustom(bets, spot, state);
getRiskManager().updateState(getBalance());
state.setBalance(getBalance());
Snapshot snapshot = snapshot(bets, spot, oldBalance);
return publish(snapshot);
}
protected void onRoundCustom(List<Bet> bets, Spot spot, State state) {
}
private void update(List<Bet> betList, Spot spot) {
if (betList == null || betList.isEmpty()) {
return;
}
long bValue = BetHelper.getTotalBetValue(betList);
long bPayout = BetHelper.getTotalPayout(betList, spot);
setBalance(getBalance() - bValue + bPayout);
setTotalWagered(getTotalWagered() + bValue);
setTotalPayout(getTotalPayout() - bPayout);
incrementBet();
if (bPayout > bValue) {
incrementWon();
} else {
incrementLost();
}
var hBalance = getHistoryBalance();
hBalance.offer(getBalance());
if (hBalance.size() > BALANCE_HISTORY_SIZE) {
hBalance.poll();
}
if (getBalance() > getPeakBalance()) {
setPeakBalance(getBalance());
}
if (getPeakBalance() > 0) {
double cMaxDrawdown = (double) (getPeakBalance() - getBalance()) / getPeakBalance();
if (cMaxDrawdown > getMaxDrawdown()) {
setMaxDrawdown(cMaxDrawdown);
}
}
}
@Override
public final Subscriber addSubscriber(Subscriber subscriber) {
subscribers.add(subscriber);
return subscriber;
}
@Override
public final Snapshot publish(Snapshot snapshot) {
for (Subscriber sub : subscribers) {
sub.onRound(snapshot);
}
return snapshot;
}
protected final Snapshot publishGameEnd(Snapshot snapshot) {
for (Subscriber sub : subscribers) {
sub.onGameEnd(snapshot);
}
return snapshot;
}
}
```

## com/traderoom/strategy/base/AdvancedManager.java

```java
package com.traderoom.strategy.base;
@AStrategy
public class AdvancedManager extends BaseManager {
private IStrategy currentChampion;
private long roundsUntilReevaluation;
private final Map<IStrategy, LinkedList<Double>> returnHistories;
private final Map<IStrategy, List<Bet>> pendingVirtualBets;
public AdvancedManager(Config config) {
super(config);
List<IStrategy> portfolioList = Stream.of(
HybridPredictorStrategy.class,
MeanReversionStrategy.class,
KellyCriterionStrategy.class,
AdaptiveVolatilityStrategy.class,
HotNumbersStrategy.class,
ParoliStrategy.class)
.map(clazz -> super.create(clazz, config))
.filter(Optional::isPresent)
.map(Optional::get)
.toList();
add(new ArrayList<>(portfolioList));
currentChampion = portfolioList.isEmpty() ? null : portfolioList.getFirst();
roundsUntilReevaluation = REEVALUATION_PERIOD;
returnHistories = new HashMap<>();
pendingVirtualBets = new HashMap<>();
portfolioList.forEach(strategy -> returnHistories.put(strategy, new LinkedList<>()));
}
@Override
public List<Bet> decide(State state) {
if (currentChampion == null) {
return List.of();
}
roundsUntilReevaluation--;
if (roundsUntilReevaluation <= 0) {
reevaluateChampionBySharpeRatio();
roundsUntilReevaluation = REEVALUATION_PERIOD;
}
pendingVirtualBets.clear();
for (IStrategy strategy : portfolio) {
if (strategy == currentChampion) {
((AbstractStrategy) strategy).setBalance(this.getBalance());
}
List<Bet> bets = ((AbstractStrategy) strategy).decide(state);
pendingVirtualBets.put(strategy, bets);
}
List<Bet> championBets = pendingVirtualBets.getOrDefault(currentChampion, List.of());
setLastBets(championBets);
return championBets;
}
@Override
public void onRoundCustom(List<Bet> betList, Spot spot, State state) {
for (IStrategy strategy : portfolio) {
long balanceBefore = strategy.getBalance();
List<Bet> virtualBets = pendingVirtualBets.getOrDefault(strategy, List.of());
((AbstractStrategy) strategy).onRoundEnd(virtualBets, spot, state);
long balanceAfter = strategy.getBalance();
double dailyReturn = (balanceBefore == 0) ? 0.0 : (double) (balanceAfter - balanceBefore) / balanceBefore;
LinkedList<Double> history = returnHistories.get(strategy);
if (history != null) {
history.add(dailyReturn);
if (history.size() > REEVALUATION_PERIOD) {
history.removeFirst();
}
}
}
}
private void reevaluateChampionBySharpeRatio() {
Optional<IStrategy> newChampionOpt = portfolio.stream()
.max(Comparator.comparingDouble(this::calculateSharpeRatio));
newChampionOpt.ifPresent(strategy -> {
if (strategy != currentChampion) {
currentChampion = strategy;
}
});
}
private double calculateSharpeRatio(IStrategy strategy) {
LinkedList<Double> returns = returnHistories.get(strategy);
if (returns == null || returns.size() < 2) {
return -Double.MAX_VALUE;
}
double meanReturn = returns.stream().mapToDouble(d -> d).average().orElse(0.0);
double standardDeviation = Math.sqrt(
returns.stream()
.mapToDouble(r -> Math.pow(r - meanReturn, 2))
.average().orElse(0.0));
if (standardDeviation == 0) {
return (meanReturn > 0) ? Double.MAX_VALUE : 0;
}
return meanReturn / standardDeviation;
}
}
```

## com/traderoom/strategy/base/BaseManager.java

```java
package com.traderoom.strategy.base;
public abstract class BaseManager extends AbstractStrategy implements Manager {
protected static final int REEVALUATION_PERIOD = 25;
protected final List<IStrategy> portfolio;
protected final StrategyFactory strategyFactory;
protected BaseManager(Config config) {
super(config);
portfolio = new ArrayList<>();
strategyFactory = StrategyFactory.getInstance();
}
@Override
public List<IStrategy> getPortfolio() {
return List.copyOf(portfolio);
}
public IStrategy add(IStrategy strategy) {
portfolio.add(strategy);
return strategy;
}
public List<IStrategy> add(List<IStrategy> strategies) {
strategies.forEach(this::add);
return strategies;
}
public IStrategy remove(IStrategy strategy) {
portfolio.remove(strategy);
return strategy;
}
public Optional<IStrategy> create(Class<? extends IStrategy> clazz, Config config) {
return Optional.ofNullable(strategyFactory.create(clazz, config));
}
}
```

## com/traderoom/strategy/base/DynamicAllocationManager.java

```java
package com.traderoom.strategy.base;
@AStrategy
public class DynamicAllocationManager extends BaseManager {
private static final double GROWTH_FACTOR = 1.15;
private static final double DECAY_FACTOR = 0.95;
private static final double MIN_WEIGHT_THRESHOLD = 0.01;
private static final double MAX_WEIGHT_CAP = 10.0;
private static final double RESURRECTION_THRESHOLD = 0.1;
private final List<StrategyTracker> trackers;
public DynamicAllocationManager(Config config) {
super(config);
trackers = new ArrayList<>();
List<IStrategy> portfolio =
Stream.of(GrandMartingaleStrategy.class,
MartingaleStrategy4.class,
EvenOddBalanceStrategy.class,
ColorBalanceStrategy.class,
MartingaleStrategy.class,
DAlembertStrategy.class)
.map(item -> create(item, config))
.filter(Optional::isPresent)
.map(Optional::get)
.map(s -> (IStrategy) ModularStrategy.of(config, MultiOrderMarkovPredictor.of(), MartingaleSizing.of()))
.map(s -> (IStrategy) ModularStrategy.of(config, EfficientCountPredictor.of(), DAlembertSizing.of()))
.map(s -> (IStrategy) ModularStrategy.of(config, PatternPredictor.of(), KellySizing.of()))
.toList();
portfolio.forEach(item -> trackers.add(StrategyTracker.of(item)));
add(portfolio);
}
@Override
public void onRoundCustom(List<Bet> betList, Spot spot, State state) {
for (StrategyTracker tracker : trackers) {
List<Bet> virtualBets = tracker.lastVirtualBets;
long profit = 0;
if (!virtualBets.isEmpty()) {
long payout = BetHelper.getTotalPayout(virtualBets, spot);
long cost = BetHelper.getTotalBetValue(virtualBets);
profit = payout - cost;
}
((AbstractStrategy) tracker.strategy).onRoundEnd(virtualBets, spot, state);
if (!virtualBets.isEmpty()) {
if (profit > 0) {
tracker.weight *= GROWTH_FACTOR;
tracker.consecutiveLosses = 0;
} else {
tracker.weight *= DECAY_FACTOR;
tracker.consecutiveLosses++;
}
}
if (tracker.weight < MIN_WEIGHT_THRESHOLD) {
tracker.isActive = false;
}
if (!tracker.isActive && profit > 0 && tracker.consecutiveLosses == 0) {
tracker.weight *= 1.1;
if (tracker.weight > RESURRECTION_THRESHOLD) {
tracker.isActive = true;
}
}
tracker.weight = Math.min(tracker.weight, MAX_WEIGHT_CAP);
}
}
@Override
public List<Bet> decide(State state) {
List<Bet> combinedBets = new ArrayList<>();
for (StrategyTracker tracker : trackers) {
((AbstractStrategy) tracker.strategy).setBalance(getBalance());
List<Bet> proposedBets = ((AbstractStrategy) tracker.strategy).decide(state);
tracker.lastVirtualBets = proposedBets;
if (tracker.isActive && !proposedBets.isEmpty()) {
for (Bet bet : proposedBets) {
long scaledValue = (long) (bet.value() * tracker.weight);
if (tracker.consecutiveLosses > 3) {
scaledValue = scaledValue / 2;
}
if (scaledValue >= 1) {
combinedBets.add(new Bet(bet.type(), scaledValue));
}
}
}
}
return mergeAndCheckLimits(combinedBets, state);
}
private List<Bet> mergeAndCheckLimits(List<Bet> rawBets, State state) {
if (rawBets.isEmpty()) return List.of();
Map<BetType, Long> mergedMap = new EnumMap<>(BetType.class);
for (Bet bet : rawBets) {
mergedMap.merge(bet.type(), bet.value(), Long::sum);
}
long totalProposedAmount = mergedMap.values().stream().mapToLong(Long::longValue).sum();
double scalingFactor = 1.0;
long balance = getBalance();
if (totalProposedAmount > balance) {
scalingFactor = (double) balance / totalProposedAmount;
}
if (totalProposedAmount > getConfig().tableLimit()) {
double limitFactor = (double) getConfig().tableLimit() / totalProposedAmount;
scalingFactor = Math.min(scalingFactor, limitFactor);
}
final double finalScale = scalingFactor;
return mergedMap.entrySet().stream()
.map(entry -> {
long val = (long) (entry.getValue() * finalScale);
if (val > getConfig().maxBet()) val = getConfig().maxBet();
return new Bet(entry.getKey(), val);
})
.filter(b -> b.value() >= getConfig().minBet())
.toList();
}
private static class StrategyTracker {
final IStrategy strategy;
double weight = 1.0;
boolean isActive = true;
int consecutiveLosses = 0;
List<Bet> lastVirtualBets = List.of();
public static StrategyTracker of(IStrategy strategy) {
return new StrategyTracker(strategy);
}
StrategyTracker(IStrategy strategy) {
this.strategy = strategy;
}
}
}
```

## com/traderoom/strategy/base/EnhancedMarketRegimeStrategy.java

```java
package com.traderoom.strategy.base;
@AStrategy
public class EnhancedMarketRegimeStrategy extends AbstractRegimeStrategy {
private final IStrategy trendFollowingStrategy;
private final IStrategy meanReversionStrategy;
public EnhancedMarketRegimeStrategy(Config config) {
super(config, RegimeContext.builder()
.trendThreshold(0.65)
.volatilityLowThreshold(6.0)
.build());
trendFollowingStrategy = new ParoliStrategy(config);
meanReversionStrategy = new MeanReversionStrategy(config);
}
@Override
public List<Bet> decide(State state) {
var history = state.getMarketData().getHistory();
int size = history.size();
if (size < historyWindow) {
return List.of();
}
DoubleTriple metrics = calculateMetrics(history.subList(size - historyWindow, size));
double redRate = metrics.getFirst();
boolean isTrendRegime = (redRate >= trendThreshold) || (redRate <= (1.0 - trendThreshold));
IStrategy activeStrategy = isTrendRegime ? trendFollowingStrategy : meanReversionStrategy;
if (activeStrategy instanceof AbstractStrategy bs) {
bs.setBalance(this.getBalance());
}
return ((AbstractStrategy) activeStrategy).decide(state);
}
@Override
protected void onRoundCustom(List<Bet> realBets, Spot outcome, State state) {
updateSubStrategy(trendFollowingStrategy, realBets, outcome, state);
updateSubStrategy(meanReversionStrategy, realBets, outcome, state);
}
private void updateSubStrategy(IStrategy strategy, List<Bet> bets, Spot outcome, State state) {
if (strategy instanceof AbstractStrategy baseStrategy) {
baseStrategy.setBalance(this.getBalance());
baseStrategy.onRoundEnd(bets, outcome, state);
}
}
}
```

## com/traderoom/strategy/base/GlobalManager.java

```java
package com.traderoom.strategy.base;
@AStrategy
public class GlobalManager extends BaseManager {
private static final int ACTIVE_STRATEGIES_COUNT = 3;
private static final int PERFORMANCE_WINDOW = 50;
private final List<ManagedStrategy> pool;
private List<IStrategy> activeStrategies;
public GlobalManager(Config config) {
super(config);
pool = new ArrayList<>();
activeStrategies = new ArrayList<>();
List<IStrategy> portfolioList = Stream.of(GrandMartingaleStrategy.class,
MartingaleStrategy4.class,
EvenOddBalanceStrategy.class,
ColorBalanceStrategy.class,
MartingaleStrategy.class)
.map(item -> create(item, config))
.filter(Optional::isPresent)
.map(Optional::get)
.map(s -> (IStrategy) ModularStrategy.of(config, MultiOrderMarkovPredictor.of(), MartingaleSizing.of()))
.map(s -> (IStrategy) EnsemblePredictionStrategy.of(config))
.peek(item -> pool.add(ManagedStrategy.of(item)))
.toList();
add(portfolioList);
}
@Override
public void onRoundCustom(List<Bet> realBets, Spot spot, State state) {
for (ManagedStrategy managed : pool) {
List<Bet> virtualBets = managed.lastVirtualBets;
long profit = 0;
if (!virtualBets.isEmpty()) {
long payout = BetHelper.getTotalPayout(virtualBets, spot);
long cost = BetHelper.getTotalBetValue(virtualBets);
profit = payout - cost;
}
managed.updateScore(profit, PERFORMANCE_WINDOW);
((AbstractStrategy) managed.strategy).onRoundEnd(virtualBets, spot, state);
}
rebalancePortfolio();
}
private void rebalancePortfolio() {
activeStrategies = pool.stream()
.sorted(Comparator.comparingLong(ManagedStrategy::getScore).reversed())
.limit(ACTIVE_STRATEGIES_COUNT)
.filter(ms -> ms.getScore() > 0)
.map(ms -> ms.strategy)
.toList();
}
@Override
public List<Bet> decide(State state) {
for (ManagedStrategy managed : pool) {
((AbstractStrategy) managed.strategy).setBalance(getBalance());
managed.lastVirtualBets = ((AbstractStrategy) managed.strategy).decide(state);
}
if (activeStrategies.isEmpty()) {
return List.of();
}
List<Bet> combinedBets = new ArrayList<>();
for (IStrategy strategy : activeStrategies) {
ManagedStrategy ms = pool.stream()
.filter(p -> p.strategy == strategy)
.findFirst()
.orElse(null);
if (ms != null && ms.lastVirtualBets != null) {
combinedBets.addAll(ms.lastVirtualBets);
}
}
return mergeBets(combinedBets, state);
}
private List<Bet> mergeBets(List<Bet> rawBets, State state) {
if (rawBets.isEmpty()) return List.of();
Map<BetType, Long> merged = new EnumMap<>(BetType.class);
for (Bet bet : rawBets) {
merged.merge(bet.type(), bet.value(), Long::sum);
}
nettingOpposites(merged, BetType.RED, BetType.BLACK);
nettingOpposites(merged, BetType.EVEN, BetType.ODD);
nettingOpposites(merged, BetType.ONE_TO_EIGHTEEN, BetType.NINETEEN_TO_THIRTY_SIX);
return merged.entrySet().stream()
.filter(e -> e.getValue() > 0)
.map(entry -> {
long value = Math.min(entry.getValue(), getConfig().maxBet());
return new Bet(entry.getKey(), Math.max(value, getConfig().minBet()));
})
.toList();
}
private void nettingOpposites(Map<BetType, Long> map, BetType a, BetType b) {
long valA = map.getOrDefault(a, 0L);
long valB = map.getOrDefault(b, 0L);
if (valA > 0 && valB > 0) {
if (valA > valB) {
map.put(a, valA - valB);
map.remove(b);
} else if (valB > valA) {
map.put(b, valB - valA);
map.remove(a);
} else {
map.remove(a);
map.remove(b);
}
}
}
private static class ManagedStrategy {
final IStrategy strategy;
List<Bet> lastVirtualBets = List.of();
final LinkedList<Long> profitHistory = new LinkedList<>();
long currentScore = 0;
public static ManagedStrategy of(IStrategy strategy) {
return new ManagedStrategy(strategy);
}
ManagedStrategy(IStrategy strategy) {
this.strategy = strategy;
}
void updateScore(long profit, int windowSize) {
profitHistory.add(profit);
currentScore += profit;
if (profitHistory.size() > windowSize) {
currentScore -= profitHistory.removeFirst();
}
}
long getScore() {
return currentScore;
}
}
}
```

## com/traderoom/strategy/base/ModularStrategy.java

```java
package com.traderoom.strategy.base;
public abstract class ModularStrategy extends AbstractStrategy {
private final Predictor predictor;
private final Sizing sizing;
protected ModularStrategy(Config config, Predictor predictor, Sizing sizing) {
super(config, Manager.formatName(predictor, sizing));
this.predictor = predictor;
this.sizing = sizing;
}
public static ModularStrategy of(Config config, Predictor predictor, Sizing sizing) {
return new ModularStrategy(config, predictor, sizing){};
}
@Override
public List<Bet> decide(State state) {
List<SpotPrediction> predictions = predictor.getNextSpot(state, getConfig());
if (predictions.isEmpty()) return List.of();
SpotPrediction bestPrediction = predictions.stream()
.max(Comparator.comparingDouble(SpotPrediction::probability))
.orElse(null);
long amount = sizing.calculate(state, isLastBetWon(state), isLastBet() ? getLastBet() : 0, bestPrediction, getConfig());
long balance = getBalance();
if (amount <= 0 || amount > balance) {
amount = Math.min(amount, balance);
if (amount < getConfig().minBet()) return List.of();
}
return Bet.list(BetHelper.getStraightUp(bestPrediction.spot()), amount);
}
}
```

## com/traderoom/strategy/base/strategies/balance/AbstractBalanceStrategy.java

```java
package com.traderoom.strategy.base.strategies.balance;
public abstract class AbstractBalanceStrategy extends AbstractStrategy {
protected AbstractBalanceStrategy(Config config) {
super(config);
}
protected List<Bet> processBet(BetType first, State state, Supplier<BetType> supplier) {
if (state.getMarketData().getHistory().isEmpty()) {
return create(first, getConfig().minBet(), state);
}
long value = (!isLastBet() || isLastBetWon(state)) ? getConfig().minBet() : getLastBet() * 2;
return create(supplier.get(), value, state);
}
protected List<Bet> create(BetType type, long value, State state) {
long balance = getBalance();
long safeValue = Math.min(value, balance);
if (safeValue <= 0 && balance > 0) {
safeValue = getConfig().minBet();
} else if (safeValue <= 0) {
return List.of();
}
return Bet.list(type, safeValue);
}
}
```

## com/traderoom/strategy/base/strategies/balance/ColorBalanceStrategy.java

```java
package com.traderoom.strategy.base.strategies.balance;
@AStrategy
public class ColorBalanceStrategy extends AbstractBalanceStrategy {
private final double balanceThreshold;
public ColorBalanceStrategy(Config config) {
super(config);
balanceThreshold = 0.45;
}
@Override
public List<Bet> decide(State state) {
return processBet(BetType.RED, state, () -> {
double red = state.getMarketData().getRedRate();
double black = state.getMarketData().getBlackRate();
double total = red + black;
BetType result = BetType.RED;
if (total > 0 && black < total * balanceThreshold) {
result = BetType.BLACK;
}
return result;
});
}
}
```

## com/traderoom/strategy/base/strategies/balance/DistantProgressionBalanceStrategy.java

```java
package com.traderoom.strategy.base.strategies.balance;
@AStrategy
public class DistantProgressionBalanceStrategy extends AbstractBalanceStrategy {
private final List<BetType> targetBetTypes;
public DistantProgressionBalanceStrategy(Config config) {
super(config);
targetBetTypes = List.of(BetType.FIRST_DOZEN, BetType.SECOND_DOZEN, BetType.THIRD_DOZEN);
}
@Override
public List<Bet> decide(State state) {
return processBet(targetBetTypes.getFirst(), state, () -> {
Map<BetType, Long> counters = new EnumMap<>(BetType.class);
for (BetType type : targetBetTypes) {
counters.put(type, 0L);
}
for (var spot : state.getMarketData().getHistory()) {
for (BetType type : targetBetTypes) {
if (type.getWinning().contains(spot)) {
counters.put(type, counters.get(type) + 1);
}
}
}
return counters.entrySet().stream()
.min(Map.Entry.comparingByValue())
.map(Map.Entry::getKey)
.orElse(targetBetTypes.getFirst());
});
}
}
```

## com/traderoom/strategy/base/strategies/balance/EvenOddBalanceStrategy.java

```java
package com.traderoom.strategy.base.strategies.balance;
@AStrategy
public class EvenOddBalanceStrategy extends AbstractBalanceStrategy {
private final double threshold;
public EvenOddBalanceStrategy(Config config) {
super(config);
threshold = 0.45;
}
@Override
public List<Bet> decide(State state) {
return processBet(BetType.EVEN, state, () -> {
long even = 0;
long odd = 0;
for (Map.Entry<Spot, Integer> entry : state.getMarketData().getFrequencies().entrySet()) {
if (entry.getKey().isEven()) {
even += entry.getValue();
} else if (entry.getKey().isOdd()) {
odd += entry.getValue();
}
}
long sum = even + odd;
if (sum == 0) {
return BetType.EVEN;
}
if (even < sum * threshold) {
return BetType.EVEN;
}
if (odd < sum * threshold) {
return BetType.ODD;
}
return BetType.EVEN;
});
}
}
```

## com/traderoom/strategy/base/strategies/BarnetStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class BarnetStrategy extends AbstractStrategy {
private final BetType type = BetType.RED;
private int count;
public BarnetStrategy(Config config) {
super(config);
}
@Override
public List<Bet> decide(State state) {
count = isLastBetWon(state) ? (count + 1) : 0;
long minBet = getConfig().minBet();
return switch (count % 4) {
case 0 -> Bet.list(type, minBet);
case 1 -> Bet.list(type, minBet * 3);
case 2 -> Bet.list(type, minBet * 2);
case 3 -> Bet.list(type, minBet * 6);
default -> throw new IllegalArgumentException();
};
}
}
```

## com/traderoom/strategy/base/strategies/CocomoStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class CocomoStrategy extends AbstractStrategy {
private final BetType type;
private long secondBetValue;
public CocomoStrategy(Config config) {
super(config);
type = BetType.FIRST_DOZEN;
}
public List<Bet> decide(State state) {
long lastValue = getLastBet();
long nextValue = secondBetValue + lastValue;
secondBetValue = lastValue;
long value = isLastBetWon(state) ? getConfig().minBet()
: Math.clamp(nextValue, getConfig().minBet(), getConfig().maxBet());
return Bet.list(type, value);
}
}
```

## com/traderoom/strategy/base/strategies/ColdNumbersStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class ColdNumbersStrategy extends AbstractStrategy {
private final int numberOfColdSpots;
public ColdNumbersStrategy(Config config) {
super(config);
numberOfColdSpots = 5;
}
@Override
public List<Bet> decide(State state) {
if (state.getMarketData().getHistory().isEmpty()) return List.of();
Map<Spot, Integer> frequencies = state.getMarketData().getFrequencies();
List<Spot> spots = Spot.getAvailableList(getConfig().rouletteType()).stream()
.sorted(Comparator.comparingInt(spot -> frequencies.getOrDefault(spot, 0)))
.limit(numberOfColdSpots)
.toList();
long minBet = getConfig().minBet();
return spots.isEmpty() ? List.of() :
spots.stream()
.map(spot -> Bet.of(BetHelper.getStraightUp(spot), minBet))
.toList();
}
}
```

## com/traderoom/strategy/base/strategies/DAlembertStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class DAlembertStrategy extends AbstractStrategy {
private int multiplier;
public DAlembertStrategy(Config config) {
super(config);
multiplier = 1;
}
@Override
public List<Bet> decide(State state) {
if (isLastBet()) {
multiplier = isLastBetWon(state) ? Math.max(1, multiplier - 1) : multiplier + 1;
}
return BettingHelper.createDiversifiedBets(getConfig().minBet() * multiplier, state, getConfig());
}
}
```

## com/traderoom/strategy/base/strategies/EnsemblePredictionStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class EnsemblePredictionStrategy extends AbstractStrategy {
private final Predictor predictor;
private final double probabilityThreshold;
private final double budgetAllocationPerSpot;
private final int limit;
public EnsemblePredictionStrategy(Config config) {
super(config);
predictor = EnsemblePredictor.createDefaultEnsemble();
probabilityThreshold = 0.15;
budgetAllocationPerSpot = 0.01;
limit = 5;
}
public static EnsemblePredictionStrategy of(Config config) {
return new EnsemblePredictionStrategy(config);
}
@Override
public List<Bet> decide(State state) {
List<SpotPrediction> predictions = predictor.getNextSpot(state, getConfig());
if (predictions.isEmpty()) {
return List.of();
}
List<Bet> result = new ArrayList<>(limit);
for (SpotPrediction prediction : predictions) {
boolean eligible = prediction.probability() >= probabilityThreshold;
if (eligible) {
long betValue = (long) (getBalance() * budgetAllocationPerSpot * prediction.probability() * 10);
long safeBetValue = Math.clamp(betValue, getConfig().minBet(), getConfig().maxBet());
eligible = safeBetValue > 0 && safeBetValue <= getBalance();
if (eligible) {
result.add(Bet.of(BetHelper.getStraightUp(prediction.spot()), safeBetValue));
}
}
if (result.size() == limit) {
break;
}
}
return result;
}
}
```

## com/traderoom/strategy/base/strategies/FibonacciStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class FibonacciStrategy extends AbstractStrategy {
private long prev;
private long current;
public FibonacciStrategy(Config config) {
super(config);
resetSequence();
}
@Override
public List<Bet> decide(State state) {
if (isLastBet()) {
if (isLastBetWon(state)) {
long newPrev = Math.max(0, prev - (current - prev));
long newCurrent = prev;
prev = newPrev;
current = newCurrent;
if (current <= 0) {
resetSequence();
}
} else {
long newCurrent = prev + current;
prev = current;
current = newCurrent;
}
}
long betMultiplier = current > 0 ? current : 1;
long totalBetAmount = getConfig().minBet() * betMultiplier;
long safeBetAmount = Math.min(totalBetAmount, getBalance());
if (safeBetAmount < getConfig().minBet()) {
return List.of();
}
return BettingHelper.createDiversifiedBets(safeBetAmount, state, getConfig());
}
private void resetSequence() {
prev = 0;
current = 1;
}
}
```

## com/traderoom/strategy/base/strategies/GapAnalysisStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class GapAnalysisStrategy extends AbstractStrategy {
private static final int GAP_THRESHOLD = 34;
private static final int VIRTUAL_WAIT = 4;
private static final int BET_ATTEMPTS = 6;
private final Map<Spot, Integer> currentGaps;
private final Map<Spot, Integer> trackingWaitCounter;
private final Map<Spot, Integer> bettingAttemptsCounter;
public GapAnalysisStrategy(Config config) {
super(config);
this.currentGaps = new EnumMap<>(Spot.class);
this.trackingWaitCounter = new EnumMap<>(Spot.class);
this.bettingAttemptsCounter = new EnumMap<>(Spot.class);
for (Spot spot : Spot.getAvailableList(config.rouletteType())) {
currentGaps.put(spot, 0);
}
}
@Override
public List<Bet> decide(State state) {
List<Spot> candidates = bettingAttemptsCounter.entrySet().stream()
.filter(entry -> entry.getValue() < BET_ATTEMPTS)
.map(Map.Entry::getKey)
.toList();
if (candidates.isEmpty()) {
return List.of();
}
long balance = getBalance();
long betSize = getConfig().minBet();
List<Bet> bets = new ArrayList<>();
for (Spot spot : candidates) {
if (balance < betSize) break;
bets.add(Bet.of(BetHelper.getStraightUp(spot), betSize));
balance -= betSize;
bettingAttemptsCounter.merge(spot, 1, Integer::sum);
}
return bets;
}
@Override
public void onRoundCustom(List<Bet> bets, Spot outcome, State state) {
List<Spot> allSpots = Spot.getAvailableList(getConfig().rouletteType());
for (Spot spot : allSpots) {
if (spot == outcome) {
currentGaps.put(spot, 0);
trackingWaitCounter.remove(spot);
bettingAttemptsCounter.remove(spot);
} else {
currentGaps.merge(spot, 1, Integer::sum);
processTracking(spot);
}
}
}
private void processTracking(Spot spot) {
int gap = currentGaps.get(spot);
if (gap >= GAP_THRESHOLD) {
if (!trackingWaitCounter.containsKey(spot) && !bettingAttemptsCounter.containsKey(spot)) {
trackingWaitCounter.put(spot, 0);
}
}
if (trackingWaitCounter.containsKey(spot)) {
int waited = trackingWaitCounter.get(spot);
if (waited < VIRTUAL_WAIT) {
trackingWaitCounter.put(spot, waited + 1);
} else {
trackingWaitCounter.remove(spot);
bettingAttemptsCounter.put(spot, 0);
}
}
}
}
```

## com/traderoom/strategy/base/strategies/GoodmanStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class GoodmanStrategy extends AbstractStrategy {
private final BetType type;
private int count;
public GoodmanStrategy(Config config) {
super(config);
type = BetType.RED;
}
@Override
public List<Bet> decide(State state) {
count = isLastBetWon(state) ? (count + 1) : 0;
return switch (count) {
case 0 -> Bet.list(type, getConfig().minBet());
case 1 -> Bet.list(type, getConfig().minBet() * 2);
case 2 -> Bet.list(type, getConfig().minBet() * 3);
default -> Bet.list(type, getConfig().minBet() * 5);
};
}
}
```

## com/traderoom/strategy/base/strategies/HotNumbersStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class HotNumbersStrategy extends AbstractStrategy {
private final int numberOfHotSpotsToBetOn;
public HotNumbersStrategy(Config config) {
super(config);
numberOfHotSpotsToBetOn = 5;
}
@Override
public List<Bet> decide(State state) {
if (state.getMarketData().getHistory().isEmpty()) {
return List.of();
}
Map<Spot, Integer> frequencies = state.getMarketData().getFrequencies();
List<Spot> spots = Spot.getAvailableList(getConfig().rouletteType()).stream()
.sorted(Comparator.comparingInt(spot -> frequencies.getOrDefault(spot, 0)).reversed())
.limit(numberOfHotSpotsToBetOn)
.toList();
return (spots.isEmpty()) ? List.of() :
spots.stream()
.map(spot -> Bet.of(BetHelper.getStraightUp(spot), getConfig().minBet()))
.toList();
}
}
```

## com/traderoom/strategy/base/strategies/hybrid/AbstractHybridPredictorStrategy.java

```java
package com.traderoom.strategy.base.strategies.hybrid;
public abstract class AbstractHybridPredictorStrategy extends AbstractStrategy {
protected final Predictor predictorMarkov;
protected final Predictor predictorCount;
protected final double markov;
protected final double count;
protected final int limit;
protected final double confidence;
protected final double fraction;
protected final int window;
protected final double lowWinRate;
protected final double highWinRate;
protected final int consecutive;
protected final double cautious;
protected double dynamicConfidence;
protected double dynamicFraction;
protected double dynamicMarkov;
protected double dynamicCount;
protected AbstractHybridPredictorStrategy(Config config) {
this(config, HybridContext.of());
}
protected AbstractHybridPredictorStrategy(Config config, HybridContext hContext) {
super(config);
predictorMarkov = hContext.getPredictorMarkov();
predictorCount = hContext.getPredictorCount();
markov = hContext.getMarkov();
count = hContext.getCount();
limit = hContext.getLimit();
confidence = hContext.getConfidence();
fraction = hContext.getFraction();
window = hContext.getWindow();
lowWinRate = hContext.getLowWinRate();
highWinRate = hContext.getHighWinRate();
consecutive = hContext.getConsecutive();
cautious = hContext.getCautious();
dynamicConfidence = confidence;
dynamicFraction = fraction;
dynamicMarkov = markov;
dynamicCount = count;
}
public List<SpotPrediction> getTop(State state) {
return getTop(state, markov, count, confidence);
}
public List<SpotPrediction> getTop(State state, double markov, double count, double confidence) {
return getTop(state, markov, count, confidence, limit);
}
public List<SpotPrediction> getTop(State state, double markov, double count, double confidence, int limit) {
Map<Spot, Double> markovPred = predictorMarkov.getNextSpot(state, getConfig()).stream()
.collect(Collectors.toMap(SpotPrediction::spot, SpotPrediction::probability));
Map<Spot, Double> countPred = predictorCount.getNextSpot(state, getConfig()).stream()
.collect(Collectors.toMap(SpotPrediction::spot, SpotPrediction::probability));
List<Spot> list = Spot.getAvailableList(getConfig().rouletteType());
Map<Spot, Double> collected = list.stream()
.collect(Collectors.toMap(spot -> spot,
spot -> (markovPred.getOrDefault(spot, 0.0) * markov)
+ (countPred.getOrDefault(spot, 0.0) * count)));
return collected.entrySet().stream()
.map(entry -> SpotPrediction.of(entry.getKey(), entry.getValue()))
.filter(item -> item.probability() >= confidence)
.sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
.limit(limit)
.toList();
}
public List<Bet> process(State state, List<SpotPrediction> top, long budget) {
if (budget < getConfig().minBet()) return List.of();
double sum = top.stream()
.mapToDouble(SpotPrediction::probability)
.sum();
if (sum == 0) return List.of();
List<Bet> result = new ArrayList<>(top.size());
for (SpotPrediction item : top) {
long value = (long) (budget * (item.probability() / sum));
long clamp = Math.clamp(value, getConfig().minBet(), getConfig().maxBet());
if (clamp <= getBalance()) {
result.add(Bet.of(BetHelper.getStraightUp(item.spot()), clamp));
}
}
return result;
}
}
```

## com/traderoom/strategy/base/strategies/hybrid/DynamicHybridPredictorStrategy.java

```java
package com.traderoom.strategy.base.strategies.hybrid;
@AStrategy
public class DynamicHybridPredictorStrategy extends AbstractHybridPredictorStrategy {
private final Queue<Boolean> markovSuccess;
private final Queue<Boolean> countSuccess;
public DynamicHybridPredictorStrategy(Config config) {
super(config);
markovSuccess = new LinkedList<>();
countSuccess = new LinkedList<>();
}
@Override
public void onRoundCustom(List<Bet> list, Spot spot, State state) {
updatePredictorPerformance(state, spot);
adjustPredictorWeights();
}
private void updatePredictorPerformance(State state, Spot spot) {
isPredictorCorrect(predictorMarkov, state, spot, markovSuccess);
isPredictorCorrect(predictorCount, state, spot, countSuccess);
}
private void isPredictorCorrect(Predictor predictor, State state, Spot spot, Queue<Boolean> queue) {
Optional<Spot> optional = predictor.getNextSpot(state, getConfig()).stream()
.max(Comparator.comparingDouble(SpotPrediction::probability))
.map(SpotPrediction::spot);
queue.add(optional.isPresent() && optional.get().equals(spot));
if (queue.size() > window) {
queue.poll();
}
}
private void adjustPredictorWeights() {
double markovRate = calculate(markovSuccess);
double countRate = calculate(countSuccess);
double sum = markovRate + countRate;
if (sum > 0) {
dynamicMarkov = markovRate / sum;
dynamicCount = countRate / sum;
}
}
private double calculate(Queue<Boolean> successQueue) {
if (successQueue.isEmpty()) return 0.0;
return (double) Collections.frequency(successQueue, true) / successQueue.size();
}
@Override
public List<Bet> decide(State state) {
List<SpotPrediction> top = getTop(state);
if (top.isEmpty()) return List.of();
return process(state, top, (long) (getBalance() * fraction));
}
}
```

## com/traderoom/strategy/base/strategies/hybrid/HybridContext.java

```java
package com.traderoom.strategy.base.strategies.hybrid;
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class HybridContext {
@Builder.Default
private final Predictor predictorMarkov = new MultiOrderMarkovPredictor();
@Builder.Default
private final Predictor predictorCount = new EfficientCountPredictor();
@Builder.Default
private final double markov = 0.3;
@Builder.Default
private final double count = 0.2;
@Builder.Default
private final int limit = 4;
@Builder.Default
private final double confidence = 0.08;
@Builder.Default
private final double fraction = 0.05;
@Builder.Default
private final int window = 50;
@Builder.Default
private final double lowWinRate = 0.45;
@Builder.Default
private final double highWinRate = 0.60;
@Builder.Default
private final int consecutive = 3;
@Builder.Default
private final double cautious = 0.025;
public static HybridContext of() {
return HybridContext.builder().build();
}
}
```

## com/traderoom/strategy/base/strategies/hybrid/HybridPredictorStrategy.java

```java
package com.traderoom.strategy.base.strategies.hybrid;
@AStrategy
public class HybridPredictorStrategy extends AbstractHybridPredictorStrategy {
private int consecutiveLosses;
public HybridPredictorStrategy(Config config) {
super(config);
}
@Override
public void onRoundCustom(List<Bet> betList, Spot spot, State state) {
consecutiveLosses = isLastBet() && isLastBetWon(state) ? 0 : consecutiveLosses + 1;
}
@Override
public List<Bet> decide(State state) {
List<SpotPrediction> top = getTop(state);
if (top.isEmpty()) return List.of();
double budget = (consecutiveLosses >= consecutive) ? cautious : fraction;
return process(state, top, (long) (getBalance() * budget));
}
}
```

## com/traderoom/strategy/base/strategies/hybrid/SelfTuningHybridStrategy.java

```java
package com.traderoom.strategy.base.strategies.hybrid;
@AStrategy
public class SelfTuningHybridStrategy extends AbstractHybridPredictorStrategy {
public SelfTuningHybridStrategy(Config config) {
super(config);
}
@Override
public List<Bet> decide(State state) {
if (state.getMarketData().getCurrentLoopCount() > 0 && state.getMarketData().getCurrentLoopCount() % window == 0 && getBetCount() > 0) {
adjustParameters();
}
List<SpotPrediction> top = getTop(state, markov, count, dynamicConfidence);
if (top.isEmpty()) return List.of();
long budget = (long) (getBalance() * dynamicFraction);
return process(state, top, budget);
}
private void adjustParameters() {
double average = getAverage();
if (average < lowWinRate) {
dynamicConfidence = Math.min(confidence * 1.25, 0.15);
dynamicFraction = Math.max(fraction * 0.5, 0.01);
} else if (average > highWinRate) {
dynamicConfidence = Math.max(confidence * 0.9, 0.05);
dynamicFraction = Math.min(fraction * 1.1, 0.075);
} else {
if (dynamicConfidence != confidence || dynamicFraction != fraction) {
dynamicConfidence = confidence;
dynamicFraction = fraction;
}
}
setWonCount(0);
setLostCount(0);
setBetCount(0);
}
}
```

## com/traderoom/strategy/base/strategies/kelly/AbstractKellyCriterionStrategy.java

```java
package com.traderoom.strategy.base.strategies.kelly;
@AStrategy
public abstract class AbstractKellyCriterionStrategy extends AbstractStrategy {
protected final double kelly;
protected final double maxBetPercentageCap;
protected final double minProbabilityThreshold;
protected final Predictor predictor;
protected AbstractKellyCriterionStrategy(Config config) {
this(config, KellyContext.of());
}
protected AbstractKellyCriterionStrategy(Config config, KellyContext kContext) {
super(config);
kelly = kContext.getKelly();
maxBetPercentageCap = kContext.getMaxBetPercentageCap();
minProbabilityThreshold = kContext.getMinProbabilityThreshold();
predictor = kContext.getPredictor();
}
protected Optional<KellyBet> calculateKellyFraction(SpotPrediction prediction, double kelly) {
BetType type = BetHelper.getStraightUp(prediction.spot());
double prob = prediction.probability();
double payout = type.getPayout();
if (payout > 0) {
double kellyFraction = (payout * prob - (1 - prob)) / payout;
if (kellyFraction > 0) {
return Optional.of(KellyBet.of(type, kellyFraction * kelly));
}
}
return Optional.empty();
}
}
```

## com/traderoom/strategy/base/strategies/kelly/KellyBet.java

```java
package com.traderoom.strategy.base.strategies.kelly;
public record KellyBet(BetType type, double fraction) {
public static KellyBet of(BetType type, double fraction) {
return new KellyBet(type, fraction);
}
}
```

## com/traderoom/strategy/base/strategies/kelly/KellyContext.java

```java
package com.traderoom.strategy.base.strategies.kelly;
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class KellyContext {
@Builder.Default
private final double kelly = 0.3;
@Builder.Default
private final double maxBetPercentageCap = 0.05;
@Builder.Default
private final double minProbabilityThreshold = 0.028;
@Builder.Default
private final Predictor predictor = new MultiOrderMarkovPredictor();
public static KellyContext of() {
return KellyContext.builder().build();
}
}
```

## com/traderoom/strategy/base/strategies/kelly/KellyCriterionStrategy.java

```java
package com.traderoom.strategy.base.strategies.kelly;
@AStrategy
public class KellyCriterionStrategy extends AbstractKellyCriterionStrategy {
public KellyCriterionStrategy(Config config) {
KellyContext build = KellyContext.builder()
.kelly(0.3)
.build();
super(config, build);
}
@Override
public List<Bet> decide(State state) {
List<SpotPrediction> predictions = predictor.getNextSpot(state, getConfig());
Optional<KellyBet> optional = predictions.stream()
.map(prediction -> calculateKellyFraction(prediction, kelly))
.filter(Optional::isPresent)
.map(Optional::get)
.max(Comparator.comparingDouble(KellyBet::fraction));
if (optional.isPresent()) {
KellyBet kellyBet = optional.get();
long balance = getBalance();
long clamp = Math.clamp((long) (balance * kellyBet.fraction()), getConfig().minBet(), getConfig().maxBet());
if (clamp <= balance || clamp >= getConfig().minBet()) {
return Bet.list(kellyBet.type(), clamp);
}
}
return List.of();
}
}
```

## com/traderoom/strategy/base/strategies/kelly/SaferKellyCriterionStrategy.java

```java
package com.traderoom.strategy.base.strategies.kelly;
@AStrategy
public class SaferKellyCriterionStrategy extends AbstractKellyCriterionStrategy {
public SaferKellyCriterionStrategy(Config config) {
KellyContext build = KellyContext.builder()
.kelly(0.1)
.maxBetPercentageCap(0.05)
.minProbabilityThreshold(0.028)
.build();
super(config, build);
}
@Override
public List<Bet> decide(State state) {
List<SpotPrediction> predictions = predictor.getNextSpot(state, getConfig());
Optional<KellyBet> optional = predictions.stream()
.filter(item -> item.probability() > minProbabilityThreshold)
.map(prediction -> calculateKellyFraction(prediction, kelly))
.filter(Optional::isPresent)
.map(Optional::get)
.max(Comparator.comparingDouble(KellyBet::fraction));
if (optional.isPresent()) {
KellyBet kellyBet = optional.get();
long clamp = clamp(kellyBet.fraction(), state);
if (clamp >= getConfig().minBet()) {
return Bet.list(kellyBet.type(), clamp);
}
}
return List.of();
}
private long clamp(double fraction, State state) {
long balance = getBalance();
if (balance <= 0) {
return 0;
}
double safeFraction = Math.min(fraction, maxBetPercentageCap);
long proposed = (long) (balance * safeFraction);
long clamped = Math.clamp(proposed, getConfig().minBet(), getConfig().maxBet());
return Math.clamp(clamped, 0L, balance);
}
}
```

## com/traderoom/strategy/base/strategies/LabouchereStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class LabouchereStrategy extends AbstractStrategy {
private final BetType type = BetType.RED;
private final LinkedList<Long> sequence = new LinkedList<>();
private final long unit;
public LabouchereStrategy(Config config) {
super(config);
this.unit = Math.max(1, config.minBet());
resetSequence();
}
private void resetSequence() {
sequence.clear();
sequence.add(unit);
sequence.add(unit * 2);
sequence.add(unit * 3);
sequence.add(unit * 4);
}
@Override
public List<Bet> decide(State state) {
if (isLastBet()) {
if (isLastBetWon(state)) {
if (!sequence.isEmpty()) sequence.removeFirst();
if (!sequence.isEmpty()) sequence.removeLast();
} else {
long lostValue = getLastBet();
sequence.addLast(lostValue);
}
}
if (sequence.isEmpty()) {
resetSequence();
}
long betValue;
if (sequence.size() == 1) {
betValue = sequence.getFirst();
} else {
betValue = sequence.getFirst() + sequence.getLast();
}
betValue = Math.min(betValue, getConfig().maxBet());
betValue = Math.min(betValue, getBalance());
return (betValue < getConfig().minBet()) ? List.of() : Bet.list(type, betValue);
}
}
```

## com/traderoom/strategy/base/strategies/MansuriansStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class MansuriansStrategy extends AbstractStrategy {
private final List<BetType> corners;
private final List<BetType> activeCorners;
private int lossStreak;
public MansuriansStrategy(Config config) {
super(config);
activeCorners = new ArrayList<>();
corners = List.of(BetType.CORNER_1_2_4_5, BetType.CORNER_32_33_35_36, BetType.CORNER_0_1_2_3);
}
@Override
public List<Bet> decide(State state) {
if (isLastBetWon(state) || !isLastBet()) {
lossStreak = 0;
activeCorners.clear();
} else {
lossStreak++;
}
int cornersToBetCount = Math.min(lossStreak + 1, 5);
long value = getConfig().minBet() * 5;
if (lossStreak < 3) {
value = getConfig().minBet();
} else if (lossStreak == 3) {
value = getConfig().minBet() * 2;
} else if (lossStreak == 4) {
value = getConfig().minBet() * 3;
}
while (activeCorners.size() < cornersToBetCount) {
findNextAvailableCorner()
.ifPresent(activeCorners::add);
}
List<Bet> bets = new ArrayList<>(activeCorners.size());
for (BetType type : activeCorners) {
bets.add(Bet.of(type, value));
}
return bets;
}
private Optional<BetType> findNextAvailableCorner() {
for (BetType corner : corners) {
if (!activeCorners.contains(corner)) {
return Optional.of(corner);
}
}
return Optional.empty();
}
}
```

## com/traderoom/strategy/base/strategies/martingale/AbstractMartingaleStrategy.java

```java
package com.traderoom.strategy.base.strategies.martingale;
public abstract class AbstractMartingaleStrategy extends AbstractStrategy {
private final List<BetType> types;
private final int size;
private final boolean single;
protected final LongSupplier supplier;
protected AbstractMartingaleStrategy(Config config, BetType type, LongSupplier supplier) {
this(config, List.of(type), supplier);
}
protected AbstractMartingaleStrategy(Config config, List<BetType> types, LongSupplier supplier) {
super(config);
this.supplier = supplier;
this.types = types;
size = types.isEmpty() ? 1 : types.size();
single = size == 1;
}
protected AbstractMartingaleStrategy(Config config) {
this(config, List.of(BetType.RED));
}
protected AbstractMartingaleStrategy(Config config, LongSupplier supplier) {
this(config, List.of(BetType.RED), supplier);
}
protected AbstractMartingaleStrategy(Config config, BetType type) {
this(config, List.of(type));
}
protected AbstractMartingaleStrategy(Config config, List<BetType> types) {
super(config);
this.types = types;
supplier = () -> calculateNext(config);
size = types.isEmpty() ? 1 : types.size();
single = size == 1;
}
@Override
public List<Bet> decide(State state) {
if (single) {
return single(state, getNextBetType(state));
}
return create(state);
}
public BetType getNextBetType(State state) {
return types.isEmpty() ? BetType.RED : types.getFirst();
}
protected long calculateNext(Config config) {
return getLastBet() * 2;
}
protected List<Bet> create(State state) {
List<Bet> bets = new ArrayList<>(size);
for (BetType type : types) {
bets.add(create(state, type, size));
}
return bets;
}
protected List<Bet> single(State state, BetType type) {
return List.of(create(state, type,  1));
}
protected Bet create(State state, BetType type, int divisor) {
long balance = getBalance();
long value = calculate(state);
long safeValue = Math.min(value, balance / divisor);
if (safeValue <= 0 && balance > 0) {
safeValue = getConfig().minBet();
}
return Bet.of(type, safeValue);
}
protected long calculate(State state) {
return (!isLastBet() || isLastBetWon(state)) ? getConfig().minBet() : supplier.getAsLong();
}
}
```

## com/traderoom/strategy/base/strategies/martingale/CappedMartingaleStrategy.java

```java
package com.traderoom.strategy.base.strategies.martingale;
@AStrategy
public class CappedMartingaleStrategy extends AbstractMartingaleStrategy {
private final int maxLossStreak;
private int lossStreak;
public CappedMartingaleStrategy(Config config) {
maxLossStreak = 5;
lossStreak = 0;
super(config);
}
@Override
public List<Bet> decide(State state) {
if (isLastBet()) {
lossStreak = isLastBetWon(state) ? 0 : lossStreak + 1;
}
if (lossStreak >= maxLossStreak || !isLastBet() || isLastBetWon(state)) {
lossStreak = (lossStreak >= maxLossStreak) ? 0 : lossStreak;
}
return create(state);
}
}
```

## com/traderoom/strategy/base/strategies/martingale/EastCoastProgressionStrategy.java

```java
package com.traderoom.strategy.base.strategies.martingale;
@AStrategy
public class EastCoastProgressionStrategy extends AbstractMartingaleStrategy {
public EastCoastProgressionStrategy(Config config) {
super(config, () -> config.minBet() * 2);
}
@Override
protected long calculate(State state) {
long balance = getBalance();
long startBalance = getStartBalance();
return (isLastBetWon(state) && balance > startBalance)
? Math.max((balance - startBalance) / 2, getConfig().minBet())
: supplier.getAsLong();
}
}
```

## com/traderoom/strategy/base/strategies/martingale/GrandMartingaleStrategy.java

```java
package com.traderoom.strategy.base.strategies.martingale;
@AStrategy
public class GrandMartingaleStrategy extends AbstractMartingaleStrategy {
public GrandMartingaleStrategy(Config config) {
super(config);
}
@Override
protected long calculateNext(Config config) {
return (getLastBet() * 2) + config.minBet();
}
}
```

## com/traderoom/strategy/base/strategies/martingale/MartingaleStrategy.java

```java
package com.traderoom.strategy.base.strategies.martingale;
@AStrategy
public class MartingaleStrategy extends AbstractMartingaleStrategy {
public MartingaleStrategy(Config config) {
super(config);
}
}
```

## com/traderoom/strategy/base/strategies/martingale/MartingaleStrategy2.java

```java
package com.traderoom.strategy.base.strategies.martingale;
@AStrategy
public class MartingaleStrategy2 extends AbstractMartingaleStrategy {
public MartingaleStrategy2(Config config) {
super(config, List.of());
}
@Override
public BetType getNextBetType(State state) {
return state.getMarketData().getBlackRate() <= state.getMarketData().getRedRate() ? RED : BLACK;
}
}
```

## com/traderoom/strategy/base/strategies/martingale/MartingaleStrategy3.java

```java
package com.traderoom.strategy.base.strategies.martingale;
@AStrategy
public class MartingaleStrategy3 extends AbstractMartingaleStrategy {
private final Predictor predictor;
public MartingaleStrategy3(Config config) {
super(config, List.of());
predictor = new CountPredictor2();
}
@Override
public BetType getNextBetType(State state) {
ColorPrediction prediction = predictor.getNextColor(state, getConfig());
return prediction.black() <= prediction.red() ? BetType.RED : BetType.BLACK;
}
}
```

## com/traderoom/strategy/base/strategies/martingale/MartingaleStrategy4.java

```java
package com.traderoom.strategy.base.strategies.martingale;
@AStrategy
public class MartingaleStrategy4 extends AbstractMartingaleStrategy {
public MartingaleStrategy4(Config config) {
super(config, List.of(BetType.FIRST_DOZEN, BetType.SECOND_DOZEN));
}
@Override
protected long calculateNext(Config config) {
return getLastBets().getFirst().value() * 3;
}
}
```

## com/traderoom/strategy/base/strategies/martingale/MartingaleStrategy5.java

```java
package com.traderoom.strategy.base.strategies.martingale;
@AStrategy
public class MartingaleStrategy5 extends AbstractMartingaleStrategy {
public MartingaleStrategy5(Config config) {
super(config, List.of(
BetType.STRAIGHT_UP_2,
BetType.STRAIGHT_UP_3,
BetType.STRAIGHT_UP_4,
BetType.STRAIGHT_UP_5,
BetType.STRAIGHT_UP_6,
BetType.STRAIGHT_UP_7,
BetType.STRAIGHT_UP_8,
BetType.STRAIGHT_UP_9,
BetType.STRAIGHT_UP_10,
BetType.STRAIGHT_UP_11,
BetType.STRAIGHT_UP_12,
BetType.STRAIGHT_UP_13,
BetType.STRAIGHT_UP_14,
BetType.STRAIGHT_UP_15,
BetType.STRAIGHT_UP_16,
BetType.STRAIGHT_UP_17,
BetType.STRAIGHT_UP_18,
BetType.STRAIGHT_UP_19,
BetType.STRAIGHT_UP_20,
BetType.STRAIGHT_UP_21,
BetType.STRAIGHT_UP_22,
BetType.STRAIGHT_UP_23,
BetType.STRAIGHT_UP_24,
BetType.STRAIGHT_UP_25,
BetType.STRAIGHT_UP_26,
BetType.STRAIGHT_UP_27,
BetType.STRAIGHT_UP_28,
BetType.STRAIGHT_UP_29,
BetType.STRAIGHT_UP_30,
BetType.STRAIGHT_UP_31,
BetType.STRAIGHT_UP_32,
BetType.STRAIGHT_UP_33,
BetType.STRAIGHT_UP_34,
BetType.STRAIGHT_UP_35,
BetType.STRAIGHT_UP_36
));
}
@Override
protected long calculateNext(Config config) {
return getLastBets().getFirst().value() * 18;
}
}
```

## com/traderoom/strategy/base/strategies/MeanReversionStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class MeanReversionStrategy extends AbstractStrategy {
private final int colorStreakThreshold;
private final double colorRateThreshold;
private final int recentHistoryWindow;
private long multiplayer;
public MeanReversionStrategy(Config config) {
super(config);
multiplayer = 1;
colorStreakThreshold = 4;
colorRateThreshold = 0.70;
recentHistoryWindow = 20;
}
@Override
public List<Bet> decide(State state) {
List<Spot> history = state.getMarketData().getHistory();
if (history.size() < colorStreakThreshold) {
return List.of();
}
var opt = processStreak(history);
if (opt.isEmpty() && history.size() >= recentHistoryWindow) {
opt = recent(state);
if (opt.isEmpty()) {
multiplayer = 1;
return List.of();
}
}
if (opt.isEmpty()) return List.of();
multiplayer = calculate(state);
return create(state, opt.get(), multiplayer);
}
private Optional<BetType> recent(State state) {
if (state.getMarketData().getRedRate() > colorRateThreshold) {
return Optional.of(BetType.BLACK);
} else if (state.getMarketData().getBlackRate() > colorRateThreshold) {
return Optional.of(BetType.RED);
}
return Optional.empty();
}
private Optional<BetType> processStreak(List<Spot> history) {
List<BetType> colors = extractLastColors(history);
Optional<BetType> opt = Optional.empty();
if (colors.size() >= colorStreakThreshold) {
BetType first = colors.get(colors.size() - colorStreakThreshold);
boolean isStreak = true;
for (int i = 1; i < colorStreakThreshold; i++) {
if (colors.get(colors.size() - i) != first) {
isStreak = false;
break;
}
}
if (isStreak) {
opt = Optional.of((first == BetType.RED) ? BetType.BLACK : BetType.RED);
}
}
return opt;
}
private List<BetType> extractLastColors(List<Spot> history) {
List<BetType> types = new ArrayList<>(history.size());
for (Spot spot : history) {
if (spot.isRed()) {
types.add(BetType.RED);
}
if (spot.isBlack()) {
types.add(BetType.BLACK);
}
}
return types;
}
private long calculate(State state) {
long temp = isLastBetWon(state) ? Math.max(1, multiplayer - 1) : multiplayer + 1;
multiplayer = !isLastBet() ? 1 : temp;
return multiplayer;
}
private List<Bet> create(State state, BetType type, long multiplayer) {
long value = getConfig().minBet() * multiplayer;
value = Math.min(value, getBalance());
value = Math.min(value, getConfig().maxBet());
return (value < getConfig().minBet()) ? List.of() : Bet.list(type, value);
}
}
```

## com/traderoom/strategy/base/strategies/MonteCarloStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class MonteCarloStrategy extends AbstractStrategy {
private final BetType type;
private final LinkedList<Integer> numbers;
public MonteCarloStrategy(Config config) {
super(config);
numbers = new LinkedList<>();
type = BetType.FIRST_DOZEN;
}
@Override
public List<Bet> decide(State state) {
if (numbers.isEmpty()) {
numbers.addLast(1);
numbers.addLast(2);
numbers.addLast(3);
}
int multiplier = numbers.getFirst() + numbers.getLast();
if (isLastBetWon(state)) {
for (int i = 0; i < 2; i++) {
if (!numbers.isEmpty()) {
numbers.removeFirst();
}
}
for (int i = 0; i < 2; i++) {
if (!numbers.isEmpty()) {
numbers.removeLast();
}
}
} else if (isLastBet()) {
numbers.addLast(multiplier);
}
if (numbers.size() <= 1) {
numbers.clear();
numbers.addLast(1);
numbers.addLast(2);
numbers.addLast(3);
}
return Bet.list(type, getConfig().minBet() * multiplier);
}
}
```

## com/traderoom/strategy/base/strategies/MultiBetStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class MultiBetStrategy extends AbstractStrategy {
private final Predictor predictor;
public MultiBetStrategy(Config config) {
super(config);
predictor = new MultiOrderMarkovPredictor();
}
@Override
public List<Bet> decide(State state) {
final long limit = Math.min(Math.max(getBalance(), getConfig().startBalance()) / 10, getConfig().maxBet());
return predictor.getNextType(state, getConfig()).stream()
.filter(pred -> pred.probability() > 0.3)
.map(pred -> Bet.of(pred.type(), Math.max(getConfig().minBet(), (long) (limit * pred.probability()))))
.toList();
}
}
```

## com/traderoom/strategy/base/strategies/NeighborAnalysisStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class NeighborAnalysisStrategy extends AbstractStrategy {
private final int neighborDistanceThreshold;
private final int historyForTrendAnalysis;
public NeighborAnalysisStrategy(Config config) {
super(config);
neighborDistanceThreshold = 3;
historyForTrendAnalysis = 10;
}
@Override
public List<Bet> decide(State state) {
List<Spot> history = state.getMarketData().getHistory();
if (history.size() < 2) {
return List.of();
}
if (neighbor(state, history) > 0.5) {
return nextInternal(state, history.getLast());
}
return List.of();
}
private double neighbor(State state, List<Spot> history) {
long neighborHits = 0;
int window = Math.min(history.size() - 1, historyForTrendAnalysis);
for (int i = 0; i < window; i++) {
Spot cur = history.get(history.size() - 1 - i);
Spot prev = history.get(history.size() - 2 - i);
try {
if (cur.getPhysicalDistance(prev, getConfig().rouletteType()) <= neighborDistanceThreshold) {
neighborHits++;
}
} catch (IllegalArgumentException e) {
continue;
}
}
return (double) neighborHits / window;
}
private List<Bet> nextInternal(State state, Spot last) {
List<Bet> bets = new ArrayList<>();
RouletteType rType = getConfig().rouletteType();
Spot[] spots = Spot.getWheelLayouts().get(rType);
if (spots == null) {
return List.of();
}
int position = last.getWheelPosition(rType);
if (position == -1) {
return List.of();
}
bets.add(Bet.of(BetHelper.getStraightUp(last), getConfig().minBet()));
for (int i = 1; i <= neighborDistanceThreshold; i++) {
Spot left = spots[(position - i + spots.length) % spots.length];
if (left.getWheelPosition(rType) != -1) {
bets.add(Bet.of(BetHelper.getStraightUp(left), getConfig().minBet()));
}
Spot right = spots[(position + i) % spots.length];
if (right.getWheelPosition(rType) != -1 && !left.equals(right)) {
bets.add(Bet.of(BetHelper.getStraightUp(right), getConfig().minBet()));
}
}
return bets;
}
}
```

## com/traderoom/strategy/base/strategies/NeighborStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class NeighborStrategy extends AbstractStrategy {
private final double minProbabilityThreshold;
private final Map<Integer, Set<Spot>> groups;
private final Predictor predictor;
public NeighborStrategy(Config config) {
super(config);
minProbabilityThreshold = 0.1;
predictor = new MultiOrderMarkovPredictor();
groups = Map.of(1, EnumSet.of(SPOT_32, SPOT_15, SPOT_19, SPOT_04, SPOT_21, SPOT_02, SPOT_25, SPOT_17, SPOT_34),
2, EnumSet.of(SPOT_06, SPOT_27, SPOT_13, SPOT_36, SPOT_11, SPOT_30, SPOT_08, SPOT_23, SPOT_10),
3, EnumSet.of(SPOT_05, SPOT_24, SPOT_16, SPOT_33, SPOT_01, SPOT_20, SPOT_14, SPOT_31, SPOT_09),
4, EnumSet.of(SPOT_22, SPOT_18, SPOT_29, SPOT_07, SPOT_28, SPOT_12, SPOT_35, SPOT_03, SPOT_26, SPOT_0));
}
@Override
public List<Bet> decide(State state) {
if (getConfig().rouletteType() != RouletteType.EUROPEAN) {
return List.of();
}
Map<Integer, Double> group = HashMap.newHashMap(10);
group.put(1, 0.0);
group.put(2, 0.0);
group.put(3, 0.0);
group.put(4, 0.0);
for (SpotPrediction prediction : predictor.getNextSpot(state, getConfig())) {
for (Map.Entry<Integer, Set<Spot>> entry : groups.entrySet()) {
if (entry.getValue().contains(prediction.spot())) {
group.merge(entry.getKey(), prediction.probability(), Double::sum);
break;
}
}
}
Map.Entry<Integer, Double> maxEntry = group.entrySet().stream()
.max(Map.Entry.comparingByValue())
.orElseThrow(() -> new IllegalStateException("No probabilities calculated"));
if (maxEntry.getValue() < minProbabilityThreshold) {
return List.of();
}
return groups.get(maxEntry.getKey()).stream()
.map(spot -> Bet.of(BetHelper.getStraightUp(spot), getConfig().minBet()))
.toList();
}
}
```

## com/traderoom/strategy/base/strategies/OneThreeTwoSixStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class OneThreeTwoSixStrategy extends AbstractStrategy {
private final BetType type = BetType.BLACK;
private int level;
public OneThreeTwoSixStrategy(Config config) {
super(config);
level = 0;
}
@Override
public List<Bet> decide(State state) {
if (isLastBet()) {
if (isLastBetWon(state)) {
level++;
if (level > 3) {
level = 0;
}
} else {
level = 0;
}
}
long base = getConfig().minBet();
long multiplier = switch (level) {
case 1 -> 3;
case 2 -> 2;
case 3 -> 6;
default -> 1;
};
long amount = base * multiplier;
amount = Math.min(amount, getBalance());
return (amount < base) ? List.of() : Bet.list(type, amount);
}
}
```

## com/traderoom/strategy/base/strategies/OscarsGrindStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class OscarsGrindStrategy extends AbstractStrategy {
private final BetType type = BetType.RED;
private long currentUnit;
private long cycleTargetBalance;
public OscarsGrindStrategy(Config config) {
super(config);
resetCycle(config.startBalance());
}
private void resetCycle(long currentBalance) {
currentUnit = getConfig().minBet();
cycleTargetBalance = currentBalance + currentUnit;
}
@Override
public List<Bet> decide(State state) {
long balance = getBalance();
if (isLastBet()) {
if (balance >= cycleTargetBalance) {
resetCycle(balance);
} else {
if (isLastBetWon(state)) {
long debt = cycleTargetBalance - balance;
currentUnit = Math.min(getLastBet() + getConfig().minBet(), debt + getConfig().minBet());
long nextPotential = getLastBet() + getConfig().minBet();
long neededToClose = cycleTargetBalance - balance;
currentUnit = Math.min(nextPotential, neededToClose);
} else {
currentUnit = getLastBet();
}
}
} else {
resetCycle(balance);
}
currentUnit = Math.clamp(currentUnit, getConfig().minBet(), getConfig().maxBet());
currentUnit = Math.min(currentUnit, balance);
return (currentUnit < getConfig().minBet()) ? List.of() : Bet.list(type, currentUnit);
}
}
```

## com/traderoom/strategy/base/strategies/ParoliStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class ParoliStrategy extends AbstractStrategy {
private static final int MAX_PROGRESSION_LEVEL = 3;
private final BetType type;
private int current;
public ParoliStrategy(Config config) {
super(config);
type = BetType.BLACK;
}
@Override
public List<Bet> decide(State state) {
int temp = (current < MAX_PROGRESSION_LEVEL) ? current + 1 : 0;
current = (!isLastBet() || !isLastBetWon(state)) ? 0 : temp;
long min = getConfig().minBet();
long balance = getBalance();
if (balance < min) {
return List.of();
}
long attempted = min * (long) Math.pow(2, current);
long clamp = Math.clamp(attempted, min, balance);
return Bet.list(type, clamp);
}
}
```

## com/traderoom/strategy/base/strategies/PatternStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class PatternStrategy extends AbstractStrategy {
private final double probability;
private final int max;
private final double fraction;
private final double multiplier;
private final Predictor predictor;
public PatternStrategy(Config config) {
super(config);
predictor = new PatternPredictor();
probability = 0.02;
max = 5;
fraction = 0.1;
multiplier = 2.0;
}
@Override
public List<Bet> decide(State state) {
long total = (long) Math.min(Math.max(getBalance(), getConfig().startBalance()) * fraction, getConfig().maxBet());
if (total < getConfig().minBet()) {
return List.of();
}
List<SpotPrediction> spot = predictor.getNextSpot(state, getConfig());
if (spot.isEmpty()) {
return List.of();
}
List<Bet> bets = extract(state, spot, total);
return (bets.isEmpty()) ? Bet.list(BetHelper.getStraightUp(spot.getFirst().spot()), getConfig().minBet()) : bets;
}
private List<Bet> extract(State state, List<SpotPrediction> predictions, long total) {
List<SpotPrediction> sortedPredictions = new ArrayList<>(predictions);
sortedPredictions.sort(Comparator.comparingDouble(SpotPrediction::probability).reversed());
List<Bet> bets = new ArrayList<>(max);
long budget = 0;
long minBet = getConfig().minBet();
for (SpotPrediction item : sortedPredictions) {
if (budget >= total || bets.size() >= max) {
break;
}
long remaining = total - budget;
if (remaining < minBet) {
break;
}
if (item.probability() >= probability) {
long calculatedValue = (long) (total * item.probability() * multiplier);
long betValue = Math.clamp(calculatedValue, minBet, remaining);
budget += betValue;
bets.add(Bet.of(BetHelper.getStraightUp(item.spot()), betValue));
}
}
return bets;
}
}
```

## com/traderoom/strategy/base/strategies/PivotStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class PivotStrategy extends AbstractStrategy {
private Spot currentPivot;
private int betsPlacedOnPivot;
private final List<Spot> observationBuffer;
public PivotStrategy(Config config) {
super(config);
observationBuffer = new ArrayList<>();
currentPivot = null;
betsPlacedOnPivot = 0;
}
@Override
public List<Bet> decide(State state) {
Spot lastSpot = state.getMarketData().getLastSpot();
if (currentPivot != null) {
if (lastSpot == currentPivot) {
currentPivot = null;
betsPlacedOnPivot = 0;
observationBuffer.clear();
observationBuffer.add(lastSpot);
} else {
betsPlacedOnPivot++;
if (betsPlacedOnPivot >= 35) {
currentPivot = null;
betsPlacedOnPivot = 0;
}
}
}
if (currentPivot == null && lastSpot != null) {
if (observationBuffer.contains(lastSpot)) {
currentPivot = lastSpot;
betsPlacedOnPivot = 0;
observationBuffer.clear();
} else {
observationBuffer.add(lastSpot);
if (observationBuffer.size() > 100) {
observationBuffer.removeFirst();
}
}
}
if (currentPivot != null) {
long value = getConfig().minBet();
if (value > getBalance()) return List.of();
return Bet.list(BetHelper.getStraightUp(currentPivot), value);
}
return List.of();
}
}
```

## com/traderoom/strategy/base/strategies/QLearningAgentStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class QLearningAgentStrategy extends AbstractStrategy {
private enum Action {BET_RED, BET_BLACK, WAIT}
private record QState(Color last, int streak, int level) {
static QState of(Color last, int streak, int level) {
return new QState(last, streak, level);
}
}
private final Map<QState, Map<Action, Double>> qTable;
private final Random random;
private final double learningRate;
private final double discountFactor;
private final double explorationRate;
private QState lastState;
private Action lastAction;
public QLearningAgentStrategy(Config config) {
super(config);
qTable = new HashMap<>();
random = new Random();
learningRate = 0.1;
discountFactor = 0.9;
explorationRate = 0.1;
}
@Override
public void onRoundCustom(List<Bet> betList, Spot spot, State state) {
if (lastState == null || lastAction == null) {
return;
}
double reward = (isLastBetWon(state) ? 1.0 : -1.0);
reward = isLastBet() ? reward : 0;
Map<Action, Double> oldActionValues = qTable.computeIfAbsent(lastState, _ -> new HashMap<>());
double oldQValue = oldActionValues.getOrDefault(lastAction, 0.0);
double maxNextQValue = qTable.getOrDefault(getCurrentState(state), Collections.emptyMap()).values().stream()
.max(Double::compare).orElse(0.0);
double newQValue = oldQValue + learningRate * (reward + discountFactor * maxNextQValue - oldQValue);
oldActionValues.put(lastAction, newQValue);
}
@Override
public List<Bet> decide(State state) {
lastState = getCurrentState(state);
lastAction = (random.nextDouble() < explorationRate) ? Action.values()[random.nextInt(Action.values().length)] : getBestAction(lastState);
return switch (lastAction) {
case BET_RED -> createBet(BetType.RED, getConfig().minBet(), state);
case BET_BLACK -> createBet(BetType.BLACK, getConfig().minBet(), state);
case WAIT -> List.of();
};
}
private Action getBestAction(QState state) {
Map<Action, Double> actions = qTable.getOrDefault(state, Collections.emptyMap());
return actions.entrySet().stream()
.max(Map.Entry.comparingByValue())
.map(Map.Entry::getKey)
.orElse(Action.WAIT);
}
private QState getCurrentState(State state) {
if (state.getMarketData().getHistory().isEmpty()) {
return QState.of(Color.GREEN, 0, getBalanceLevel(state));
}
List<Spot> history = state.getMarketData().getHistory();
Spot lastSpot = history.getLast();
Color lastColor = getSpotColor(lastSpot);
int streak = 1;
for (int i = history.size() - 2; i >= 0; i--) {
if (getSpotColor(history.get(i)) == lastColor) streak++;
else break;
}
return QState.of(lastColor, Math.min(streak, 5), getBalanceLevel(state));
}
private int getBalanceLevel(State state) {
double ratio = getBalance() / (double) getConfig().startBalance();
if (ratio < 0.5) return 0;
if (ratio < 1.5) return 1;
return 2;
}
private Color getSpotColor(Spot spot) {
if (spot.isRed()) return Color.RED;
if (spot.isBlack()) return Color.BLACK;
return Color.GREEN;
}
private List<Bet> createBet(BetType type, long value, State state) {
long safeValue = Math.min(value, getBalance());
return (safeValue < getConfig().minBet()) ? List.of() : Bet.list(type, safeValue);
}
}
```

## com/traderoom/strategy/base/strategies/RandomStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class RandomStrategy extends AbstractStrategy {
public RandomStrategy(Config config) {
super(config);
}
@Override
public List<Bet> decide(State state) {
List<Bet> betList = new ArrayList<>();
List<BetType> betTypeList = BetType.getAvailableList(getConfig().rouletteType());
for (int i = 0; i < Constants.RANDOM.nextInt(100); i++) {
BetType type = betTypeList.get(Constants.RANDOM.nextInt(betTypeList.size()));
betList.add(Bet.of(type,getConfig().minBet() * (Constants.RANDOM.nextInt(10) + 1)));
}
return betList;
}
}
```

## com/traderoom/strategy/base/strategies/RandomStrategy2.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class RandomStrategy2 extends AbstractStrategy {
private static final int SIZE = 10;
public RandomStrategy2(Config config) {
super(config);
}
@Override
public List<Bet> decide(State state) {
List<Bet> betList = new ArrayList<>();
List<BetType> betTypeList = BetType.getAvailableList(getConfig().rouletteType());
if (isLastBetWon(state)) {
for (Bet bet : getLastBets()) {
if (BetHelper.isWin(bet, state.getMarketData().getLastSpot())) {
betList.add(bet);
}
}
}
while (betList.size() < SIZE) {
BetType type = betTypeList.get(Constants.RANDOM.nextInt(betTypeList.size()));
int multiplier = Constants.RANDOM.nextInt(10) + 1;
betList.add(Bet.of(type,getConfig().minBet() * multiplier));
}
return betList;
}
}
```

## com/traderoom/strategy/base/strategies/Rate9848PercentStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class Rate9848PercentStrategy extends AbstractStrategy {
public Rate9848PercentStrategy(Config config) {
super(config);
}
@Override
public List<Bet> decide(State state) {
if (3 <= state.getMarketData().getHistory().size()) {
Spot spot1 = state.getMarketData().getHistory().get(state.getMarketData().getHistory().size() - 3);
Spot spot2 = state.getMarketData().getHistory().get(state.getMarketData().getHistory().size() - 2);
Spot spot3 = state.getMarketData().getHistory().getLast();
if (spot1.isFirstDozenOrZeroAndDoubleZero()
&& spot2.isFirstDozenOrZeroAndDoubleZero()
&& spot3.isFirstDozenOrZeroAndDoubleZero()) {
var lastBets = getLastBets();
long value = (lastBets != null && !lastBets.isEmpty()) ? lastBets.getFirst().value() * 2 : getConfig().minBet();
return List.of(Bet.of(BetType.SECOND_DOZEN, value), Bet.of(BetType.THIRD_DOZEN, value));
}
}
return List.of();
}
}
```

## com/traderoom/strategy/base/strategies/Rate9946PercentStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class Rate9946PercentStrategy extends AbstractStrategy {
public Rate9946PercentStrategy(Config config) {
super(config);
}
@Override
public List<Bet> decide(State state) {
if (4 <= state.getMarketData().getHistory().size()) {
Spot spot1 = state.getMarketData().getHistory().get(state.getMarketData().getHistory().size() - 4);
Spot spot2 = state.getMarketData().getHistory().get(state.getMarketData().getHistory().size() - 3);
Spot spot3 = state.getMarketData().getHistory().get(state.getMarketData().getHistory().size() - 2);
Spot spot4 = state.getMarketData().getHistory().getLast();
if (spot1.isFirstDozenOrZeroAndDoubleZero()
&& spot2.isFirstDozenOrZeroAndDoubleZero()
&& spot3.isFirstDozenOrZeroAndDoubleZero()
&& spot4.isFirstDozenOrZeroAndDoubleZero()) {
return List.of(Bet.of(BetType.SECOND_DOZEN, getConfig().minBet()), Bet.of(BetType.THIRD_DOZEN, getConfig().minBet()));
}
}
return List.of();
}
}
```

## com/traderoom/strategy/base/strategies/RegimeSwitchingStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class RegimeSwitchingStrategy extends AbstractStrategy {
private enum Mode { TREND, MEAN_REVERSION, NEUTRAL }
private Mode currentMode = Mode.NEUTRAL;
private double trendScore = 0;
private double meanRevScore = 0;
private final List<Spot> hotCandidates = new ArrayList<>();
private final List<Spot> coldCandidates = new ArrayList<>();
public RegimeSwitchingStrategy(Config config) {
super(config);
}
@Override
public List<Bet> decide(State state) {
analyzeMarket(state);
long betValue = getConfig().minBet();
List<Bet> bets = new ArrayList<>();
if (currentMode == Mode.TREND) {
hotCandidates.forEach(s -> bets.add(Bet.of(BetHelper.getStraightUp(s), betValue)));
} else if (currentMode == Mode.MEAN_REVERSION) {
coldCandidates.forEach(s -> bets.add(Bet.of(BetHelper.getStraightUp(s), betValue)));
}
return bets;
}
@Override
protected void onRoundCustom(List<Bet> bets, Spot outcome, State state) {
boolean trendWin = hotCandidates.contains(outcome);
boolean meanRevWin = coldCandidates.contains(outcome);
trendScore = (trendScore * 0.95) + (trendWin ? 1.0 : -0.05);
meanRevScore = (meanRevScore * 0.95) + (meanRevWin ? 1.0 : -0.05);
if (trendScore > meanRevScore + 0.5 && trendScore > 0) {
currentMode = Mode.TREND;
} else if (meanRevScore > trendScore + 0.5 && meanRevScore > 0) {
currentMode = Mode.MEAN_REVERSION;
} else if (trendScore < 0 && meanRevScore < 0) {
currentMode = Mode.NEUTRAL;
}
}
private void analyzeMarket(State state) {
List<Spot> history = state.getMarketData().getHistory();
if (history.isEmpty()) return;
Map<Spot, Integer> freq = state.getMarketData().getFrequencies();
hotCandidates.clear();
coldCandidates.clear();
freq.entrySet().stream()
.sorted(Map.Entry.<Spot, Integer>comparingByValue().reversed())
.limit(3)
.forEach(e -> hotCandidates.add(e.getKey()));
freq.entrySet().stream()
.filter(e -> e.getValue() > 0)
.sorted(Map.Entry.comparingByValue())
.limit(3)
.forEach(e -> coldCandidates.add(e.getKey()));
}
}
```

## com/traderoom/strategy/base/strategies/regime/AbstractRegimeStrategy.java

```java
package com.traderoom.strategy.base.strategies.regime;
public abstract class AbstractRegimeStrategy extends AbstractStrategy {
protected final int historyWindow;
protected final double trendThreshold;
protected final double volatilityLowThreshold;
protected final int trendStreak;
protected final int alternatingStreak;
protected AbstractRegimeStrategy(Config config) {
this(config, RegimeContext.of());
}
protected AbstractRegimeStrategy(Config config, RegimeContext rContext) {
super(config);
historyWindow = rContext.getHistoryWindow();
trendThreshold = rContext.getTrendThreshold();
volatilityLowThreshold = rContext.getVolatilityLowThreshold();
trendStreak = rContext.getTrendStreak();
alternatingStreak = rContext.getAlternatingStreak();
}
protected DoubleTriple calculateMetrics(List<Spot> list) {
int n = list.size();
if (n == 0) return DoubleTriple.of();
double sum = 0;
double count = 0;
for (Spot spot : list) {
sum += spot.getNumber();
if (spot.isRed()) count++;
}
double mean = sum / n;
double rate = count / n;
double diff = 0;
for (Spot spot : list) {
diff += Math.pow(spot.getNumber() - mean, 2);
}
return DoubleTriple.of(rate, Math.sqrt(diff / n), mean);
}
}
```

## com/traderoom/strategy/base/strategies/regime/DoubleTriple.java

```java
package com.traderoom.strategy.base.strategies.regime;
@Getter
public class DoubleTriple {
private final double first;
private final double second;
private final double third;
public DoubleTriple(double first, double second, double third) {
this.first = first;
this.second = second;
this.third = third;
}
public static DoubleTriple of(double first, double second, double third) {
return new DoubleTriple(first, second, third);
}
public static DoubleTriple of() {
return new DoubleTriple(0.0, 0.0, 0.0);
}
}
```

## com/traderoom/strategy/base/strategies/regime/GameRegimeStrategy.java

```java
package com.traderoom.strategy.base.strategies.regime;
@AStrategy
public class GameRegimeStrategy extends AbstractRegimeStrategy {
public GameRegimeStrategy(Config config) {
RegimeContext build = RegimeContext.builder()
.trendStreak(3)
.alternatingStreak(4)
.build();
super(config, build);
}
@Override
public List<Bet> decide(State state) {
if (state.getMarketData().getHistory().size() < alternatingStreak) {
return List.of();
}
Regime currentRegime = detectRegime(state);
return switch (currentRegime) {
case TREND -> handleTrendRegime(state);
case ALTERNATING -> handleAlternatingRegime(state);
default -> List.of();
};
}
private Regime detectRegime(State state) {
List<Spot> history = state.getMarketData().getHistory();
int size = history.size();
Optional<Regime> optional = detectTrend(history, size);
if (optional.isPresent()) return optional.get();
optional = detectAlternating(history, size);
return optional.orElse(Regime.CHAOS);
}
private Optional<Regime> detectTrend(List<Spot> history, int size) {
if (size >= trendStreak) {
Spot last = history.getLast();
boolean isTrend = true;
for (int i = 1; i < trendStreak; i++) {
if (history.get(size - 1 - i).isRed() != last.isRed()
|| history.get(size - 1 - i).isBlack() != last.isBlack()) {
isTrend = false;
break;
}
}
if (isTrend && !last.isGreen()) {
return Optional.of(Regime.TREND);
}
}
return Optional.empty();
}
private Optional<Regime> detectAlternating(List<Spot> history, int size) {
if (size >= alternatingStreak) {
boolean isAlternating = true;
for (int i = 0; i < alternatingStreak - 1; i++) {
Spot s1 = history.get(size - 1 - i);
Spot s2 = history.get(size - 2 - i);
if (s1.isGreen() || s2.isGreen() || (s1.isRed() == s2.isRed())) {
isAlternating = false;
break;
}
}
if (isAlternating) {
return Optional.of(Regime.ALTERNATING);
}
}
return Optional.empty();
}
private List<Bet> handleTrendRegime(State state) {
if (state.getMarketData().getLastSpot() == null) return List.of();
BetType betType = state.getMarketData().getLastSpot().isRed() ? BetType.RED : BetType.BLACK;
long betValue = isLastBetWon(state) ? getLastBet() + getConfig().minBet() : getConfig().minBet();
return create(betType, betValue, state);
}
private List<Bet> handleAlternatingRegime(State state) {
if (state.getMarketData().getLastSpot() == null) return List.of();
BetType betType = state.getMarketData().getLastSpot().isRed() ? BetType.BLACK : BetType.RED;
return create(betType, getConfig().minBet(), state);
}
private List<Bet> create(BetType type, long value, State state) {
long safeValue = Math.min(value, getBalance());
safeValue = Math.min(safeValue, getConfig().maxBet());
if (safeValue < getConfig().minBet()) return List.of();
return Bet.list(type, safeValue);
}
}
```

## com/traderoom/strategy/base/strategies/regime/MarketRegimeStrategy.java

```java
package com.traderoom.strategy.base.strategies.regime;
@AStrategy
public class MarketRegimeStrategy extends AbstractRegimeStrategy {
public MarketRegimeStrategy(Config config) {
RegimeContext build = RegimeContext.builder()
.trendThreshold(0.70)
.volatilityLowThreshold(6.0)
.build();
super(config, build);
}
@Override
public List<Bet> decide(State state) {
int size = state.getMarketData().getHistory().size();
if (size < historyWindow) {
return List.of();
}
DoubleTriple triple = calculateMetrics(state.getMarketData().getHistory().subList(size - historyWindow, size));
Regime regime = determineRegime(triple.getFirst(), triple.getSecond());
return applyTactic(regime, state);
}
private Regime determineRegime(double redRate, double volatility) {
if (redRate >= trendThreshold) {
return Regime.RED_TREND;
}
if (redRate <= (1.0 - trendThreshold)) {
return Regime.BLACK_TREND;
}
if (volatility < volatilityLowThreshold) {
return Regime.LOW_VOLATILITY;
}
return Regime.CHAOS;
}
private List<Bet> applyTactic(Regime regime, State state) {
return switch (regime) {
case RED_TREND -> create(BetType.RED, state);
case BLACK_TREND -> create(BetType.BLACK, state);
case LOW_VOLATILITY -> {
Spot last = state.getMarketData().getLastSpot();
assert last != null;
if (last.isFirstDozen()) yield create(BetType.FIRST_DOZEN, state);
if (last.isSecondDozen()) yield create(BetType.SECOND_DOZEN, state);
yield create(BetType.THIRD_DOZEN, state);
}
case CHAOS, TREND, ALTERNATING, SLEEPING -> List.of();
};
}
private List<Bet> create(BetType type, State state) {
long value = getConfig().minBet();
if (isLastBet() && !isLastBetWon(state)) {
value = getLastBet() * 2;
}
long safeValue  = Math.min(Math.min(value, getBalance()), getConfig().maxBet());
return (safeValue < getConfig().minBet()) ? List.of() : Bet.list(type, safeValue);
}
}
```

## com/traderoom/strategy/base/strategies/regime/Regime.java

```java
package com.traderoom.strategy.base.strategies.regime;
public enum Regime {
RED_TREND,
BLACK_TREND,
LOW_VOLATILITY,
TREND, ALTERNATING, SLEEPING,
CHAOS
}
```

## com/traderoom/strategy/base/strategies/regime/RegimeContext.java

```java
package com.traderoom.strategy.base.strategies.regime;
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RegimeContext {
@Builder.Default
private final int historyWindow = 15;
@Builder.Default
private final double trendThreshold = 0.70;
@Builder.Default
private final double volatilityLowThreshold = 6.0;
@Builder.Default
private final int trendStreak = 3;
@Builder.Default
private final int alternatingStreak = 4;
public static RegimeContext of() {
return RegimeContext.builder().build();
}
}
```

## com/traderoom/strategy/base/strategies/RepeatingColorPatternStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class RepeatingColorPatternStrategy extends AbstractStrategy {
private static final int MIN_HISTORY_FOR_PATTERN = 5;
private static final int PATTERN_LENGTH = 3;
public RepeatingColorPatternStrategy(Config config) {
super(config);
}
@Override
public List<Bet> decide(State state) {
if (state.getMarketData().getHistory().size() < MIN_HISTORY_FOR_PATTERN) {
return List.of();
}
List<Color> colorHistory = new ArrayList<>(state.getMarketData().getHistory().size());
for (Spot spot : state.getMarketData().getHistory()) {
if (spot.isRed()) colorHistory.add(Color.RED);
if (spot.isBlack()) colorHistory.add(Color.BLACK);
if (spot.isGreen()) colorHistory.add(Color.GREEN);
}
if (colorHistory.size() < MIN_HISTORY_FOR_PATTERN) {
return List.of();
}
return findColorPattern(colorHistory).map(betType -> createBet(betType, state))
.orElseGet(List::of);
}
public Optional<BetType> findColorPattern(List<Color> colorHistory) {
Optional<BetType> repeatingPatternBet = checkForRepeatingPattern(colorHistory);
if (repeatingPatternBet.isPresent()) {
return repeatingPatternBet;
}
if (colorHistory.size() >= 2) {
Color lastColor = colorHistory.getLast();
Color secondToLastColor = colorHistory.get(colorHistory.size() - 2);
if (lastColor != Color.GREEN && secondToLastColor != Color.GREEN) {
return getOppositeColorBet(lastColor);
}
}
return Optional.empty();
}
private Optional<BetType> checkForRepeatingPattern(List<Color> history) {
int requiredSize = PATTERN_LENGTH * 2 + 1;
if (history.size() < requiredSize) {
return Optional.empty();
}
int size = history.size();
int previousPatternStart = size - (PATTERN_LENGTH * 2);
int lastPatternStart = size - PATTERN_LENGTH;
List<Color> lastPattern = history.subList(lastPatternStart, size);
List<Color> previousPattern = history.subList(previousPatternStart, lastPatternStart);
if (lastPattern.equals(previousPattern)) {
Color predictedColor = history.get(previousPatternStart - 1);
return mapColorToBetType(predictedColor);
}
return Optional.empty();
}
private Optional<BetType> getOppositeColorBet(Color color) {
return switch (color) {
case RED -> Optional.of(BetType.BLACK);
case BLACK -> Optional.of(BetType.RED);
default -> Optional.empty();
};
}
private Optional<BetType> mapColorToBetType(Color color) {
return switch (color) {
case RED -> Optional.of(BetType.RED);
case BLACK -> Optional.of(BetType.BLACK);
default -> Optional.empty();
};
}
private List<Bet> createBet(BetType type, State state) {
if (type == BetType.ZERO || type == BetType.DOUBLE_ZERO) {
return List.of();
}
long next = (!isLastBet() || isLastBetWon(state))
? getConfig().minBet()
: getLastBet() + getConfig().minBet();
long balance = getBalance();
long value = Math.min(next, balance);
if (value <= 0 && balance > 0) {
value = getConfig().minBet();
} else if (value <= 0) {
return List.of();
}
return Bet.list(type, value);
}
}
```

## com/traderoom/strategy/base/strategies/ReverseMartingaleRedStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class ReverseMartingaleRedStrategy extends AbstractStrategy {
private final BetType type;
public ReverseMartingaleRedStrategy(Config config) {
super(config);
type = BetType.RED;
}
@Override
public List<Bet> decide(State state) {
long last = getLastBet();
boolean b = (isLastBetWon(state) && last < (getConfig().minBet() * Math.pow(2, 5)));
long value = b ? last * 2 : getConfig().minBet();
return Bet.list(type, value);
}
}
```

## com/traderoom/strategy/base/strategies/RomanoskyStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class RomanoskyStrategy extends AbstractStrategy {
public RomanoskyStrategy(Config config) {
super(config);
}
@Override
public List<Bet> decide(State state) {
long value = getConfig().minBet();
return List.of(
Bet.of(BetType.FIRST_DOZEN, value * 3),
Bet.of(BetType.SECOND_DOZEN, value * 3),
Bet.of(BetType.CORNER_1_2_4_5, value),
Bet.of(BetType.CORNER_32_33_35_36, value));
}
}
```

## com/traderoom/strategy/base/strategies/SevenKaimeStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class SevenKaimeStrategy extends AbstractStrategy {
public SevenKaimeStrategy(Config config) {
super(config);
}
@Override
public List<Bet> decide(State state) {
boolean matched = true;
if (7 <= state.getMarketData().getHistory().size()) {
for (int i = 0; i < 7; i++) {
if (state.getMarketData().getHistory().get(state.getMarketData().getHistory().size() - (1 + i)).isBlack()) {
matched = false;
break;
}
}
}
return matched ? Bet.list(BetType.RED, getConfig().minBet()) : List.of();
}
}
```

## com/traderoom/strategy/base/strategies/SmartMarkovStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class SmartMarkovStrategy extends AbstractStrategy {
private final Predictor predictor;
private final double min;
public SmartMarkovStrategy(Config config) {
super(config);
predictor = new MultiOrderMarkovPredictor();
min = 0.05;
}
@Override
public List<Bet> decide(State state) {
return predictor.getNextSpot(state, getConfig()).stream()
.filter(prediction -> prediction.probability() > min)
.limit(3)
.map(prediction -> Bet.of(BetHelper.getStraightUp(prediction.spot()), getConfig().minBet()))
.toList();
}
}
```

## com/traderoom/strategy/base/strategies/special/BayesianMetaStrategy.java

```java
package com.traderoom.strategy.base.strategies.special;
@AStrategy
public class BayesianMetaStrategy extends AbstractStrategy {
private final Map<Predictor, Double> beliefs;
private final List<Predictor> models;
private static final double DECAY = 0.98;
public BayesianMetaStrategy(Config config) {
super(config);
models = List.of(
new MultiOrderMarkovPredictor(),
new EfficientCountPredictor(),
new PatternPredictor(),
new SectorMomentumPredictor()
);
beliefs = new HashMap<>();
double initialProb = 1.0 / models.size();
models.forEach(m -> beliefs.put(m, initialProb));
}
@Override
public List<Bet> decide(State state) {
Map<BetType, Double> aggregatedOpinion = new HashMap<>();
for (Predictor model : models) {
double modelWeight = beliefs.get(model);
model.getNextSpot(state, getConfig()).forEach(pred -> {
BetType type = BetHelper.getStraightUp(pred.spot());
double weightedProb = pred.probability() * modelWeight;
aggregatedOpinion.merge(type, weightedProb, Double::sum);
});
}
return aggregatedOpinion.entrySet().stream()
.sorted(Map.Entry.<BetType, Double>comparingByValue().reversed())
.limit(4)
.filter(e -> e.getValue() > 0.15)
.map(e -> Bet.of(e.getKey(), getConfig().minBet()))
.toList();
}
@Override
protected void onRoundCustom(List<Bet> bets, Spot spot, State state) {
double normalizationFactor = 0.0;
for (Predictor model : models) {
double prior = beliefs.get(model);
double likelihood = 0.001;
var preds = model.getNextSpot(state, getConfig());
for (var p : preds) {
if (p.spot() == spot) {
likelihood += p.probability();
break;
}
}
double posterior = prior * likelihood;
beliefs.put(model, posterior);
normalizationFactor += posterior;
}
for (Predictor model : models) {
double norm = beliefs.get(model) / normalizationFactor;
norm = (norm * DECAY) + ((1.0 - DECAY) / models.size());
beliefs.put(model, norm);
}
}
}
```

## com/traderoom/strategy/base/strategies/special/DealerSignatureStrategy.java

```java
package com.traderoom.strategy.base.strategies.special;
@AStrategy
public class DealerSignatureStrategy extends AbstractStrategy {
private final SectorMomentumPredictor predictor;
private final double confidenceThreshold;
public DealerSignatureStrategy(Config config) {
super(config);
this.predictor = new SectorMomentumPredictor();
this.confidenceThreshold = 0.18;
}
@Override
public List<Bet> decide(State state) {
if (state.getMarketData().getHistory().size() < 10) {
return List.of();
}
List<SpotPrediction> predictions = predictor.getNextSpot(state, getConfig());
if (predictions.isEmpty()) return List.of();
double maxProb = predictions.stream()
.mapToDouble(SpotPrediction::probability)
.max()
.orElse(0.0);
if (maxProb < confidenceThreshold) {
return List.of();
}
long baseBet = getConfig().minBet();
return predictions.stream()
.map(p -> Bet.of(BetHelper.getStraightUp(p.spot()), baseBet))
.toList();
}
}
```

## com/traderoom/strategy/base/strategies/special/InsiderInfoStrategy.java

```java
package com.traderoom.strategy.base.strategies.special;
@AStrategy
public class InsiderInfoStrategy extends AbstractStrategy {
private final RestrictedPredictor predictor;
public InsiderInfoStrategy(Config config) {
super(config);
this.predictor = new RestrictedPredictor(new MultiOrderMarkovPredictor());
this.predictor.ban(Spot.SPOT_0, Spot.SPOT_04, Spot.SPOT_10, Spot.SPOT_15, Spot.SPOT_27);
}
@Override
public List<Bet> decide(State state) {
List<SpotPrediction> predictions = predictor.getNextSpot(state, getConfig());
if (predictions.isEmpty()) return List.of();
return predictions.stream()
.limit(3)
.map(p -> Bet.of(BetHelper.getStraightUp(p.spot()), getConfig().minBet()))
.toList();
}
@Override
protected void onRoundCustom(List<Bet> bets, Spot spot, State state) {
long round = getBetCount();
if (round > 0 && round % 100 == 0) {
updateInsiderInfo(state);
}
}
private void updateInsiderInfo(State state) {
List<Spot> history = state.getMarketData().getHistory();
if (history.size() >= 5) {
Set<Spot> last5 = Set.copyOf(history.subList(history.size() - 5, history.size()));
predictor.setBannedSpots(last5);
}
}
}
```

## com/traderoom/strategy/base/strategies/special/ShannonEntropyStrategy.java

```java
package com.traderoom.strategy.base.strategies.special;
@AStrategy
public class ShannonEntropyStrategy extends AbstractStrategy {
private final int windowSize = 24;
private final double lowEntropyThreshold = 4.0;
public ShannonEntropyStrategy(Config config) {
super(config);
}
@Override
public List<Bet> decide(State state) {
List<Spot> history = state.getMarketData().getHistory();
if (history.size() < windowSize) return List.of();
List<Spot> window = history.subList(history.size() - windowSize, history.size());
double entropy = calculateEntropy(window);
if (entropy < lowEntropyThreshold) {
return playHotNumbers(window);
}
return List.of();
}
private double calculateEntropy(List<Spot> spots) {
Map<Spot, Integer> freq = new HashMap<>();
for (Spot s : spots) freq.merge(s, 1, Integer::sum);
double entropy = 0.0;
int n = spots.size();
for (Integer count : freq.values()) {
double p = (double) count / n;
entropy -= p * (Math.log(p) / Math.log(2));
}
return entropy;
}
private List<Bet> playHotNumbers(List<Spot> window) {
Map<Spot, Integer> freq = new HashMap<>();
window.forEach(s -> freq.merge(s, 1, Integer::sum));
return freq.entrySet().stream()
.filter(e -> e.getValue() >= 2)
.sorted((e1, e2) -> Integer.compare(e2.getValue(), e1.getValue()))
.limit(3)
.map(e -> Bet.of(BetHelper.getStraightUp(e.getKey()), getConfig().minBet()))
.toList();
}
}
```

## com/traderoom/strategy/base/strategies/special/WeightedStatisticStrategy.java

```java
package com.traderoom.strategy.base.strategies.special;
@AStrategy
public class WeightedStatisticStrategy extends AbstractStrategy {
private final int windowSize = 100;
private final double weightMultiplier = 1.5;
public WeightedStatisticStrategy(Config config) {
super(config);
}
@Override
public List<Bet> decide(State state) {
List<Spot> history = state.getMarketData().getHistory();
if (history.size() < 20) return List.of();
List<Spot> window = history.subList(Math.max(0, history.size() - windowSize), history.size());
Map<Spot, Long> frequencies = window.stream()
.collect(Collectors.groupingBy(s -> s, Collectors.counting()));
double avgFreq = frequencies.values().stream().mapToLong(l -> l).average().orElse(1.0);
List<Bet> bets = new ArrayList<>();
long baseBet = getConfig().minBet();
for (Map.Entry<Spot, Long> entry : frequencies.entrySet()) {
Spot spot = entry.getKey();
long count = entry.getValue();
if (count > avgFreq) {
double weight = ((double) count / avgFreq) * weightMultiplier;
long betValue = (long) (baseBet * weight);
betValue = Math.min(betValue, getConfig().maxBet());
if (SpotClassifier.isWorthy(spot, weight)) {
bets.add(Bet.of(BetHelper.getStraightUp(spot), betValue));
}
}
}
bets.sort((b1, b2) -> Long.compare(b2.value(), b1.value()));
return bets.stream().limit(5).toList();
}
private static class SpotClassifier {
static boolean isWorthy(Spot spot, double weight) {
return weight > 1.2;
}
}
}
```

## com/traderoom/strategy/base/strategies/StraightUpStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class StraightUpStrategy extends AbstractStrategy {
private final Predictor predictor;
public StraightUpStrategy(Config config) {
super(config);
predictor = new MultiOrderMarkovPredictor();
}
@Override
public List<Bet> decide(State state) {
Optional<SpotPrediction> optional = predictor.getNextSpot(state, getConfig()).stream()
.max(Comparator.comparingDouble(SpotPrediction::probability));
if (optional.isEmpty()) {
return List.of();
}
Spot spot = optional.get().spot();
return Bet.list(BetHelper.getStraightUp(spot), getConfig().minBet());
}
}
```

## com/traderoom/strategy/base/strategies/StraightUpStrategy2.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class StraightUpStrategy2 extends AbstractStrategy {
private final Predictor predictor;
private final double probability;
private final double fraction;
public StraightUpStrategy2(Config config) {
super(config);
predictor = new EfficientCountPredictor();
probability = 0.03;
fraction = 0.1;
}
@Override
public List<Bet> decide(State state) {
long limit = (long) (Math.max(getBalance(), getConfig().startBalance()) * fraction);
List<SpotPrediction> predictions = predictor.getNextSpot(state, getConfig());
return predictions.stream()
.filter(item -> item.probability() > probability)
.map(item -> Bet.of(BetHelper.getStraightUp(item.spot()),
Math.max(getConfig().minBet(), (long) (limit * item.probability()))))
.toList();
}
}
```

## com/traderoom/strategy/base/strategies/StraightUpStrategy3.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class StraightUpStrategy3 extends AbstractStrategy {
private int count;
public StraightUpStrategy3(Config config) {
super(config);
}
@Override
public List<Bet> decide(State state) {
count = isLastBetWon(state) ? count + 1 : 0;
List<Spot> history = state.getMarketData().getHistory();
int size = history.size();
Set<Spot> excluded = new HashSet<>(history.subList(Math.max(0, size - count), size));
return Spot.getAvailableList(getConfig().rouletteType())
.stream()
.filter(spot -> !excluded.contains(spot))
.map(spot -> Bet.of(BetHelper.getStraightUp(spot), getConfig().minBet()))
.toList();
}
}
```

## com/traderoom/strategy/base/strategies/TenPercentStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class TenPercentStrategy extends AbstractStrategy {
private final BetType type;
private final double percentage;
public TenPercentStrategy(Config config) {
super(config);
type = BetType.RED;
percentage = 0.10;
}
@Override
public List<Bet> decide(State state) {
long balance = getBalance();
long value = Math.clamp((long) (balance * percentage), getConfig().minBet(), getConfig().maxBet());
if (balance < value) {
return List.of();
}
return Bet.list(type, value);
}
}
```

## com/traderoom/strategy/base/strategies/TenUnitStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class TenUnitStrategy extends AbstractStrategy {
private final BetType type;
private final int count;
private final double fraction;
private final int multiplayer;
private final Deque<Integer> numbers;
private long setStartBalance;
private long limitValue;
private boolean useLastBetLeftNumber;
private boolean useLastBetAllLimit;
private int lastBetMultiplier;
private int lastRemainingLimitMultiplier;
public TenUnitStrategy(Config config) {
super(config);
type = BetType.RED;
count = 10;
fraction = 0.1;
multiplayer = 1;
numbers = new ArrayDeque<>(count);
setStartBalance = Math.max(getBalance(), config.startBalance());
limitValue = (long) (setStartBalance * fraction);
}
@Override
public List<Bet> decide(State state) {
if (getRemainingLimit() <= 0) {
initializeSet(state);
}
if (isLastBetWon(state)) {
if (!useLastBetLeftNumber && !useLastBetAllLimit) {
if (!numbers.isEmpty()) numbers.removeFirst();
if (!numbers.isEmpty()) numbers.removeLast();
} else if (useLastBetAllLimit) {
if (!numbers.isEmpty()) numbers.removeFirst();
numbers.addFirst(lastBetMultiplier);
}
} else if (isLastBet()) {
if (useLastBetAllLimit) {
numbers.clear();
} else if (useLastBetLeftNumber) {
if (!numbers.isEmpty()) numbers.removeFirst();
numbers.addFirst(lastRemainingLimitMultiplier);
} else {
numbers.addLast(lastBetMultiplier);
}
}
if (numbers.isEmpty()) {
for (int i = 0; i < count; i++) {
numbers.addLast(multiplayer);
}
initializeSet(state);
}
int multi = numbers.getFirst() + numbers.getLast();
lastRemainingLimitMultiplier = (int) (getRemainingLimit() / getConfig().minBet());
if (getRemainingLimit() < getConfig().minBet() * multi) {
if (getConfig().minBet() * numbers.getFirst() < getRemainingLimit()) {
multi = numbers.getFirst();
useLastBetLeftNumber = true;
} else {
multi = lastRemainingLimitMultiplier;
useLastBetAllLimit = true;
}
}
lastBetMultiplier = Math.max(multi, 1);
return Bet.list(type, getConfig().minBet() * lastBetMultiplier);
}
private void initializeSet(State state) {
setStartBalance = Math.max(getBalance(), getConfig().startBalance());
limitValue = (long) (setStartBalance * fraction);
}
private long getRemainingLimit() {
return limitValue - (setStartBalance - getBalance());
}
}
```

## com/traderoom/strategy/base/strategies/ThirtyOneSystemStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class ThirtyOneSystemStrategy extends AbstractStrategy {
private final BetType type;
private boolean wonSecondFromLastBet;
private int count;
public ThirtyOneSystemStrategy(Config config) {
super(config);
type = BetType.RED;
}
@Override
public List<Bet> decide(State state) {
boolean wasLastBetWon = isLastBetWon(state);
count = ((wonSecondFromLastBet && wasLastBetWon) || ((count - 1) % 9 == 7 && !wasLastBetWon)) ? 0 : (count + 1);
wonSecondFromLastBet = wasLastBetWon;
return switch (count % 9) {
case 0, 1, 2 -> Bet.list(type, getConfig().minBet());
case 3, 4 -> Bet.list(type, getConfig().minBet() * 2);
case 5, 6 -> Bet.list(type, getConfig().minBet() * 4);
case 7, 8 -> Bet.list(type, getConfig().minBet() * 8);
default -> throw new IllegalArgumentException();
};
}
}
```

## com/traderoom/strategy/base/strategies/TierEtToutStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class TierEtToutStrategy extends AbstractStrategy {
private long bankroll;
private boolean stageTwo;
public TierEtToutStrategy(Config config) {
super(config);
this.bankroll = config.startBalance();
this.stageTwo = false;
}
@Override
public List<Bet> decide(State state) {
if (isLastBet()) {
if (isLastBetWon(state)) {
bankroll = getBalance();
stageTwo = false;
} else {
if (!stageTwo) {
stageTwo = true;
} else {
bankroll = getBalance();
stageTwo = false;
}
}
}
long betValue;
long part1 = (long) Math.floor(bankroll / 3.0);
if (!stageTwo) {
betValue = part1;
} else {
betValue = bankroll - part1;
}
if (betValue < getConfig().minBet()) return List.of();
return Bet.list(BetType.BLACK, betValue);
}
}
```

## com/traderoom/strategy/base/strategies/TripleSixStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class TripleSixStrategy extends AbstractStrategy {
public TripleSixStrategy(Config config) {
super(config);
}
@Override
public List<Bet> decide(State state) {
return List.of(of(RED, getConfig().minBet() * 36),
of(SPLIT_0_2, getConfig().minBet() * 4),
of(SPLIT_8_11, getConfig().minBet() * 4),
of(SPLIT_10_13, getConfig().minBet() * 4),
of(SPLIT_17_20, getConfig().minBet() * 4),
of(SPLIT_26_29, getConfig().minBet() * 4),
of(SPLIT_28_31, getConfig().minBet() * 4),
of(STRAIGHT_UP_4, getConfig().minBet() * 2),
of(STRAIGHT_UP_6, getConfig().minBet() * 2),
of(STRAIGHT_UP_15, getConfig().minBet() * 2));
}
}
```

## com/traderoom/strategy/base/strategies/TwoInOneStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class TwoInOneStrategy extends AbstractStrategy {
private final BetType type;
private final LinkedList<Integer> numbers;
public TwoInOneStrategy(Config config) {
super(config);
numbers = new LinkedList<>();
type = BetType.RED;
}
@Override
public List<Bet> decide(State state) {
if (isLastBetWon(state)) {
if (!numbers.isEmpty()) numbers.removeFirst();
if (!numbers.isEmpty()) numbers.removeLast();
} else if (isLastBet()) {
numbers.addLast(numbers.size() <= 1 ? 1 : (numbers.getFirst() + numbers.getLast()));
}
long value = getConfig().minBet() * (numbers.size() <= 1 ? 1 : numbers.getFirst() + numbers.getLast());
return Bet.list(type, value);
}
}
```

## com/traderoom/strategy/base/strategies/v2/AdaptiveVolatilityStrategy_v2.java

```java
package com.traderoom.strategy.base.strategies.v2;
@AStrategy
public class AdaptiveVolatilityStrategy_v2 extends AbstractStrategy {
private final BetType type = BetType.RED;
private int winStreak = 0;
private final int historyWindow = 20;
public AdaptiveVolatilityStrategy_v2(Config config) {
super(config);
}
@Override
public List<Bet> decide(State state) {
long minBet = getConfig().minBet();
long balance = getBalance();
double localWinRate = calculateLocalWinRate();
boolean isFavorable = localWinRate > 0.5;
long betValue;
if (isLastBet()) {
if (isLastBetWon(state)) {
winStreak++;
if (isFavorable && winStreak < 4) {
betValue = getLastBet() * 2;
} else {
betValue = minBet;
winStreak = 0;
}
} else {
winStreak = 0;
betValue = minBet;
}
} else {
betValue = minBet;
}
if (balance < getStartBalance() * 0.8) {
}
return Bet.list(type, Math.min(betValue, balance));
}
private double calculateLocalWinRate() {
long total = getBetCount();
if (total < historyWindow) return 0.48;
return (double) getWonCount() / total;
}
}
```

## com/traderoom/strategy/base/strategies/v2/GapAnalysisStrategy_v2.java

```java
package com.traderoom.strategy.base.strategies.v2;
@AStrategy
public class GapAnalysisStrategy_v2 extends AbstractStrategy {
private final Map<Spot, Integer> gaps = new EnumMap<>(Spot.class);
private final Map<Spot, Integer> activeBets = new EnumMap<>(Spot.class);
private int dynamicThreshold = 35;
private static final int MAX_PROGRESSION_STEPS = 10;
public GapAnalysisStrategy_v2(Config config) {
super(config);
Spot.getAvailableList(config.rouletteType()).forEach(s -> gaps.put(s, 0));
}
@Override
public List<Bet> decide(State state) {
List<Bet> bets = new ArrayList<>();
long balance = getBalance();
long minBet = getConfig().minBet();
for (Map.Entry<Spot, Integer> entry : gaps.entrySet()) {
Spot s = entry.getKey();
int gap = entry.getValue();
if (gap > dynamicThreshold && !activeBets.containsKey(s)) {
activeBets.put(s, 1);
}
}
List<Spot> toRemove = new ArrayList<>();
for (Map.Entry<Spot, Integer> entry : activeBets.entrySet()) {
Spot s = entry.getKey();
int step = entry.getValue();
if (step > MAX_PROGRESSION_STEPS) {
toRemove.add(s);
continue;
}
long betMultiplier = (long) Math.ceil(step / 3.0);
long betVal = minBet * betMultiplier;
if (balance >= betVal) {
bets.add(Bet.of(BetHelper.getStraightUp(s), betVal));
balance -= betVal;
activeBets.put(s, step + 1);
}
}
toRemove.forEach(activeBets::remove);
return bets;
}
@Override
protected void onRoundCustom(List<Bet> bets, Spot outcome, State state) {
for (Spot s : gaps.keySet()) {
if (s == outcome) {
gaps.put(s, 0);
activeBets.remove(s);
} else {
gaps.merge(s, 1, Integer::sum);
}
}
if (getBetCount() % 1000 == 0) {
}
}
}
```

## com/traderoom/strategy/base/strategies/v2/NeighborStrategy_v2.java

```java
package com.traderoom.strategy.base.strategies.v2;
@AStrategy
public class NeighborStrategy_v2 extends AbstractStrategy {
private final int windowSize = 40;
private final Spot[] wheelLayout;
private final int wheelSize;
public NeighborStrategy_v2(Config config) {
super(config);
this.wheelLayout = Spot.getWheelLayouts().get(config.rouletteType());
this.wheelSize = (wheelLayout != null) ? wheelLayout.length : 0;
}
@Override
public List<Bet> decide(State state) {
if (wheelLayout == null || wheelSize == 0) return List.of();
List<Spot> history = state.getMarketData().getHistory();
if (history.size() < windowSize) return List.of();
int[] sectorHits = new int[wheelSize];
List<Spot> recent = history.subList(history.size() - windowSize, history.size());
for (Spot s : recent) {
int pos = s.getWheelPosition(getConfig().rouletteType());
if (pos != -1) sectorHits[pos]++;
}
int bestCenter = -1;
int maxHits = -1;
int searchRadius = 2;
for (int i = 0; i < wheelSize; i++) {
int currentHits = 0;
for (int offset = -searchRadius; offset <= searchRadius; offset++) {
int index = (i + offset + wheelSize) % wheelSize;
currentHits += sectorHits[index];
}
if (currentHits > maxHits) {
maxHits = currentHits;
bestCenter = i;
}
}
if (maxHits < windowSize * 0.15) {
return List.of();
}
List<Bet> bets = new ArrayList<>();
long baseBet = calculateBetSize(state);
for (int offset = -searchRadius; offset <= searchRadius; offset++) {
int index = (bestCenter + offset + wheelSize) % wheelSize;
Spot target = wheelLayout[index];
bets.add(Bet.of(BetHelper.getStraightUp(target), baseBet));
}
return bets;
}
private long calculateBetSize(State state) {
long min = getConfig().minBet();
if (isLastBet() && !isLastBetWon(state)) {
long lastTotal = BetHelper.getTotalBetValue(getLastBets());
long nextTotal = (long) (lastTotal * 1.2);
return Math.max(min, nextTotal / 5);
}
return min;
}
}
```

## com/traderoom/strategy/base/strategies/v2/SmartMarkovStrategy_v2.java

```java
package com.traderoom.strategy.base.strategies.v2;
@AStrategy
public class SmartMarkovStrategy_v2 extends AbstractStrategy {
private final Map<Spot, Map<Spot, Double>> transitionWeights = new ConcurrentHashMap<>();
private final double decayFactor = 0.995;
private final double minProbabilityThreshold = 0.05;
public SmartMarkovStrategy_v2(Config config) {
super(config);
}
@Override
public List<Bet> decide(State state) {
Spot lastSpot = state.getMarketData().getLastSpot();
if (lastSpot == null) return List.of();
Map<Spot, Double> candidates = transitionWeights.get(lastSpot);
if (candidates == null || candidates.isEmpty()) return List.of();
double totalWeight = candidates.values().stream().mapToDouble(d -> d).sum();
return candidates.entrySet().stream()
.max(Map.Entry.comparingByValue())
.filter(e -> (e.getValue() / totalWeight) >= minProbabilityThreshold)
.map(e -> {
double prob = e.getValue() / totalWeight;
long bank = getBalance();
long bet = (long) (bank * 0.01 * (prob * 10));
bet = Math.clamp(bet, getConfig().minBet(), getConfig().maxBet());
return Bet.list(BetHelper.getStraightUp(e.getKey()), bet);
})
.orElse(List.of());
}
@Override
protected void onRoundCustom(List<Bet> bets, Spot currentSpot, State state) {
List<Spot> history = state.getMarketData().getHistory();
if (history.size() < 2) return;
Spot previousSpot = history.get(history.size() - 2);
transitionWeights.computeIfAbsent(previousSpot, k -> new ConcurrentHashMap<>())
.merge(currentSpot, 1.0, (oldVal, newVal) -> (oldVal * decayFactor) + newVal);
}
}
```

## com/traderoom/strategy/base/strategies/v2/StraightUpStrategy2_v2.java

```java
package com.traderoom.strategy.base.strategies.v2;
@AStrategy
public class StraightUpStrategy2_v2 extends AbstractStrategy {
private final Predictor predictor;
private double currentThreshold;
private final double baseThreshold = 0.03;
private final double minThreshold = 0.02;
private int roundsWithoutBet = 0;
public StraightUpStrategy2_v2(Config config) {
super(config);
this.predictor = new EfficientCountPredictor();
this.currentThreshold = baseThreshold;
}
@Override
public List<Bet> decide(State state) {
List<SpotPrediction> predictions = predictor.getNextSpot(state, getConfig());
List<SpotPrediction> candidates = predictions.stream()
.filter(p -> p.probability() >= currentThreshold)
.sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
.limit(3)
.toList();
if (candidates.isEmpty()) {
roundsWithoutBet++;
if (roundsWithoutBet > 10 && currentThreshold > minThreshold) {
currentThreshold *= 0.98;
}
return List.of();
}
roundsWithoutBet = 0;
currentThreshold = baseThreshold;
long balance = getBalance();
long baseStake = Math.max(getConfig().minBet(), balance / 100);
return candidates.stream()
.map(p -> {
double confidenceMultiplier = 1.0 + (p.probability() - baseThreshold) * 10;
long value = (long) (baseStake * confidenceMultiplier);
value = Math.clamp(value, getConfig().minBet(), getConfig().maxBet());
return Bet.of(BetHelper.getStraightUp(p.spot()), value);
})
.toList();
}
}
```

## com/traderoom/strategy/base/strategies/volatility/AbstractVolatilityStrategy.java

```java
package com.traderoom.strategy.base.strategies.volatility;
public abstract class AbstractVolatilityStrategy extends AbstractStrategy {
protected final BetType type;
protected AbstractVolatilityStrategy(Config config) {
super(config);
type = BetType.RED;
}
protected List<Bet> create(BetType type, long value, State state) {
long minBet = getConfig().minBet();
long safeBalance = Math.max(0, getBalance());
if (safeBalance < minBet) {
return List.of();
}
double upper = Math.min(getConfig().maxBet(), safeBalance);
long clamped = (long) Math.clamp(value, minBet, upper);
return (clamped < minBet) ? List.of() : Bet.list(type, clamped);
}
}
```

## com/traderoom/strategy/base/strategies/volatility/AdaptiveVolatilityStrategy.java

```java
package com.traderoom.strategy.base.strategies.volatility;
@AStrategy
public class AdaptiveVolatilityStrategy extends AbstractVolatilityStrategy {
private final int historyWindowSize;
private final double lowVolatilityThresholdPercent;
private final double reverseMartingaleMultiplier;
public AdaptiveVolatilityStrategy(Config config) {
super(config);
historyWindowSize = 20;
lowVolatilityThresholdPercent = 0.10;
reverseMartingaleMultiplier = 2.0;
}
@Override
public List<Bet> decide(State state) {
var historyBalance = getHistoryBalance();
if (historyBalance.size() < historyWindowSize) {
return create(type, getConfig().minBet(), state);
}
LongSummaryStatistics stats = historyBalance.stream()
.mapToLong(Long::longValue)
.summaryStatistics();
long balanceRange = stats.getMax() - stats.getMin();
double lowVolatilityThreshold = getStartBalance() * lowVolatilityThresholdPercent;
if (balanceRange < lowVolatilityThreshold) {
return create(type, getConfig().minBet(), state);
}
if (isLastBetWon(state) && getBalance() > stats.getAverage()) {
long nextBetValue = (long) (getLastBet() * reverseMartingaleMultiplier);
return create(type, nextBetValue, state);
}
return create(type, getConfig().minBet(), state);
}
}
```

## com/traderoom/strategy/base/strategies/volatility/SimpleAdaptiveVolatilityStrategy.java

```java
package com.traderoom.strategy.base.strategies.volatility;
@AStrategy
public class SimpleAdaptiveVolatilityStrategy extends AbstractVolatilityStrategy {
private final double lowVolatilityThresholdPercent;
public SimpleAdaptiveVolatilityStrategy(Config config) {
super(config);
lowVolatilityThresholdPercent = 0.05;
}
@Override
public List<Bet> decide(State state) {
var historyBalance = getHistoryBalance();
if (historyBalance.isEmpty()) {
return create(type, getConfig().minBet(), state);
}
LongSummaryStatistics stats = historyBalance.stream()
.mapToLong(Long::longValue)
.summaryStatistics();
long range = stats.getMax() - stats.getMin();
double multi = getStartBalance() * lowVolatilityThresholdPercent;
if (range < multi) {
return create(type, getConfig().minBet(), state);
} else if (getBalance() > stats.getAverage()) {
long nextBetValue = isLastBetWon(state) ? getLastBet() * 2 : getConfig().minBet();
return create(type, nextBetValue, state);
}
return create(type, getConfig().minBet(), state);
}
}
```

## com/traderoom/strategy/base/strategies/WheelSectorStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class WheelSectorStrategy extends AbstractStrategy {
private final Predictor predictor;
private final int size;
private final double probability;
public WheelSectorStrategy(Config config) {
super(config);
predictor = new MultiOrderMarkovPredictor();
size = 5;
probability = 0.2;
}
@Override
public List<Bet> decide(State state) {
if (getConfig().rouletteType() == RouletteType.ONE_TO_36) {
return List.of();
}
List<SpotPrediction> predictions = predictor.getNextSpot(state, getConfig());
if (predictions.isEmpty()) {
return List.of();
}
SpotPrediction prediction = predictions.stream()
.filter(p -> p.probability() >= probability)
.max(Comparator.comparingDouble(SpotPrediction::probability))
.orElse(null);
if (prediction == null) {
return List.of();
}
Set<Spot> sector = getSpotsInSector(prediction.spot(), size, getConfig().rouletteType());
List<Bet> bets = new ArrayList<>(sector.size());
long value = getConfig().minBet();
for (Spot spot : sector) {
long sum = getBalance() - bets.stream()
.mapToLong(Bet::value)
.sum();
if (sum < value) {
break;
}
bets.add(Bet.of(BetHelper.getStraightUp(spot), value));
}
return bets;
}
private Set<Spot> getSpotsInSector(Spot centerSpot, int radius, RouletteType rouletteType) {
Map<Spot, Integer> wheelPositions = Spot.WHEEL_POSITIONS_CACHE.get(rouletteType);
Spot[] wheelLayout = Spot.getWheelLayouts().get(rouletteType);
if (wheelPositions == null || wheelLayout == null) {
return Set.of();
}
int centerPos = wheelPositions.getOrDefault(centerSpot, -1);
if (centerPos == -1) {
return Set.of();
}
Set<Spot> sector = HashSet.newHashSet(radius * 2);
int wheelSize = wheelLayout.length;
for (int i = -radius; i <= radius; i++) {
int currentPos = (centerPos + i + wheelSize) % wheelSize;
sector.add(wheelLayout[currentPos]);
}
return sector;
}
}
```

## com/traderoom/strategy/base/strategies/ZScoreReversionStrategy.java

```java
package com.traderoom.strategy.base.strategies;
@AStrategy
public class ZScoreReversionStrategy extends AbstractStrategy {
private final int sampleSize = 200;
private final double zThreshold = -2.0;
public ZScoreReversionStrategy(Config config) {
super(config);
}
@Override
public List<Bet> decide(State state) {
List<Spot> history = state.getMarketData().getHistory();
int n = Math.min(history.size(), sampleSize);
if (n < 50) return List.of();
List<Spot> window = history.subList(history.size() - n, history.size());
Map<Spot, Long> counts = new HashMap<>();
window.forEach(s -> counts.merge(s, 1L, Long::sum));
double p = 1.0 / 37.0;
if (getConfig().rouletteType() == com.traderoom.strategy.enums.RouletteType.AMERICAN) {
p = 1.0 / 38.0;
}
double expectedMean = n * p;
double stdDev = Math.sqrt(n * p * (1 - p));
List<Bet> bets = new ArrayList<>();
long betValue = getConfig().minBet();
for (Spot spot : Spot.getAvailableList(getConfig().rouletteType())) {
long count = counts.getOrDefault(spot, 0L);
double zScore = (count - expectedMean) / stdDev;
if (zScore < zThreshold) {
bets.add(Bet.of(BetHelper.getStraightUp(spot), betValue));
}
}
if (bets.size() > 5) {
return List.of();
}
return bets;
}
}
```

## com/traderoom/strategy/base/StrategyManager.java

```java
package com.traderoom.strategy.base;
@AStrategy
public class StrategyManager extends BaseManager {
private IStrategy currentChampion;
private long roundsUntilReevaluation;
private final Map<IStrategy, List<Bet>> pendingVirtualBets = new HashMap<>();
public StrategyManager(Config config) {
super(config);
List<IStrategy> portfolio = List.of(new HybridPredictorStrategy(config),
new MeanReversionStrategy(config),
new KellyCriterionStrategy(config),
new AdaptiveVolatilityStrategy(config));
currentChampion = portfolio.getFirst();
roundsUntilReevaluation = REEVALUATION_PERIOD;
add(portfolio);
}
@Override
public List<Bet> decide(State state) {
if (currentChampion == null) return List.of();
roundsUntilReevaluation--;
if (roundsUntilReevaluation <= 0) {
reevaluateChampion();
roundsUntilReevaluation = REEVALUATION_PERIOD;
}
pendingVirtualBets.clear();
for (IStrategy strategy : portfolio) {
if (strategy instanceof AbstractStrategy bs) {
bs.setBalance(this.getBalance());
}
pendingVirtualBets.put(strategy, ((AbstractStrategy) strategy).decide(state));
}
List<Bet> championBets = pendingVirtualBets.getOrDefault(currentChampion, List.of());
setLastBets(championBets);
return championBets;
}
@Override
public void onRoundCustom(List<Bet> realBets, Spot spot, State state) {
for (IStrategy strategy : portfolio) {
List<Bet> virtualBets = pendingVirtualBets.getOrDefault(strategy, List.of());
((AbstractStrategy) strategy).onRoundEnd(virtualBets, spot, state);
}
}
private void reevaluateChampion() {
portfolio.stream()
.max(Comparator.comparingLong(IStrategy::getBalance))
.ifPresent(strategy -> {
if (strategy != currentChampion && strategy instanceof AbstractStrategy) {
currentChampion = strategy;
}
});
}
}
```

## com/traderoom/strategy/ConfigBuilder.java

```java
package com.traderoom.strategy;
public final class ConfigBuilder {
private final Config.ConfigBuilder config;
private final StopConditionConfig.StopConditionConfigBuilder stopConfig;
private final List<StopCondition> conditions;
private Long balance;
private ConfigBuilder() {
config = Config.builder();
stopConfig = StopConditionConfig.builder();
conditions = new ArrayList<>();
balance = 10_000L;
}
public static ConfigBuilder builder() {
return new ConfigBuilder();
}
public ConfigBuilder name(String name) {
config.name(name);
return this;
}
public ConfigBuilder rouletteType(RouletteType type) {
config.rouletteType(type);
return this;
}
public ConfigBuilder european() {
config.rouletteType(RouletteType.EUROPEAN);
return this;
}
public ConfigBuilder american() {
config.rouletteType(RouletteType.AMERICAN);
return this;
}
public ConfigBuilder balance(Long balance) {
if (balance <= 0) throw new IllegalArgumentException("balance <= 0");
config.startBalance(balance);
this.balance = balance;
return this;
}
public ConfigBuilder limits(Long minBet, Long maxBet, Long tableLimit) {
if (minBet <= 0) throw new IllegalArgumentException("minBet <= 0");
if (maxBet < minBet) throw new IllegalArgumentException("maxBet < minBet");
if (tableLimit < maxBet) throw new IllegalArgumentException("tableLimit < maxBet");
config.minBet(minBet);
config.maxBet(maxBet);
config.tableLimit(tableLimit);
return this;
}
public ConfigBuilder stopLossPercentage(Integer stopLossPercentage) {
stopConfig.stopLossPercentage(stopLossPercentage);
return this;
}
public ConfigBuilder takeProfitPercentage(Integer takeProfitPercentage) {
stopConfig.takeProfitPercentage(takeProfitPercentage);
return this;
}
public ConfigBuilder trailingStopPercentage(Integer trailingStopPercentage) {
stopConfig.trailingStopPercentage(trailingStopPercentage);
return this;
}
public ConfigBuilder maxDrawdownPercentage(Integer maxDrawdownPercentage) {
stopConfig.maxDrawdownPercentage(maxDrawdownPercentage);
return this;
}
public ConfigBuilder maxWinStreak(Integer maxWinStreak) {
stopConfig.maxWinStreak(maxWinStreak);
return this;
}
public ConfigBuilder maxLossStreak(Integer maxLossStreak) {
stopConfig.maxLossStreak(maxLossStreak);
return this;
}
public ConfigBuilder maxRounds(Long maxRounds) {
stopConfig.maxRounds(maxRounds);
return this;
}
public ConfigBuilder maxBetBalancePercentage(Double maxBetBalancePercentage) {
stopConfig.maxBetBalancePercentage(maxBetBalancePercentage);
return this;
}
public ConfigBuilder stagnationWindow(Integer stagnationWindow) {
stopConfig.stagnationWindow(stagnationWindow);
return this;
}
public ConfigBuilder minWinRateThreshold(Double minWinRateThreshold) {
stopConfig.minWinRateThreshold(minWinRateThreshold);
return this;
}
public ConfigBuilder minRoundsForWinRate(Long minRoundsForWinRate) {
stopConfig.minRoundsForWinRate(minRoundsForWinRate);
return this;
}
public Config build() {
StopConditionConfig stop = stopConfig.build();
conditions.addAll(StopConditionFactory.from(stop, balance));
return config.stopConfig(stop)
.build();
}
public static Config defaultConfig() {
return ConfigBuilder.builder()
.name("Default")
.american()
.balance(15_000L)
.limits(1L,15_000L,15_000L)
.stopLossPercentage(50)
.takeProfitPercentage(20)
.trailingStopPercentage(0)
.maxDrawdownPercentage(0)
.maxWinStreak(0)
.maxLossStreak(0)
.maxRounds(0L)
.maxBetBalancePercentage(0.0)
.stagnationWindow(0)
.minWinRateThreshold(0.0)
.minRoundsForWinRate(0L)
.build();
}
}
```

## com/traderoom/strategy/config/AStrategy.java

```java
package com.traderoom.strategy.config;
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
public @interface AStrategy {
String name() default "";
StrategyType[] tags() default {StrategyType.UNKOWN};
}
```

## com/traderoom/strategy/config/BetListConverter.java

```java
package com.traderoom.strategy.config;
public class BetListConverter implements Converter<List<Bet>, String> {
@Override
public String convert(List<Bet> source) {
StringBuilder sb = new StringBuilder();
source.forEach(bet -> sb.append(bet.type().name()).append(':').append(bet.value()));
return sb.toString();
}
}
```

## com/traderoom/strategy/config/ConfigHolder.java

```java
package com.traderoom.strategy.config;
public enum ConfigHolder {
CONFIG_HOLDER;
private final ConcurrentMap<String, Config> configs = new ConcurrentHashMap<>();
static {
List<Config> configs = ConfigLoader.load("config.yml");
if (configs.isEmpty()) {
FastLogger.warn("load config failed, no config found!");
}
CONFIG_HOLDER.add(configs);
}
public ConfigHolder add(Config config) {
configs.put(config.name(), config);
return this;
}
public ConfigHolder add(Config... configs) {
for (Config config : configs) {
this.configs.put(config.name(), config);
}
return this;
}
public ConfigHolder add(Collection<Config> configs) {
for (Config config : configs) {
this.configs.put(config.name(), config);
}
return this;
}
public Optional<Config> get(String name) {
return Optional.ofNullable(configs.get(name));
}
public Config remove(String name) {
return configs.remove(name);
}
public void clear() {
configs.clear();
}
public Set<Config> getAll() {
return new HashSet<>(configs.values());
}
public Map<String, Config> map() {
return configs;
}
}
```

## com/traderoom/strategy/config/ConfigLoader.java

```java
package com.traderoom.strategy.config;
@UtilityClass
public class ConfigLoader {
public static List<Config> load(String resource) {
InputStream in = ConfigLoader.class
.getClassLoader()
.getResourceAsStream(resource);
if (in == null) {
throw new IllegalStateException("Config not found: " + resource);
}
ConfigProperties root = new Yaml().loadAs(in, ConfigProperties.class);
if (root.getConfig() == null || root.getConfig().isEmpty()) {
FastLogger.warn("Config list is empty");
return Collections.emptyList();
}
RawConfig defaults = root.getConfig().getFirst();
return root.getConfig().stream()
.map(config -> ConfigMerger.merge(defaults, config))
.toList();
}
}
```

## com/traderoom/strategy/config/ConfigMerger.java

```java
package com.traderoom.strategy.config;
public final class ConfigMerger {
private ConfigMerger() {
}
public static Config merge(RawConfig def, RawConfig config) {
return ConfigBuilder.builder()
.name(v(config.getName(), def.getName()))
.rouletteType(v(config.getType(), def.getType()))
.balance(v(config.getBalance(), def.getBalance()))
.limits(v(config.getMinBet(), def.getMinBet()),
v(config.getMaxBet(), def.getMaxBet()),
v(config.getLimit(), def.getLimit()))
.stopLossPercentage(v(config.getStopLossPercentage(), def.getStopLossPercentage()))
.takeProfitPercentage(v(config.getTakeProfitPercentage(), def.getTakeProfitPercentage()))
.trailingStopPercentage(v(config.getTrailingStopPercentage(), def.getTrailingStopPercentage()))
.maxDrawdownPercentage(v(config.getMaxDrawdownPercentage(), def.getMaxDrawdownPercentage()))
.maxWinStreak(v(config.getMaxWinStreak(), def.getMaxWinStreak()))
.maxLossStreak(v(config.getMaxLossStreak(), def.getMaxLossStreak()))
.maxRounds(v(config.getMaxRounds(), def.getMaxRounds()))
.maxBetBalancePercentage(v(config.getMaxBetBalancePercentage(), def.getMaxBetBalancePercentage()))
.stagnationWindow(v(config.getStagnationWindow(), def.getStagnationWindow()))
.minWinRateThreshold(v(config.getMinWinRateThreshold(), def.getMinWinRateThreshold()))
.minRoundsForWinRate(v(config.getMinRoundsForWinRate(), def.getMinRoundsForWinRate()))
.build();
}
private static <T> T v(T value, T def) {
if (value != null) return value;
if (def != null) return def;
throw new IllegalStateException("Missing required config value");
}
}
```

## com/traderoom/strategy/config/ConfigProperties.java

```java
package com.traderoom.strategy.config;
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ConfigProperties {
private List<RawConfig> config;
}
```

## com/traderoom/strategy/config/GlobalContext.java

```java
package com.traderoom.strategy.config;
@UtilityClass
public class GlobalContext {
private static class Holder {
private static final Set<Class<?>> CLASSES = Set.copyOf(new ClassScanner().scan(Constants.PACKAGE));
private static final Map<String, Class<?>> BY_NAME = CLASSES.stream()
.collect(Collectors.toUnmodifiableMap(Class::getName, c -> c));
}
public static Map<String, Class<?>> map() {
return Holder.BY_NAME;
}
public static Set<Class<?>> set() {
return Holder.CLASSES;
}
public static boolean isKnown(Class<?> clazz) {
return clazz != null && Holder.CLASSES.contains(clazz);
}
public static boolean isKnown(String name) {
return valid(name) && Holder.BY_NAME.containsKey(name);
}
public static Optional<Class<?>> find(String name) {
return valid(name)
? Optional.ofNullable(Holder.BY_NAME.get(name))
: Optional.empty();
}
public static Stream<Class<?>> findStream(String... names) {
return findStream(Stream.of(names));
}
public static Stream<Class<?>> findStream(Collection<String> names) {
return findStream(names.stream());
}
private static Stream<Class<?>> findStream(Stream<String> names) {
return names.filter(GlobalContext::valid)
.map(name -> (Class<?>) Holder.BY_NAME.get(name))
.filter(Objects::nonNull)
.map(name -> (Class<?>) name);
}
public static Set<Class<?>> findSet(String... names) {
return findSet(Stream.of(names));
}
public static Set<Class<?>> findSet(Collection<String> names) {
return findSet(names.stream());
}
private static Set<Class<?>> findSet(Stream<String> names) {
return findStream(names)
.collect(Collectors.toUnmodifiableSet());
}
public static Stream<Class<?>> classesInPackageStream(String basePackage) {
if (!valid(basePackage)) {
return Stream.empty();
}
return Holder.CLASSES.stream()
.filter(isInsidePackage(basePackage));
}
public static Stream<Class<?>> classesInPackagesStream(String... packages) {
return classesInPackagesStream(Stream.of(packages));
}
public static Stream<Class<?>> classesInPackagesStream(Collection<String> packages) {
return classesInPackagesStream(packages.stream());
}
private static Stream<Class<?>> classesInPackagesStream(Stream<String> packagePrefixes) {
Set<String> prefixes = packagePrefixes
.filter(GlobalContext::valid)
.collect(Collectors.toSet());
if (prefixes.isEmpty()) {
return Stream.empty();
}
Predicate<Class<?>> inAnyPackage = clazz -> {
String pkgName = clazz.getPackageName();
return prefixes.stream().anyMatch(prefix ->
pkgName.equals(prefix) || pkgName.startsWith(prefix + "."));
};
return Holder.CLASSES.stream().filter(inAnyPackage);
}
public static Set<Class<?>> classesInPackagesSet(String... packages) {
return classesInPackagesSet(Stream.of(packages));
}
public static Set<Class<?>> classesInPackagesSet(Collection<String> packages) {
return classesInPackagesSet(packages.stream());
}
private static Set<Class<?>> classesInPackagesSet(Stream<String> packages) {
return classesInPackagesStream(packages)
.collect(Collectors.toUnmodifiableSet());
}
public static Set<Class<?>> classesInPackage(Package aPackage) {
if (aPackage == null) return Collections.emptySet();
return classesInPackageStream(aPackage.getName())
.collect(Collectors.toSet());
}
private static Predicate<Class<?>> isInsidePackage(String basePackage) {
return clazz -> {
String className = clazz.getPackageName();
return className.equals(basePackage) || className.startsWith(basePackage + ".");
};
}
private static boolean valid(String value) {
return value != null && !value.isBlank();
}
}
```

## com/traderoom/strategy/config/RawConfig.java

```java
package com.traderoom.strategy.config;
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RawConfig {
private String name;
private RouletteType type;
private Long balance;
private Long minBet;
private Long maxBet;
private Long limit;
private Integer stopLossPercentage;
private Integer takeProfitPercentage;
private Integer trailingStopPercentage;
private Integer maxDrawdownPercentage;
private Integer maxWinStreak;
private Integer maxLossStreak;
private Long maxRounds;
private Double maxBetBalancePercentage;
private Integer stagnationWindow;
private Double minWinRateThreshold;
private Long minRoundsForWinRate;
}
```

## com/traderoom/strategy/config/StrategyDefinition.java

```java
package com.traderoom.strategy.config;
public record StrategyDefinition(String name, Class<IStrategy> clazz) {
public static StrategyDefinition of(String name, Class<IStrategy> clazz) {
return new StrategyDefinition(name, clazz);
}
public Optional<IStrategy> instance(Config config) {
try {
return Optional.of(clazz.getConstructor(Config.class).newInstance(config));
} catch (Exception _) {
return Optional.empty();
}
}
}
```

## com/traderoom/strategy/enums/BetType.java

```java
package com.traderoom.strategy.enums;
public enum BetType {
STRAIGHT_UP_1(35, Spot.SPOT_01),
STRAIGHT_UP_2(35, Spot.SPOT_02),
STRAIGHT_UP_3(35, Spot.SPOT_03),
STRAIGHT_UP_4(35, Spot.SPOT_04),
STRAIGHT_UP_5(35, Spot.SPOT_05),
STRAIGHT_UP_6(35, Spot.SPOT_06),
STRAIGHT_UP_7(35, Spot.SPOT_07),
STRAIGHT_UP_8(35, Spot.SPOT_08),
STRAIGHT_UP_9(35, Spot.SPOT_09),
STRAIGHT_UP_10(35, Spot.SPOT_10),
STRAIGHT_UP_11(35, Spot.SPOT_11),
STRAIGHT_UP_12(35, Spot.SPOT_12),
STRAIGHT_UP_13(35, Spot.SPOT_13),
STRAIGHT_UP_14(35, Spot.SPOT_14),
STRAIGHT_UP_15(35, Spot.SPOT_15),
STRAIGHT_UP_16(35, Spot.SPOT_16),
STRAIGHT_UP_17(35, Spot.SPOT_17),
STRAIGHT_UP_18(35, Spot.SPOT_18),
STRAIGHT_UP_19(35, Spot.SPOT_19),
STRAIGHT_UP_20(35, Spot.SPOT_20),
STRAIGHT_UP_21(35, Spot.SPOT_21),
STRAIGHT_UP_22(35, Spot.SPOT_22),
STRAIGHT_UP_23(35, Spot.SPOT_23),
STRAIGHT_UP_24(35, Spot.SPOT_24),
STRAIGHT_UP_25(35, Spot.SPOT_25),
STRAIGHT_UP_26(35, Spot.SPOT_26),
STRAIGHT_UP_27(35, Spot.SPOT_27),
STRAIGHT_UP_28(35, Spot.SPOT_28),
STRAIGHT_UP_29(35, Spot.SPOT_29),
STRAIGHT_UP_30(35, Spot.SPOT_30),
STRAIGHT_UP_31(35, Spot.SPOT_31),
STRAIGHT_UP_32(35, Spot.SPOT_32),
STRAIGHT_UP_33(35, Spot.SPOT_33),
STRAIGHT_UP_34(35, Spot.SPOT_34),
STRAIGHT_UP_35(35, Spot.SPOT_35),
STRAIGHT_UP_36(35, Spot.SPOT_36),
ZERO(35, EnumSet.of(RouletteType.EUROPEAN, RouletteType.AMERICAN), Spot.SPOT_0),
DOUBLE_ZERO(35, EnumSet.of(RouletteType.AMERICAN), Spot.SPOT_00),
SPLIT_1_2(17, Spot.SPOT_01, Spot.SPOT_02),
SPLIT_2_3(17, Spot.SPOT_02, Spot.SPOT_03),
SPLIT_35_36(17, Spot.SPOT_35, Spot.SPOT_36),
SPLIT_1_4(17, Spot.SPOT_01, Spot.SPOT_04),
SPLIT_8_11(17, Spot.SPOT_08, Spot.SPOT_11),
SPLIT_10_13(17, Spot.SPOT_10, Spot.SPOT_13),
SPLIT_17_20(17, Spot.SPOT_17, Spot.SPOT_20),
SPLIT_26_29(17, Spot.SPOT_26, Spot.SPOT_29),
SPLIT_28_31(17, Spot.SPOT_28, Spot.SPOT_31),
STREET_1_2_3(11, Spot.SPOT_01, Spot.SPOT_02, Spot.SPOT_03),
STREET_34_35_36(11, Spot.SPOT_34, Spot.SPOT_35, Spot.SPOT_36),
CORNER_1_2_4_5(8, Spot.SPOT_01, Spot.SPOT_02, Spot.SPOT_04, Spot.SPOT_05),
CORNER_32_33_35_36(8, Spot.SPOT_32, Spot.SPOT_33, Spot.SPOT_35, Spot.SPOT_36),
SIX_LINE_1_2_3_4_5_6(5, Spot.SPOT_01, Spot.SPOT_02, Spot.SPOT_03, Spot.SPOT_04, Spot.SPOT_05, Spot.SPOT_06),
SIX_LINE_31_32_33_34_35_36(5, Spot.SPOT_31, Spot.SPOT_32, Spot.SPOT_33, Spot.SPOT_34, Spot.SPOT_35, Spot.SPOT_36),
TOP_LINE_OR_BASKET(6, EnumSet.of(RouletteType.AMERICAN), Spot.SPOT_0, Spot.SPOT_00, Spot.SPOT_01, Spot.SPOT_02, Spot.SPOT_03),
TRIO_0_1_2(11, EnumSet.of(RouletteType.EUROPEAN), Spot.SPOT_0, Spot.SPOT_01, Spot.SPOT_02),
TRIO_0_2_3(11, EnumSet.of(RouletteType.EUROPEAN), Spot.SPOT_0, Spot.SPOT_02, Spot.SPOT_03),
SPLIT_0_00(17, EnumSet.of(RouletteType.AMERICAN), Spot.SPOT_0, Spot.SPOT_00),
SPLIT_0_2(17, EnumSet.of(RouletteType.EUROPEAN), Spot.SPOT_0, Spot.SPOT_02),
STREET_0_00_2(11, EnumSet.of(RouletteType.AMERICAN), Spot.SPOT_0, Spot.SPOT_00, Spot.SPOT_02),
CORNER_0_1_2_3(8, EnumSet.of(RouletteType.EUROPEAN), Spot.SPOT_0, Spot.SPOT_01, Spot.SPOT_02, Spot.SPOT_03),
FIRST_COLUMN(2, Spot.FIRST_COLUMN_SPOTS),
SECOND_COLUMN(2, Spot.SECOND_COLUMN_SPOTS),
THIRD_COLUMN(2, Spot.THIRD_COLUMN_SPOTS),
FIRST_DOZEN(2, Spot.FIRST_DOZEN_SPOTS),
SECOND_DOZEN(2, Spot.SECOND_DOZEN_SPOTS),
THIRD_DOZEN(2, Spot.THIRD_DOZEN_SPOTS),
ONE_TO_EIGHTEEN(1, Spot.LOW_SPOTS),
EVEN(1, Spot.EVENS),
RED(1, Spot.REDS),
BLACK(1, Spot.BLACKS),
ODD(1, Spot.ODDS),
NINETEEN_TO_THIRTY_SIX(1, Spot.HIGH_SPOTS);
@Getter
private final int payout;
private final EnumSet<RouletteType> availableIn;
@Getter
private final Set<Spot> winning;
private static final Map<Spot, BetType> STRAIGHT_UP_MAP = new EnumMap<>(Spot.class);
private static final Map<RouletteType, List<BetType>> AVAILABLE_BETS_CACHE = new ConcurrentHashMap<>();
static {
STRAIGHT_UP_MAP.put(Spot.SPOT_0, ZERO);
STRAIGHT_UP_MAP.put(Spot.SPOT_00, DOUBLE_ZERO);
for (Spot spot : Spot.values()) {
if (spot.getNumber() > 0) {
String betTypeName = "STRAIGHT_UP_" + spot.getNumber();
try {
STRAIGHT_UP_MAP.put(spot, BetType.valueOf(betTypeName));
} catch (IllegalArgumentException e) {
}
}
}
}
BetType(int payout, Spot... spots) {
this(payout, EnumSet.allOf(RouletteType.class), spots);
}
BetType(int payout, EnumSet<RouletteType> availableIn, Spot... spots) {
this.payout = payout;
this.availableIn = availableIn;
winning = spots.length == 0 ? EnumSet.noneOf(Spot.class) : EnumSet.copyOf(List.of(spots));
}
BetType(int payout, Set<Spot> spots) {
this(payout, EnumSet.allOf(RouletteType.class), spots);
}
BetType(int payout, EnumSet<RouletteType> availableIn, Set<Spot> spots) {
this.payout = payout;
this.availableIn = availableIn;
winning = (spots == null || spots.isEmpty())
? EnumSet.noneOf(Spot.class)
: EnumSet.copyOf(spots);
}
public static List<BetType> getAllCovering(Spot spot) {
return Stream.of(BetType.values())
.filter(type -> type.getWinning().contains(spot))
.toList();
}
public static List<BetType> getAvailableList(RouletteType rouletteType) {
Objects.requireNonNull(rouletteType, "rouletteType Ð½Ðµ Ð¼Ð¾Ð¶ÐµÑ Ð±ÑÑÑ null");
return AVAILABLE_BETS_CACHE.computeIfAbsent(rouletteType, key -> {
List<BetType> result = new ArrayList<>();
for (BetType bet : values()) {
if (bet.isAvailableIn(key)) {
result.add(bet);
}
}
return Collections.unmodifiableList(result);
});
}
public boolean isAvailableIn(RouletteType rouletteType) {
return availableIn.contains(rouletteType);
}
public int getReturnMultiplier() {
return payout + 1;
}
public static BetType getStraightUpBetFor(Spot spot) {
BetType bet = STRAIGHT_UP_MAP.get(spot);
if (bet == null) {
throw new IllegalArgumentException("ÐÐµÑ ÑÑÐ°Ð²ÐºÐ¸ 'Straight Up' Ð´Ð»Ñ Ð½Ð¾Ð¼ÐµÑÐ°: " + spot);
}
return bet;
}
}
```

## com/traderoom/strategy/enums/Color.java

```java
package com.traderoom.strategy.enums;
public enum Color {
RED, BLACK, GREEN
}
```

## com/traderoom/strategy/enums/Constants.java

```java
package com.traderoom.strategy.enums;
@UtilityClass
public class Constants {
public static final Random RANDOM = new SecureRandom();
public static final int SPOT_HISTORY_LIST_SIZE = 10000;
public static final int BALANCE_HISTORY_SIZE = 10000;
public static final String PACKAGES = "com.traderoom.strategy";
public static final Package PACKAGE = StrategyMain.class.getPackage();
}
```

## com/traderoom/strategy/enums/RouletteType.java

```java
package com.traderoom.strategy.enums;
public enum RouletteType {
ONE_TO_36,
EUROPEAN,
AMERICAN
}
```

## com/traderoom/strategy/enums/Spot.java

```java
package com.traderoom.strategy.enums;
public enum Spot {
SPOT_0(0, Color.GREEN),
SPOT_00(-1, Color.GREEN),
SPOT_01(1, Color.RED),
SPOT_02(2, Color.BLACK),
SPOT_03(3, Color.RED),
SPOT_04(4, Color.BLACK),
SPOT_05(5, Color.RED),
SPOT_06(6, Color.BLACK),
SPOT_07(7, Color.RED),
SPOT_08(8, Color.BLACK),
SPOT_09(9, Color.RED),
SPOT_10(10, Color.BLACK),
SPOT_11(11, Color.BLACK),
SPOT_12(12, Color.RED),
SPOT_13(13, Color.BLACK),
SPOT_14(14, Color.RED),
SPOT_15(15, Color.BLACK),
SPOT_16(16, Color.RED),
SPOT_17(17, Color.BLACK),
SPOT_18(18, Color.RED),
SPOT_19(19, Color.RED),
SPOT_20(20, Color.BLACK),
SPOT_21(21, Color.RED),
SPOT_22(22, Color.BLACK),
SPOT_23(23, Color.RED),
SPOT_24(24, Color.BLACK),
SPOT_25(25, Color.RED),
SPOT_26(26, Color.BLACK),
SPOT_27(27, Color.RED),
SPOT_28(28, Color.BLACK),
SPOT_29(29, Color.BLACK),
SPOT_30(30, Color.RED),
SPOT_31(31, Color.BLACK),
SPOT_32(32, Color.RED),
SPOT_33(33, Color.BLACK),
SPOT_34(34, Color.RED),
SPOT_35(35, Color.BLACK),
SPOT_36(36, Color.RED);
@Getter
private final int number;
private final Color color;
Spot(int number, Color color) {
this.number = number;
this.color = color;
}
public static final Set<Spot> REDS;
public static final Set<Spot> BLACKS;
public static final Set<Spot> GREENS;
public static final Set<Spot> EVENS;
public static final Set<Spot> ODDS;
public static final Set<Spot> LOW_SPOTS;
public static final Set<Spot> HIGH_SPOTS;
public static final Set<Spot> FIRST_DOZEN_SPOTS;
public static final Set<Spot> SECOND_DOZEN_SPOTS;
public static final Set<Spot> THIRD_DOZEN_SPOTS;
public static final Set<Spot> FIRST_COLUMN_SPOTS;
public static final Set<Spot> SECOND_COLUMN_SPOTS;
public static final Set<Spot> THIRD_COLUMN_SPOTS;
private static final Set<Spot> FIRST_DOZEN_OR_ZERO_SPOTS;
private static final Map<Integer, Spot> SPOT_BY_NUMBER =
Arrays.stream(values()).collect(Collectors.toUnmodifiableMap(Spot::getNumber, s -> s));
private static final Map<RouletteType, List<Spot>> AVAILABLE_SPOTS_CACHE;
public static final Map<RouletteType, Spot[]> WHEEL_LAYOUTS;
public static final Map<RouletteType, Map<Spot, Integer>> WHEEL_POSITIONS_CACHE;
static {
Map<RouletteType, List<Spot>> availableSpots = new EnumMap<>(RouletteType.class);
Map<RouletteType, Spot[]> wheelLayouts = new EnumMap<>(RouletteType.class);
Map<RouletteType, Map<Spot, Integer>> wheelPositions = new EnumMap<>(RouletteType.class);
wheelLayouts.put(RouletteType.ONE_TO_36, new Spot[]{
SPOT_01, SPOT_02, SPOT_03, SPOT_04, SPOT_05, SPOT_06, SPOT_07, SPOT_08, SPOT_09,
SPOT_10, SPOT_11, SPOT_12, SPOT_13, SPOT_14, SPOT_15, SPOT_16, SPOT_17, SPOT_18,
SPOT_19, SPOT_20, SPOT_21, SPOT_22, SPOT_23, SPOT_24, SPOT_25, SPOT_26, SPOT_27,
SPOT_28, SPOT_29, SPOT_30, SPOT_31, SPOT_32, SPOT_33, SPOT_34, SPOT_35, SPOT_36
});
wheelLayouts.put(RouletteType.EUROPEAN, new Spot[]{
SPOT_0, SPOT_32, SPOT_15, SPOT_19, SPOT_04, SPOT_21, SPOT_02, SPOT_25,
SPOT_17, SPOT_34, SPOT_06, SPOT_27, SPOT_13, SPOT_36, SPOT_11, SPOT_30, SPOT_08,
SPOT_23, SPOT_10, SPOT_05, SPOT_24, SPOT_16, SPOT_33, SPOT_01, SPOT_20, SPOT_14,
SPOT_31, SPOT_09, SPOT_22, SPOT_18, SPOT_29, SPOT_07, SPOT_28, SPOT_12, SPOT_35,
SPOT_03, SPOT_26
});
wheelLayouts.put(RouletteType.AMERICAN, new Spot[]{
SPOT_0, SPOT_28, SPOT_09, SPOT_26, SPOT_30, SPOT_11, SPOT_07, SPOT_20, SPOT_32, SPOT_17,
SPOT_05, SPOT_22, SPOT_34, SPOT_15, SPOT_03, SPOT_24, SPOT_36, SPOT_13, SPOT_01, SPOT_00,
SPOT_27, SPOT_10, SPOT_25, SPOT_29, SPOT_12, SPOT_08, SPOT_19, SPOT_31, SPOT_18, SPOT_06,
SPOT_21, SPOT_33, SPOT_16, SPOT_04, SPOT_23, SPOT_35, SPOT_14, SPOT_02
});
for (RouletteType type : RouletteType.values()) {
availableSpots.put(type, getAvailableSpotsUncached(type));
Spot[] layout = wheelLayouts.get(type);
if (layout != null) {
Map<Spot, Integer> positions = new EnumMap<>(Spot.class);
for (int i = 0; i < layout.length; i++) {
positions.put(layout[i], i);
}
wheelPositions.put(type, Collections.unmodifiableMap(positions));
}
}
WHEEL_LAYOUTS = Collections.unmodifiableMap(wheelLayouts);
AVAILABLE_SPOTS_CACHE = Collections.unmodifiableMap(availableSpots);
WHEEL_POSITIONS_CACHE = Collections.unmodifiableMap(wheelPositions);
EnumSet<Spot> reds = EnumSet.noneOf(Spot.class);
EnumSet<Spot> blacks = EnumSet.noneOf(Spot.class);
EnumSet<Spot> greens = EnumSet.noneOf(Spot.class);
EnumSet<Spot> evens = EnumSet.noneOf(Spot.class);
EnumSet<Spot> odds = EnumSet.noneOf(Spot.class);
EnumSet<Spot> lows = EnumSet.noneOf(Spot.class);
EnumSet<Spot> highs = EnumSet.noneOf(Spot.class);
EnumSet<Spot> firstDozen = EnumSet.noneOf(Spot.class);
EnumSet<Spot> secondDozen = EnumSet.noneOf(Spot.class);
EnumSet<Spot> thirdDozen = EnumSet.noneOf(Spot.class);
EnumSet<Spot> firstColumn = EnumSet.noneOf(Spot.class);
EnumSet<Spot> secondColumn = EnumSet.noneOf(Spot.class);
EnumSet<Spot> thirdColumn = EnumSet.noneOf(Spot.class);
for (Spot spot : values()) {
if (spot.isRed()) reds.add(spot);
if (spot.isBlack()) blacks.add(spot);
if (spot.isGreen()) greens.add(spot);
if (spot.isEven()) evens.add(spot);
if (spot.isOdd()) odds.add(spot);
if (spot.is1To18()) lows.add(spot);
if (spot.is19To36()) highs.add(spot);
if (spot.isFirstDozen()) firstDozen.add(spot);
if (spot.isSecondDozen()) secondDozen.add(spot);
if (spot.isThirdDozen()) thirdDozen.add(spot);
if (spot.isFirstColumn()) firstColumn.add(spot);
if (spot.isSecondColumn()) secondColumn.add(spot);
if (spot.isThirdColumn()) thirdColumn.add(spot);
}
REDS = Collections.unmodifiableSet(reds);
BLACKS = Collections.unmodifiableSet(blacks);
GREENS = Collections.unmodifiableSet(greens);
EVENS = Collections.unmodifiableSet(evens);
ODDS = Collections.unmodifiableSet(odds);
LOW_SPOTS = Collections.unmodifiableSet(lows);
HIGH_SPOTS = Collections.unmodifiableSet(highs);
FIRST_DOZEN_SPOTS = Collections.unmodifiableSet(firstDozen);
SECOND_DOZEN_SPOTS = Collections.unmodifiableSet(secondDozen);
THIRD_DOZEN_SPOTS = Collections.unmodifiableSet(thirdDozen);
FIRST_COLUMN_SPOTS = Collections.unmodifiableSet(firstColumn);
SECOND_COLUMN_SPOTS = Collections.unmodifiableSet(secondColumn);
THIRD_COLUMN_SPOTS = Collections.unmodifiableSet(thirdColumn);
FIRST_DOZEN_OR_ZERO_SPOTS = Collections.unmodifiableSet(EnumSet.of(
SPOT_0, SPOT_00, SPOT_01, SPOT_02, SPOT_03, SPOT_04, SPOT_05,
SPOT_06, SPOT_07, SPOT_08, SPOT_09, SPOT_10, SPOT_11, SPOT_12
));
}
public static Spot getByNumber(int number) {
Spot spot = SPOT_BY_NUMBER.get(number);
if (spot == null) {
throw new IllegalArgumentException("The number does not exist: " + number);
}
return spot;
}
private static List<Spot> getAvailableSpotsUncached(RouletteType rouletteType) {
Stream<Spot> stream = Arrays.stream(values());
if (rouletteType == RouletteType.ONE_TO_36) {
stream = stream.filter(s -> s != SPOT_0 && s != SPOT_00);
} else if (rouletteType == RouletteType.EUROPEAN) {
stream = stream.filter(s -> s != SPOT_00);
}
return stream.toList();
}
public static List<Spot> getAvailableList(RouletteType rouletteType) {
return AVAILABLE_SPOTS_CACHE.getOrDefault(rouletteType, List.of());
}
public boolean isRed() {
return color == Color.RED;
}
public boolean isBlack() {
return color == Color.BLACK;
}
public boolean isGreen() {
return color == Color.GREEN;
}
public boolean isEven() {
return number > 0 && number % 2 == 0;
}
public boolean isOdd() {
return number > 0 && number % 2 != 0;
}
public boolean isFirstDozen() {
return number >= 1 && number <= 12;
}
public boolean isSecondDozen() {
return number >= 13 && number <= 24;
}
public boolean isThirdDozen() {
return number >= 25 && number <= 36;
}
public boolean isFirstColumn() {
return number > 0 && number % 3 == 1;
}
public boolean isSecondColumn() {
return number > 0 && number % 3 == 2;
}
public boolean isThirdColumn() {
return number > 0 && number % 3 == 0;
}
public boolean is1To18() {
return number >= 1 && number <= 18;
}
public boolean is19To36() {
return number >= 19 && number <= 36;
}
public int getWheelPosition(RouletteType rouletteType) {
return WHEEL_POSITIONS_CACHE.getOrDefault(rouletteType, Collections.emptyMap()).getOrDefault(this, -1);
}
public int getPhysicalDistance(Spot spot, RouletteType rouletteType) {
Objects.requireNonNull(spot, "spot cannot be null");
int thisPos = getWheelPosition(rouletteType);
int otherPos = spot.getWheelPosition(rouletteType);
if (thisPos == -1 || otherPos == -1) {
throw new IllegalArgumentException("One or both fields are not available in the specified roulette type");
}
int wheelSize = WHEEL_LAYOUTS.get(rouletteType).length;
int diff = Math.abs(thisPos - otherPos);
return Math.min(diff, wheelSize - diff);
}
public boolean isFirstDozenOrZeroAndDoubleZero() {
return FIRST_DOZEN_OR_ZERO_SPOTS.contains(this);
}
public static Map<RouletteType, Spot[]> getWheelLayouts() {
return WHEEL_LAYOUTS;
}
}
```

## com/traderoom/strategy/enums/SpotGenerateType.java

```java
package com.traderoom.strategy.enums;
public enum SpotGenerateType {
RANDOM,
ROTATION_NUMBER,
ROTATION_WHEEL,
RANDOM_RED_ONLY,
RANDOM_BLACK_ONLY,
RANDOM_EXCEPT_ONE
}
```

## com/traderoom/strategy/enums/StrategyHolder.java

```java
package com.traderoom.strategy.enums;
public enum StrategyHolder {
STRATEGY_HOLDER;
private final ConcurrentMap<String, IStrategy> strategies = new ConcurrentHashMap<>();
public StrategyHolder register(IStrategy strategy) {
strategies.put(strategy.getName(), strategy);
return this;
}
public StrategyHolder register(IStrategy... strategies) {
for (IStrategy strategy : strategies) {
this.strategies.put(strategy.getName(), strategy);
}
return this;
}
public StrategyHolder register(Collection<IStrategy> strategies) {
for (IStrategy strategy : strategies) {
this.strategies.put(strategy.getName(), strategy);
}
return this;
}
public Optional<IStrategy> get(String name) {
return Optional.ofNullable(strategies.get(name));
}
public IStrategy remove(String name) {
return strategies.remove(name);
}
public void clear() {
strategies.clear();
}
}
```

## com/traderoom/strategy/enums/StrategyType.java

```java
package com.traderoom.strategy.enums;
public enum StrategyType {
UNKOWN,
;
}
```

## com/traderoom/strategy/exception/StrategyException.java

```java
package com.traderoom.strategy.exception;
public class StrategyException extends RuntimeException {
public StrategyException() {
}
public StrategyException(String message) {
super(message);
}
public StrategyException(String message, Throwable cause) {
super(message, cause);
}
}
```

## com/traderoom/strategy/IStrategy.java

```java
package com.traderoom.strategy;
public interface IStrategy extends Metric, Maker, Publisher, Serializable {
Snapshot playTurn(Spot spot, State state);
Snapshot endGame(State state);
void stop();
boolean isLive();
List<StopCondition> getStopConditions();
default boolean canContinue(State state) {
boolean canContinue = getBalance() > 0 && isLive();
for (StopCondition condition : getStopConditions()) {
if (condition.should(this, state)) {
stop();
canContinue = false;
break;
}
}
return canContinue;
}
default Snapshot snapshot() {
return snapshot(List.of(), null, getBalance());
}
default Snapshot snapshot(List<Bet> bets, Spot spot, long oldBalance) {
long balance = getBalance();
long startBalance = getStartBalance();
long peakBalance = getPeakBalance();
long netProfit = balance - startBalance;
double drawdown = ((peakBalance > 0) ? (double) (peakBalance - balance) / peakBalance : 0) * 100;
double maxDrawdown = getMaxDrawdown() * 100;
double roiPercentage = (startBalance == 0) ? 0.0 : ((double) netProfit / startBalance) * 100.0;
long roundNumber = getBetCount();
long totalWon = getWonCount();
long totalLost = getLostCount();
double winRatePercentage = (roundNumber == 0) ? 0.0 : ((double) totalWon / roundNumber) * 100.0;
long totalWagered = getTotalWagered();
long totalPayout = getTotalPayout();
double profitFactor = (totalWagered == 0) ? 0.0 : (double) totalPayout / totalWagered;
return Snapshot.builder()
.strategyName(getName())
.roundNumber(roundNumber)
.balance(balance)
.startBalance(startBalance)
.lastProfit(balance - oldBalance)
.lastBets(List.copyOf(bets))
.roundBetAmount(BetHelper.getTotalBetValue(bets))
.netProfit(netProfit)
.roiPercentage(roiPercentage)
.winRatePercentage(winRatePercentage)
.lastSpot(spot)
.totalWon(totalWon)
.totalLost(totalLost)
.totalWagered(totalWagered)
.totalPayout(totalPayout)
.currentDrawdown(drawdown)
.maxDrawdown(maxDrawdown)
.profitFactor(profitFactor)
.isStopped(!isLive())
.build();
}
}
```

## com/traderoom/strategy/model/Bet.java

```java
package com.traderoom.strategy.model;
@Builder
public record Bet(BetType type, long value) {
public static List<Bet> list(BetType type, long value) {
return List.of(Bet.builder().type(type).value(value).build());
}
public static Bet of(BetType type, long value) {
return Bet.builder().type(type).value(value).build();
}
}
```

## com/traderoom/strategy/model/BetTypePrediction.java

```java
package com.traderoom.strategy.model;
@Builder
public record BetTypePrediction(BetType type, double probability) {
public static BetTypePrediction of(BetType type, double probability) {
return new BetTypePrediction(type, probability);
}
}
```

## com/traderoom/strategy/model/ColorPrediction.java

```java
package com.traderoom.strategy.model;
@Builder
public record ColorPrediction(double red, double black, double green) {
public static ColorPrediction of() {
return new ColorPrediction(0.0, 0.0, 0.0);
}
public static ColorPrediction of(double probability) {
return new ColorPrediction(probability, probability, probability);
}
public static ColorPrediction of(double red, double black, double green) {
return new ColorPrediction(red, black, green);
}
}
```

## com/traderoom/strategy/model/context/Config.java

```java
package com.traderoom.strategy.model.context;
@Builder
public record Config(
String name,
RouletteType rouletteType,
Long minBet,
Long maxBet,
Long startBalance,
Long tableLimit,
StopConditionConfig stopConfig
) {
public List<StopCondition> createConditions(){
return StopConditionFactory.from(stopConfig, startBalance);
}
}
```

## com/traderoom/strategy/model/context/MarketData.java

```java
package com.traderoom.strategy.model.context;
@ToString
public class MarketData implements Serializable {
private final List<Spot> spotHistory;
private final Map<Spot, Integer> spotFrequencies;
private long totalProcessed;
public MarketData() {
spotHistory = new ArrayList<>(Constants.SPOT_HISTORY_LIST_SIZE);
spotFrequencies = new EnumMap<>(Spot.class);
totalProcessed = 0;
}
public void addSpot(Spot spot) {
spotHistory.add(spot);
spotFrequencies.merge(spot, 1, Integer::sum);
if (spotHistory.size() > Constants.SPOT_HISTORY_LIST_SIZE) {
Spot removedSpot = spotHistory.removeFirst();
spotFrequencies.compute(removedSpot, (_, count) -> count == null || count <= 1 ? null : count - 1);
}
totalProcessed++;
}
public double getRate(Predicate<Spot> condition) {
if (spotHistory.isEmpty()) return 0.0;
double matchCount = spotFrequencies.entrySet().stream()
.filter(entry -> condition.test(entry.getKey()))
.mapToInt(Map.Entry::getValue)
.sum();
return matchCount / spotHistory.size();
}
public List<Spot> getHistory() {
return Collections.unmodifiableList(spotHistory);
}
public Map<Spot, Integer> getFrequencies() {
return Collections.unmodifiableMap(spotFrequencies);
}
public Spot getLastSpot() {
return spotHistory.isEmpty() ? null : spotHistory.getLast();
}
public long getCurrentLoopCount() {
return totalProcessed;
}
public double getRedRate() {
return getRate(Spot::isRed);
}
public double getBlackRate() {
return getRate(Spot::isBlack);
}
}
```

## com/traderoom/strategy/model/context/MetaConfig.java

```java
package com.traderoom.strategy.model.context;
public record MetaConfig(
Config config,
Class<? extends IStrategy> clazz,
SpotSupplier supplier
) {
}
```

## com/traderoom/strategy/model/context/Snapshot.java

```java
package com.traderoom.strategy.model.context;
@Builder
@CsvFile(separator = Separator.SEMICOLON)
public record Snapshot(
@CsvIgnore
String strategyName,
@CsvColumn(value = "ROUND", order = 1)
long roundNumber,
@CsvColumn(value = "BALANCE", order = 2)
long balance,
@CsvColumn(value = "START", order = 20)
long startBalance,
@CsvColumn(value = "LAST_PROF", order = 4)
long lastProfit,
@CsvColumn(value = "NET_PROF", order = 5)
long netProfit,
@CsvColumn(value = "ROUND_BET", order = 6)
long roundBetAmount,
@CsvColumn(value = "ROI%", order = 7)
double roiPercentage,
@CsvColumn(value = "WIN_RATE%", order = 8)
double winRatePercentage,
@CsvColumn(value = "CURRENT_DD", order = 9)
double currentDrawdown,
@CsvColumn(value = "MAX_DD", order = 10)
double maxDrawdown,
@CsvColumn(value = "PF", order = 11)
double profitFactor,
@CsvColumn(value = "LAST_SPOT", order = 12)
Spot lastSpot,
@CsvColumn(value = "WON", order = 13)
long totalWon,
@CsvColumn(value = "LOST", order = 14)
long totalLost,
@CsvColumn(value = "WAGERED", order = 15)
long totalWagered,
@CsvColumn(value = "PAYOUT", order = 16)
long totalPayout,
@CsvColumn(value = "BETS", order = 18, converter = BetListConverter.class)
List<Bet> lastBets,
@CsvIgnore
boolean isStopped
) {
public double getRoi() {
return startBalance == 0 ? 0 : ((double) netProfit / startBalance) * 100;
}
public long getNetProfit() {
return balance - startBalance;
}
public double getRoiPercentage() {
if (startBalance == 0) return 0.0;
return ((double) getNetProfit() / startBalance) * 100.0;
}
public double getWinRatePercentage() {
if (roundNumber == 0) return 0.0;
return ((double) totalWon / roundNumber) * 100.0;
}
}
```

## com/traderoom/strategy/model/context/State.java

```java
package com.traderoom.strategy.model.context;
@Getter
@Setter
@ToString
public class State implements Serializable {
private long balance;
private final MarketData marketData;
public State(long startBalance, MarketData marketData) {
this.marketData = marketData;
balance = startBalance;
}
public State(long startBalance) {
marketData = new MarketData();
balance = startBalance;
}
public static State of(long startBalance, MarketData marketData) {
return new State(startBalance, marketData);
}
public static State of(long startBalance) {
return new State(startBalance);
}
public Spot registerSpot(Spot spot) {
marketData.addSpot(spot);
return spot;
}
}
```

## com/traderoom/strategy/model/SpotPrediction.java

```java
package com.traderoom.strategy.model;
@Builder
public record SpotPrediction(Spot spot, double probability) {
public static SpotPrediction of(Spot spot, double probability) {
return new SpotPrediction(spot, probability);
}
public static List<SpotPrediction> of(Spot spot1, double probability1, Spot spot2, double probability2) {
return List.of(new SpotPrediction(spot1, probability1), new SpotPrediction(spot2, probability2));
}
}
```

## com/traderoom/strategy/predictor/BayesianPredictor.java

```java
package com.traderoom.strategy.predictor;
public class BayesianPredictor implements Predictor {
private static final double PRIOR_WEIGHT = 1.0;
@Override
public List<SpotPrediction> getNextSpot(State state, Config config) {
Map<Spot, Integer> frequencies = state.getMarketData().getFrequencies();
long totalSpins = state.getMarketData().getCurrentLoopCount();
List<Spot> availableSpots = Spot.getAvailableList(config.rouletteType());
double denominator = totalSpins + (availableSpots.size() * PRIOR_WEIGHT);
return availableSpots.stream()
.map(spot -> {
double count = frequencies.getOrDefault(spot, 0);
double probability = (count + PRIOR_WEIGHT) / denominator;
return SpotPrediction.of(spot, probability);
})
.sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
.toList();
}
@Override
public List<BetTypePrediction> getNextType(State state, Config config) {
return List.of();
}
@Override
public ColorPrediction getNextColor(State state, Config config) {
return ColorPrediction.of();
}
}
```

## com/traderoom/strategy/predictor/CountPredictor.java

```java
package com.traderoom.strategy.predictor;
public class CountPredictor implements Predictor {
private final EnumMap<Spot, Long> spotMap;
private final EnumMap<BetType, Long> typeMap;
private long count;
public CountPredictor() {
spotMap = new EnumMap<>(Spot.class);
typeMap = new EnumMap<>(BetType.class);
count = 0;
}
private double calculate(double occurrences) {
return count == 0 ? 0.0 : occurrences / count;
}
@Override
public List<SpotPrediction> getNextSpot(State state, Config config) {
updateParameter(state, config);
return Spot.getAvailableList(config.rouletteType())
.stream()
.map(spot -> SpotPrediction.of(spot, calculate(spotMap.getOrDefault(spot, 0L))))
.toList();
}
@Override
public List<BetTypePrediction> getNextType(State state, Config config) {
updateParameter(state, config);
return BetType.getAvailableList(config.rouletteType())
.stream()
.map(type -> BetTypePrediction.of(type, calculate(typeMap.getOrDefault(type, 0L))))
.toList();
}
@Override
public ColorPrediction getNextColor(State state, Config config) {
updateParameter(state, config);
double red = 0;
double black = 0;
double green = 0;
for (Spot spot : Spot.getAvailableList(config.rouletteType())) {
long spotCount = spotMap.getOrDefault(spot, 0L);
if (spot.isRed()) {
red += spotCount;
} else if (spot.isBlack()) {
black += spotCount;
} else if (spot.isGreen()) {
green += spotCount;
}
}
return ColorPrediction.of(calculate(red), calculate(black), calculate(green));
}
private void updateParameter(State state, Config config) {
spotMap.merge(state.getMarketData().getLastSpot(), 1L, Long::sum);
for (BetType type : BetType.getAvailableList(config.rouletteType())) {
if (BetHelper.isWin(type, state.getMarketData().getLastSpot())) {
typeMap.merge(type, 1L, Long::sum);
}
}
count++;
}
}
```

## com/traderoom/strategy/predictor/CountPredictor2.java

```java
package com.traderoom.strategy.predictor;
public class CountPredictor2 implements Predictor {
@Override
public List<SpotPrediction> getNextSpot(State state, Config config) {
Map<Spot, Long> countMap = getSpotTypeCountMap(state);
double totalCount = state.getMarketData().getHistory().size();
return Spot.getAvailableList(config.rouletteType())
.stream()
.map(spot -> SpotPrediction.of(spot, calculate(countMap.getOrDefault(spot, 0L), totalCount)))
.toList();
}
@Override
public List<BetTypePrediction> getNextType(State state, Config config) {
EnumMap<BetType, Long> countMap = getBetTypeCountMap(state, config);
double totalCount = state.getMarketData().getHistory().size();
return BetType.getAvailableList(config.rouletteType())
.stream()
.map(type -> BetTypePrediction.of(type, calculate(countMap.getOrDefault(type, 0L), totalCount)))
.toList();
}
@Override
public ColorPrediction getNextColor(State state, Config config) {
EnumMap<Spot, Long> countMap = getSpotTypeCountMap(state);
List<Spot> availableSpots = Spot.getAvailableList(config.rouletteType());
if (availableSpots.isEmpty()) {
return ColorPrediction.of();
}
double red = 0;
double black = 0;
double green = 0;
for (Spot spot : availableSpots) {
long spotCount = countMap.getOrDefault(spot, 0L);
if (spot.isRed()) {
red += spotCount;
} else if (spot.isBlack()) {
black += spotCount;
} else if (spot.isGreen()) {
green += spotCount;
}
}
double totalCount = red + black + green;
return ColorPrediction.of(calculate(red, totalCount), calculate(black, totalCount), calculate(green, totalCount));
}
private EnumMap<Spot, Long> getSpotTypeCountMap(State state) {
EnumMap<Spot, Long> countMap = new EnumMap<>(Spot.class);
for (Spot spot : state.getMarketData().getHistory()) {
countMap.merge(spot, 1L, Long::sum);
}
return countMap;
}
private EnumMap<BetType, Long> getBetTypeCountMap(State state, Config config) {
EnumMap<BetType, Long> countMap = new EnumMap<>(BetType.class);
List<BetType> availableTypes = BetType.getAvailableList(config.rouletteType());
for (Spot spot : state.getMarketData().getHistory()) {
for (BetType betType : availableTypes) {
if (BetHelper.isWin(betType, spot)) {
countMap.merge(betType, 1L, Long::sum);
}
}
}
return countMap;
}
private double calculate(double occurrences, double totalCount) {
return totalCount == 0 ? 0.0 : occurrences / totalCount;
}
}
```

## com/traderoom/strategy/predictor/DifferencePredictor.java

```java
package com.traderoom.strategy.predictor;
public class DifferencePredictor implements Predictor {
@Override
public List<SpotPrediction> getNextSpot(State state, Config config) {
List<Spot> history = state.getMarketData().getHistory();
if (history.isEmpty()) {
return List.of();
}
double average = history.stream()
.mapToInt(Spot::getNumber)
.average()
.orElse(0.0);
int lastSpot = Objects.requireNonNull(state.getMarketData().getLastSpot()).getNumber();
Spot spot1 = Spot.getByNumber((int) (lastSpot + average));
Spot spot2 = Spot.getByNumber((int) (lastSpot - average));
return SpotPrediction.of(spot1, 0.5, spot2, 0.5);
}
@Override
public List<BetTypePrediction> getNextType(State state, Config config) {
return List.of();
}
@Override
public ColorPrediction getNextColor(State state, Config config) {
return ColorPrediction.of();
}
}
```

## com/traderoom/strategy/predictor/EfficientCountPredictor.java

```java
package com.traderoom.strategy.predictor;
public class EfficientCountPredictor implements Predictor {
public static EfficientCountPredictor of() {
return new EfficientCountPredictor();
}
@Override
public List<SpotPrediction> getNextSpot(State state, Config config) {
Map<Spot, Integer> frequencies = state.getMarketData().getFrequencies();
double size = state.getMarketData().getHistory().size();
if (size == 0) {
return List.of();
}
return Spot.getAvailableList(config.rouletteType())
.stream()
.map(spot -> SpotPrediction.of(spot, calculate(frequencies.getOrDefault(spot, 0), size)))
.toList();
}
@Override
public List<BetTypePrediction> getNextType(State state, Config config) {
Map<Spot, Integer> frequencies = state.getMarketData().getFrequencies();
double size = state.getMarketData().getHistory().size();
if (size == 0) {
return List.of();
}
List<BetType> types = BetType.getAvailableList(config.rouletteType());
EnumMap<BetType, Long> betMap = new EnumMap<>(BetType.class);
EnumMap<Spot, List<BetType>> spotMap = new EnumMap<>(Spot.class);
for (BetType type : types) {
for (Spot spot : type.getWinning()) {
spotMap.computeIfAbsent(spot, _ -> new ArrayList<>()).add(type);
}
}
for (Map.Entry<Spot, Integer> entry : frequencies.entrySet()) {
List<BetType> winning = spotMap.get(entry.getKey());
if (winning != null) {
for (BetType type : winning) {
betMap.merge(type, Long.valueOf(entry.getValue()), Long::sum);
}
}
}
return types.stream()
.map(type -> BetTypePrediction.of(type, calculate(betMap.getOrDefault(type, 0L), size)))
.toList();
}
@Override
public ColorPrediction getNextColor(State state, Config config) {
Map<Spot, Integer> frequencies = state.getMarketData().getFrequencies();
double size = state.getMarketData().getHistory().size();
if (size == 0) {
return ColorPrediction.of();
}
double red = frequencies.entrySet()
.stream()
.filter(entry -> entry.getKey().isRed())
.mapToDouble(Map.Entry::getValue)
.sum();
double black = frequencies.entrySet()
.stream()
.filter(entry -> entry.getKey().isBlack())
.mapToDouble(Map.Entry::getValue)
.sum();
double green = frequencies.entrySet()
.stream()
.filter(entry -> entry.getKey().isGreen())
.mapToDouble(Map.Entry::getValue)
.sum();
return ColorPrediction.of(calculate(red, size), calculate(black, size), calculate(green, size));
}
private double calculate(double occurrences, double totalCount) {
return totalCount == 0 ? 0.0 : occurrences / totalCount;
}
}
```

## com/traderoom/strategy/predictor/EnsemblePredictor.java

```java
package com.traderoom.strategy.predictor;
public class EnsemblePredictor implements Predictor {
private final List<Predictor> predictors;
public EnsemblePredictor(List<Predictor> predictors) {
this.predictors = List.copyOf(predictors);
}
public static EnsemblePredictor createDefaultEnsemble() {
return new EnsemblePredictor(List.of(
new EfficientCountPredictor(),
new MultiOrderMarkovPredictor(),
new PatternPredictor()
));
}
@Override
public List<SpotPrediction> getNextSpot(State state, Config config) {
EnumMap<Spot, Double> enumMap = new EnumMap<>(Spot.class);
int active = 0;
for (Predictor predictor : predictors) {
List<SpotPrediction> predictions = predictor.getNextSpot(state, config);
if (!predictions.isEmpty()) {
active++;
predictions.forEach(sp -> enumMap.merge(sp.spot(), sp.probability(), Double::sum));
}
}
if (active == 0 || enumMap.isEmpty()) {
return List.of();
}
final int fnActive = active;
List<SpotPrediction> result = enumMap.entrySet()
.stream()
.map(entry -> SpotPrediction.of(entry.getKey(), entry.getValue() / fnActive))
.toList();
final double sum = result.stream()
.mapToDouble(SpotPrediction::probability)
.sum();
return (sum > 0) ? result.stream()
.map(item -> SpotPrediction.of(item.spot(), item.probability() / sum))
.toList()
: List.of();
}
@Override
public List<BetTypePrediction> getNextType(State state, Config config) {
EnumMap<BetType, Double> enumMap = new EnumMap<>(BetType.class);
int active = 0;
for (Predictor predictor : predictors) {
List<BetTypePrediction> list = predictor.getNextType(state, config);
if (!list.isEmpty()) {
active++;
list.forEach(btp -> enumMap.merge(btp.type(), btp.probability(), Double::sum));
}
}
if (active == 0 || enumMap.isEmpty()) {
return List.of();
}
final int fnActive = active;
List<BetTypePrediction> result = enumMap.entrySet().stream()
.map(entry -> BetTypePrediction.of(entry.getKey(), entry.getValue() / fnActive))
.toList();
final double sum = result.stream()
.mapToDouble(BetTypePrediction::probability)
.sum();
return (0 < sum) ? result.stream()
.map(item -> BetTypePrediction.of(item.type(), item.probability() / sum))
.toList()
: List.of();
}
@Override
public ColorPrediction getNextColor(State state, Config config) {
double red = 0L;
double black = 0L;
double green = 0L;
int active = 0;
for (Predictor predictor : predictors) {
ColorPrediction color = predictor.getNextColor(state, config);
if (color != null && (color.red() > 0 || color.black() > 0 || color.green() > 0)) {
active++;
red += color.red();
black += color.black();
green += color.green();
}
}
if (active == 0) {
return ColorPrediction.of();
}
return ColorPrediction.of(red / active, black / active, green / active);
}
}
```

## com/traderoom/strategy/predictor/ImprovedMarkovPredictor.java

```java
package com.traderoom.strategy.predictor;
public class ImprovedMarkovPredictor implements Predictor {
private final int size;
private final Map<Spot, Map<Spot, Long>> spots;
private final Map<BetType, Map<BetType, Long>> types;
public ImprovedMarkovPredictor() {
spots = new ConcurrentHashMap<>();
types = new ConcurrentHashMap<>();
size = 2;
}
public void updateModel(Spot[] lasts, RouletteType type) {
if (lasts == null || lasts.length < 2) {
return;
}
Spot spot1 = lasts[0];
Spot spot2 = lasts[1];
spots.computeIfAbsent(spot1, k -> new ConcurrentHashMap<>())
.merge(spot2, 1L, Long::sum);
List<BetType> types1 = findTypes(spot1, type);
List<BetType> types2 = findTypes(spot2, type);
for (BetType type1 : types1) {
Map<BetType, Long> map = types.computeIfAbsent(type1, _ -> new ConcurrentHashMap<>());
for (BetType type2 : types2) {
map.merge(type2, 1L, Long::sum);
}
}
}
@Override
public List<BetTypePrediction> getNextType(State state, Config config) {
if (state.getMarketData().getHistory().size() < size) {
return List.of();
}
List<Spot> history = state.getMarketData().getHistory();
updateModel(new Spot[]{history.get(history.size() - 2), history.getLast()}, config.rouletteType());
List<BetType> betTypes = findTypes(state.getMarketData().getLastSpot(), config.rouletteType());
Map<BetType, Long> collect = betTypes.stream()
.flatMap(lastType -> types.getOrDefault(lastType, Map.of()).entrySet().stream())
.collect(Collectors.groupingBy(Map.Entry::getKey, Collectors.summingLong(Map.Entry::getValue)));
if (collect.isEmpty()) {
return List.of();
}
final double sum = collect.values()
.stream()
.mapToDouble(Long::doubleValue)
.sum();
return (sum == 0) ? List.of()
: collect.entrySet().stream()
.map(entry -> BetTypePrediction.of(entry.getKey(), entry.getValue() / sum))
.filter(item -> item.probability() > 0)
.sorted((p1, p2) -> Double.compare(p2.probability(), p1.probability()))
.toList();
}
@Override
public List<SpotPrediction> getNextSpot(State state, Config config) {
if (state.getMarketData().getHistory().size() < size) {
return List.of();
}
List<Spot> history = state.getMarketData().getHistory();
updateModel(new Spot[]{history.get(history.size() - 2), history.getLast()}, config.rouletteType());
Map<Spot, Long> map = spots.getOrDefault(state.getMarketData().getLastSpot(), Map.of());
if (map.isEmpty()) {
return List.of();
}
final double sum = map.values()
.stream()
.mapToDouble(Long::doubleValue)
.sum();
return (sum == 0) ? List.of()
: map.entrySet().stream()
.map(entry -> SpotPrediction.of(entry.getKey(), entry.getValue() / sum))
.sorted((p1, p2) -> Double.compare(p2.probability(), p1.probability()))
.toList();
}
@Override
public ColorPrediction getNextColor(State state, Config config) {
List<SpotPrediction> list = getNextSpot(state, config);
if (list.isEmpty()) {
return ColorPrediction.of();
}
double red = list.stream()
.filter(item -> item.spot().isRed())
.mapToDouble(SpotPrediction::probability)
.sum();
double black = list.stream()
.filter(item -> item.spot().isBlack())
.mapToDouble(SpotPrediction::probability)
.sum();
double green = list.stream()
.filter(item -> item.spot().isGreen())
.mapToDouble(SpotPrediction::probability)
.sum();
return ColorPrediction.of(red, black, green);
}
private List<BetType> findTypes(Spot spot, RouletteType rouletteType) {
return BetType.getAvailableList(rouletteType).stream()
.filter(type -> BetHelper.isWin(type, spot))
.toList();
}
}
```

## com/traderoom/strategy/predictor/MarkovPredictor.java

```java
package com.traderoom.strategy.predictor;
public class MarkovPredictor implements Predictor {
private final int min;
private final double probability;
private final Map<Spot, Map<Spot, Long>> spotMap;
private final Map<BetType, Map<BetType, Long>> typeMap;
private long transitionCount;
public MarkovPredictor() {
spotMap = new ConcurrentHashMap<>();
typeMap = new ConcurrentHashMap<>();
min = 2;
probability = 0.0;
transitionCount = 0;
}
@Override
public List<SpotPrediction> getNextSpot(State state, Config config) {
if (state.getMarketData().getHistory().size() < min) {
return List.of();
}
updateParameters(state, config);
Map<Spot, Long> transitions = spotMap.getOrDefault(state.getMarketData().getLastSpot(), Collections.emptyMap());
List<Spot> list = Spot.getAvailableList(config.rouletteType());
if (list.isEmpty()) {
return List.of();
}
List<SpotPrediction> predictions = new ArrayList<>(list.size());
for (Spot spot : list) {
double prob = calculate(transitions.getOrDefault(spot, 0L));
if (prob > 0) {
predictions.add(SpotPrediction.of(spot, prob));
}
}
return List.copyOf(predictions);
}
@Override
public List<BetTypePrediction> getNextType(State state, Config config) {
if (state.getMarketData().getHistory().size() < min) {
return List.of();
}
updateParameters(state, config);
List<BetType> types = BetType.getAvailableList(config.rouletteType());
List<BetType> lasts = new ArrayList<>();
for (BetType type : types) {
if (BetHelper.isWin(type, state.getMarketData().getLastSpot())) {
lasts.add(type);
}
}
if (types.isEmpty()) {
return List.of();
}
List<BetTypePrediction> predictions = new ArrayList<>();
for (BetType lastType : lasts) {
Map<BetType, Long> transitions = typeMap.getOrDefault(lastType, Collections.emptyMap());
for (BetType nextType : types) {
double prob = calculate(transitions.getOrDefault(nextType, 0L));
if (prob > 0) {
predictions.add(BetTypePrediction.of(nextType, prob));
}
}
}
return List.copyOf(predictions);
}
@Override
public ColorPrediction getNextColor(State state, Config config) {
if (state.getMarketData().getHistory().size() < min) {
return ColorPrediction.of(probability, probability, probability);
}
Map<Spot, Long> transitions = spotMap.getOrDefault(state.getMarketData().getLastSpot(), Collections.emptyMap());
double red = 0;
double black = 0;
double green = 0;
for (Map.Entry<Spot, Long> entry : transitions.entrySet()) {
Spot spot = entry.getKey();
long count = entry.getValue();
if (spot.isRed()) {
red += count;
} else if (spot.isBlack()) {
black += count;
} else if (spot.isGreen()) {
green += count;
}
}
double total = red + black + green;
return ColorPrediction.of(total == 0 ? probability : red / total,
total == 0 ? probability : black / total,
total == 0 ? probability : green / total);
}
private void updateParameters(State state, Config config) {
if (state.getMarketData().getHistory().size() < min) {
return;
}
List<Spot> history = state.getMarketData().getHistory();
Spot spot1 = history.get(history.size() - 2);
Spot spot2 = state.getMarketData().getLastSpot();
spotMap.computeIfAbsent(spot1, _ -> new ConcurrentHashMap<>())
.merge(spot2, 1L, Long::sum);
List<BetType> list1 = new ArrayList<>();
List<BetType> list2 = new ArrayList<>();
for (BetType type : BetType.getAvailableList(config.rouletteType())) {
if (BetHelper.isWin(type, spot1)) {
list1.add(type);
}
if (BetHelper.isWin(type, spot2)) {
list2.add(type);
}
}
for (BetType type1 : list1) {
Map<BetType, Long> transitions = typeMap.computeIfAbsent(type1, _ -> new ConcurrentHashMap<>());
for (BetType type2 : list2) {
transitions.merge(type2, 1L, Long::sum);
}
}
transitionCount++;
}
private double calculate(long occurrences) {
return transitionCount == 0 ? probability : (double) occurrences / transitionCount;
}
public void reset() {
spotMap.clear();
typeMap.clear();
transitionCount = 0;
}
}
```

## com/traderoom/strategy/predictor/MarkovPredictor2.java

```java
package com.traderoom.strategy.predictor;
public class MarkovPredictor2 implements Predictor {
private final int min;
private final double probability;
private final EnumMap<Spot, EnumMap<Spot, Long>> spotMap;
private final EnumMap<BetType, EnumMap<BetType, Long>> typeMap;
private long transitions;
public MarkovPredictor2() {
spotMap = new EnumMap<>(Spot.class);
typeMap = new EnumMap<>(BetType.class);
min = 2;
probability = 0.0;
transitions = 0;
}
@Override
public List<SpotPrediction> getNextSpot(State state, Config config) {
if (state.getMarketData().getHistory().size() < min) {
return List.of();
}
updateMarkovModel(state, config);
EnumMap<Spot, Long> enumMap = spotMap.getOrDefault(state.getMarketData().getLastSpot(), new EnumMap<>(Spot.class));
return Spot.getAvailableList(config.rouletteType())
.stream()
.map(spot -> SpotPrediction.of(spot, calculate(enumMap.getOrDefault(spot, 0L))))
.filter(prediction -> prediction.probability() > 0)
.toList();
}
@Override
public List<BetTypePrediction> getNextType(State state, Config config) {
if (state.getMarketData().getHistory().size() < min) {
return List.of();
}
updateMarkovModel(state, config);
List<BetType> list = BetType.getAvailableList(config.rouletteType());
List<BetType> filtered = list.stream()
.filter(type -> BetHelper.isWin(type, state.getMarketData().getLastSpot()))
.toList();
if (filtered.isEmpty()) {
return List.of();
}
return list.stream()
.flatMap(item -> filtered.stream()
.map(next -> BetTypePrediction.of(next,
calculate(typeMap.getOrDefault(item, new EnumMap<>(BetType.class)).getOrDefault(next, 0L))))
.filter(prediction -> prediction.probability() > 0))
.toList();
}
@Override
public ColorPrediction getNextColor(State state, Config config) {
return ColorPrediction.of(probability);
}
private void updateMarkovModel(State state, Config config) {
if (state.getMarketData().getHistory().size() < min) {
return;
}
for (int i = 0; i < state.getMarketData().getHistory().size() - 1; i++) {
Spot spot1 = state.getMarketData().getHistory().get(i);
Spot spot2 = state.getMarketData().getHistory().get(i + 1);
spotMap.computeIfAbsent(spot1, k -> new EnumMap<>(Spot.class))
.merge(spot2, 1L, Long::sum);
}
for (int i = 0; i < state.getMarketData().getHistory().size() - 1; i++) {
Spot spot1 = state.getMarketData().getHistory().get(i);
Spot spot2 = state.getMarketData().getHistory().get(i + 1);
List<BetType> list1 = BetType.getAvailableList(config.rouletteType())
.stream()
.filter(type -> BetHelper.isWin(type, spot1))
.toList();
List<BetType> list2 = BetType.getAvailableList(config.rouletteType())
.stream()
.filter(type -> BetHelper.isWin(type, spot2))
.toList();
for (BetType type1 : list1) {
for (BetType type2 : list2) {
typeMap.computeIfAbsent(type1, k -> new EnumMap<>(BetType.class))
.merge(type2, 1L, Long::sum);
}
}
}
transitions = state.getMarketData().getHistory().size() - 1L;
}
private double calculate(long occurrences) {
return transitions == 0 ? probability : (double) occurrences / transitions;
}
public void reset() {
spotMap.clear();
typeMap.clear();
transitions = 0;
}
}
```

## com/traderoom/strategy/predictor/MultiOrderMarkovPredictor.java

```java
package com.traderoom.strategy.predictor;
public class MultiOrderMarkovPredictor implements Predictor {
private final double order1;
private final double order2;
private final int min;
private final Map<Spot, Map<Spot, Long>> order1Map;
private final Map<String, Map<Spot, Long>> order2Map;
private int processed;
public MultiOrderMarkovPredictor() {
order1 = 0.35;
order2 = 0.65;
min = 3;
order1Map = new EnumMap<>(Spot.class);
order2Map = new HashMap<>();
}
public static MultiOrderMarkovPredictor of(){
return new MultiOrderMarkovPredictor();
}
@Override
public List<SpotPrediction> getNextSpot(State state, Config config) {
updateModel(state);
List<Spot> history = state.getMarketData().getHistory();
if (history.size() < min) {
return List.of();
}
Spot lastSpot = history.getLast();
Spot prevSpot = history.get(history.size() - 2);
Map<Spot, Double> scores = new EnumMap<>(Spot.class);
Map<Spot, Long> o1Candidates = order1Map.getOrDefault(lastSpot, Map.of());
double o1Total = o1Candidates.values()
.stream()
.mapToLong(Long::longValue)
.sum();
if (o1Total > 0) {
o1Candidates.forEach((spot, count) ->
scores.merge(spot, (count / o1Total) * order1, Double::sum));
}
String keyOrder2 = makeKey(prevSpot, lastSpot);
Map<Spot, Long> o2Candidates = order2Map.getOrDefault(keyOrder2, Map.of());
double o2Total = o2Candidates.values()
.stream()
.mapToLong(Long::longValue)
.sum();
if (o2Total > 0) {
o2Candidates.forEach((spot, count) ->
scores.merge(spot, (count / o2Total) * order2, Double::sum));
}
if (scores.isEmpty()) {
return List.of();
}
return normalize(scores);
}
private void updateModel(State state) {
List<Spot> history = state.getMarketData().getHistory();
int currentSize = history.size();
if (currentSize < min || currentSize <= processed) {
return;
}
int startIndex = Math.max(2, processed);
for (int i = startIndex; i < currentSize; i++) {
Spot s1 = history.get(i - 2);
Spot s2 = history.get(i - 1);
Spot target = history.get(i);
order1Map.computeIfAbsent(s2, k -> new EnumMap<>(Spot.class))
.merge(target, 1L, Long::sum);
String key = makeKey(s1, s2);
order2Map.computeIfAbsent(key, k -> new EnumMap<>(Spot.class))
.merge(target, 1L, Long::sum);
}
processed = currentSize;
}
private String makeKey(Spot s1, Spot s2) {
return s1.name() + "|" + s2.name();
}
private List<SpotPrediction> normalize(Map<Spot, Double> scores) {
double sum = scores.values()
.stream()
.mapToDouble(Double::doubleValue)
.sum();
return (sum == 0) ? List.of()
: scores.entrySet()
.stream()
.map(entry -> SpotPrediction.of(entry.getKey(), entry.getValue() / sum))
.sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
.toList();
}
@Override
public List<BetTypePrediction> getNextType(State state, Config config) {
return List.of();
}
@Override
public ColorPrediction getNextColor(State state, Config config) {
List<SpotPrediction> list = getNextSpot(state, config);
double red = 0;
double black = 0;
double green = 0;
for (SpotPrediction p : list) {
if (p.spot().isRed()) red += p.probability();
else if (p.spot().isBlack()) black += p.probability();
else if (p.spot().isGreen()) green += p.probability();
}
return ColorPrediction.of(red, black, green);
}
}
```

## com/traderoom/strategy/predictor/PatternPredictor.java

```java
package com.traderoom.strategy.predictor;
public class PatternPredictor implements Predictor {
private final double hotSpotWeight;
private final double coldSpotWeight;
private final double neverSeenWeight;
private final double consecutiveWeight;
private final double repeatingPatternWeight;
private final double lastSpotWeight;
private final int window;
private final int cold;
private final int min;
private final double probability;
public PatternPredictor() {
hotSpotWeight = 1.2;
coldSpotWeight = 0.8;
neverSeenWeight = 0.5;
consecutiveWeight = 1.3;
repeatingPatternWeight = 1.1;
lastSpotWeight = 0.7;
window = 10;
cold = 15;
min = 4;
probability = 0.0;
}
public static PatternPredictor of() {
return new PatternPredictor();
}
@Override
public List<SpotPrediction> getNextSpot(State state, Config config) {
if (state.getMarketData().getHistory().isEmpty()) {
return List.of();
}
EnumMap<Spot, Double> baseFrequency = calculateBaseFrequency(state);
EnumMap<Spot, Double> hotColdWeights = calculateHotColdWeights(state, config);
EnumMap<Spot, Double> patternWeights = calculatePatternWeights(state, config);
List<Spot> list = Spot.getAvailableList(config.rouletteType());
if (list.isEmpty()) {
return List.of();
}
List<SpotPrediction> predictions = list.stream()
.map(spot -> SpotPrediction.of(spot, (baseFrequency.getOrDefault(spot, probability)
* hotColdWeights.getOrDefault(spot, 1.0)
* patternWeights.getOrDefault(spot, 1.0))))
.filter(prediction -> prediction.probability() > 0)
.toList();
return normalizeProbabilities(predictions);
}
@Override
public List<BetTypePrediction> getNextType(State state, Config config) {
return List.of();
}
@Override
public ColorPrediction getNextColor(State state, Config config) {
return ColorPrediction.builder()
.red(probability)
.black(probability)
.green(probability)
.build();
}
private EnumMap<Spot, Double> calculateBaseFrequency(State state) {
EnumMap<Spot, Double> frequency = new EnumMap<>(Spot.class);
Map<Spot, Integer> spotCount = state.getMarketData().getFrequencies();
long totalCount = spotCount.values().stream().mapToLong(Integer::longValue).sum();
if (totalCount == 0) {
return frequency;
}
spotCount.forEach((spot, count) -> frequency.put(spot, (double) count / totalCount));
return frequency;
}
private EnumMap<Spot, Double> calculateHotColdWeights(State state, Config config) {
EnumMap<Spot, Double> weights = new EnumMap<>(Spot.class);
List<Spot> history = state.getMarketData().getHistory();
int historySize = history.size();
int wind = Math.min(window, historySize);
EnumMap<Spot, Integer> recentCount = new EnumMap<>(Spot.class);
EnumMap<Spot, Integer> lastAppearance = new EnumMap<>(Spot.class);
for (int i = 0; i < historySize; i++) {
Spot spot = history.get(i);
lastAppearance.put(spot, i);
if (i >= historySize - wind) {
recentCount.merge(spot, 1, Integer::sum);
}
}
for (Spot spot : Spot.getAvailableList(config.rouletteType())) {
double weight = 1.0;
int recentAppearances = recentCount.getOrDefault(spot, 0);
if (recentAppearances > 1) {
weight *= hotSpotWeight;
}
Integer lastPos = lastAppearance.get(spot);
if (lastPos != null) {
int gapSinceLastAppearance = historySize - lastPos - 1;
if (gapSinceLastAppearance > cold) {
weight *= coldSpotWeight;
}
} else {
weight *= neverSeenWeight;
}
weights.put(spot, weight);
}
return weights;
}
private EnumMap<Spot, Double> calculatePatternWeights(State state, Config config) {
EnumMap<Spot, Double> weights = new EnumMap<>(Spot.class);
List<Spot> list = Spot.getAvailableList(config.rouletteType());
if (state.getMarketData().getHistory().size() < min - 1) {
list.forEach(spot -> weights.put(spot, 1.0));
return weights;
}
Spot lastSpot = state.getMarketData().getLastSpot();
assert lastSpot != null;
for (Spot spot : list) {
double weight = 1.0;
if (isConsecutiveNumber(lastSpot, spot)) {
weight *= consecutiveWeight;
}
if (hasRepeatingPattern(state, spot)) {
weight *= repeatingPatternWeight;
}
if (lastSpot == spot) {
weight *= lastSpotWeight;
}
weights.put(spot, weight);
}
return weights;
}
private boolean isConsecutiveNumber(Spot spot1, Spot spot2) {
int num1 = spot1.getNumber();
int num2 = spot2.getNumber();
return num1 > 0 && num2 > 0 && Math.abs(num1 - num2) == 1;
}
private boolean hasRepeatingPattern(State state, Spot targetSpot) {
List<Spot> history = state.getMarketData().getHistory();
if (history.size() < min) {
return false;
}
int size = history.size();
return history.get(size - 3) == history.get(size - 1) && targetSpot == history.get(size - 2);
}
private List<SpotPrediction> normalizeProbabilities(List<SpotPrediction> predictions) {
double sum = predictions.stream()
.mapToDouble(SpotPrediction::probability)
.sum();
boolean bool = (sum <= 0 || Double.isNaN(sum) || Double.isInfinite(sum));
return predictions.stream().map(p -> SpotPrediction.of(p.spot(), bool ? probability : p.probability() / sum)).toList();
}
}
```

## com/traderoom/strategy/predictor/Predictor.java

```java
package com.traderoom.strategy.predictor;
public interface Predictor  extends Serializable {
List<SpotPrediction> getNextSpot(State state, Config config);
List<BetTypePrediction> getNextType(State state, Config config);
ColorPrediction getNextColor(State state, Config config);
}
```

## com/traderoom/strategy/predictor/RandomPredictor.java

```java
package com.traderoom.strategy.predictor;
public class RandomPredictor implements Predictor {
private final double probability;
private final Random random;
public RandomPredictor() {
random = new Random();
probability = 1.0;
}
@Override
public List<SpotPrediction> getNextSpot(State state, Config config) {
List<Spot> list = Spot.getAvailableList(config.rouletteType());
if (list.isEmpty()) {
return List.of();
}
return normalize(list.stream()
.map(spot -> SpotPrediction.of(spot, random.nextDouble()))
.toList());
}
@Override
public List<BetTypePrediction> getNextType(State state, Config config) {
List<BetType> list = BetType.getAvailableList(config.rouletteType());
if (list.isEmpty()) {
return List.of();
}
return normalizeBetType(list.stream()
.map(betType -> BetTypePrediction.of(betType, random.nextDouble()))
.toList());
}
@Override
public ColorPrediction getNextColor(State state, Config config) {
return ColorPrediction.of(probability / 3);
}
private List<SpotPrediction> normalize(List<SpotPrediction> predictions) {
double sum = predictions.stream()
.mapToDouble(SpotPrediction::probability)
.sum();
boolean bool = (sum <= 0 || Double.isNaN(sum) || Double.isInfinite(sum));
double prob = probability / predictions.size();
return predictions.stream()
.map(item -> SpotPrediction.of(item.spot(), bool ? prob : item.probability() / sum))
.toList();
}
private List<BetTypePrediction> normalizeBetType(List<BetTypePrediction> predictions) {
double sum = predictions.stream()
.mapToDouble(BetTypePrediction::probability)
.sum();
boolean bool = (sum <= 0 || Double.isNaN(sum) || Double.isInfinite(sum));
double prob = probability / predictions.size();
return predictions.stream()
.map(item -> BetTypePrediction.of(item.type(), bool ? prob : item.probability() / sum))
.toList();
}
}
```

## com/traderoom/strategy/predictor/RestrictedPredictor.java

```java
package com.traderoom.strategy.predictor;
public class RestrictedPredictor implements Predictor {
private final Predictor delegate;
@Setter
private Set<Spot> bannedSpots = new HashSet<>();
@Setter
private Set<Spot> allowedSpots = new HashSet<>();
public RestrictedPredictor() {
this.delegate = new RandomPredictor();
}
public RestrictedPredictor(Predictor delegate) {
this.delegate = delegate;
}
@Override
public List<SpotPrediction> getNextSpot(State state, Config config) {
List<SpotPrediction> rawPredictions = delegate.getNextSpot(state, config);
if (rawPredictions.isEmpty()) return List.of();
return rawPredictions.stream()
.filter(p -> isAllowed(p.spot()))
.toList();
}
@Override
public List<BetTypePrediction> getNextType(State state, Config config) {
return delegate.getNextType(state, config);
}
@Override
public ColorPrediction getNextColor(State state, Config config) {
return delegate.getNextColor(state, config);
}
private boolean isAllowed(Spot spot) {
if (!allowedSpots.isEmpty()) {
return allowedSpots.contains(spot);
}
if (!bannedSpots.isEmpty()) {
return !bannedSpots.contains(spot);
}
return true;
}
public void ban(Spot... spots) {
this.bannedSpots = new HashSet<>(Arrays.asList(spots));
}
public void allowOnly(Spot... spots) {
this.allowedSpots = new HashSet<>(Arrays.asList(spots));
}
public void clearRestrictions() {
this.bannedSpots.clear();
this.allowedSpots.clear();
}
}
```

## com/traderoom/strategy/predictor/SectorMomentumPredictor.java

```java
package com.traderoom.strategy.predictor;
public class SectorMomentumPredictor implements Predictor {
private final int historyDepth;
private final int sectorWidth;
public SectorMomentumPredictor() {
this.historyDepth = 50;
this.sectorWidth = 2;
}
@Override
public List<SpotPrediction> getNextSpot(State state, Config config) {
List<Spot> history = state.getMarketData().getHistory();
if (history.size() < 2) return List.of();
RouletteType type = config.rouletteType();
Spot[] layout = Spot.getWheelLayouts().get(type);
if (layout == null) return List.of();
int wheelSize = layout.length;
Map<Integer, Double> distanceFrequency = new HashMap<>();
int start = Math.max(0, history.size() - historyDepth);
for (int i = start; i < history.size() - 1; i++) {
Spot current = history.get(i);
Spot next = history.get(i + 1);
int pos1 = current.getWheelPosition(type);
int pos2 = next.getWheelPosition(type);
if (pos1 == -1 || pos2 == -1) continue;
int distance = (pos2 - pos1 + wheelSize) % wheelSize;
for (int offset = -1; offset <= 1; offset++) {
int key = (distance + offset + wheelSize) % wheelSize;
distanceFrequency.merge(key, 1.0 - (Math.abs(offset) * 0.3), Double::sum);
}
}
if (distanceFrequency.isEmpty()) return List.of();
int bestDistance = distanceFrequency.entrySet().stream()
.max(Map.Entry.comparingByValue())
.map(Map.Entry::getKey)
.orElse(0);
Spot lastSpot = state.getMarketData().getLastSpot();
int lastPos = lastSpot.getWheelPosition(type);
int targetPos = (lastPos + bestDistance) % wheelSize;
List<SpotPrediction> predictions = new ArrayList<>();
double totalWeight = 0;
for (int i = -sectorWidth; i <= sectorWidth; i++) {
int p = (targetPos + i + wheelSize) % wheelSize;
Spot spot = layout[p];
double prob = 1.0 - (Math.abs(i) * 0.15);
predictions.add(SpotPrediction.of(spot, prob));
totalWeight += prob;
}
final double finalWeight = totalWeight;
return predictions.stream()
.map(p -> SpotPrediction.of(p.spot(), p.probability() / finalWeight))
.toList();
}
@Override
public List<BetTypePrediction> getNextType(State state, Config config) {
return List.of();
}
@Override
public ColorPrediction getNextColor(State state, Config config) {
return ColorPrediction.of();
}
}
```

## com/traderoom/strategy/risk/RiskManager.java

```java
package com.traderoom.strategy.risk;
public interface RiskManager  extends Serializable {
List<Bet> apply(List<Bet> bets, long currentBalance, State state, Config config);
void updateState(long currentBalance);
}
```

## com/traderoom/strategy/risk/ZoneRiskManager.java

```java
package com.traderoom.strategy.risk;
public class ZoneRiskManager implements RiskManager {
private static final double NORMAL_ZONE_BET_CAP_PERCENTAGE = 0.05;
private static final int PENALTY_BOX_DURATION = 10;
private final long profitZoneThreshold;
private final long dangerZoneThreshold;
private boolean inPenaltyBox = false;
private int penaltyRoundsRemaining = 0;
public ZoneRiskManager(long startBalance) {
profitZoneThreshold = (long) (startBalance * 1.10);
dangerZoneThreshold = (long) (startBalance * 0.90);
}
@Override
public List<Bet> apply(List<Bet> bets, long currentBalance, State state, Config config) {
if (inPenaltyBox) {
return List.of();
}
if (currentBalance > dangerZoneThreshold && currentBalance < profitZoneThreshold) {
long tValue = BetHelper.getTotalBetValue(bets);
long bCapacity = (long) (currentBalance * NORMAL_ZONE_BET_CAP_PERCENTAGE);
if (tValue > bCapacity) {
return scale(bets, bCapacity);
}
}
long tValue = BetHelper.getTotalBetValue(bets);
if (tValue > config.tableLimit()) {
return scale(bets, config.tableLimit());
}
return bets;
}
@Override
public void updateState(long currentBalance) {
if (inPenaltyBox) {
penaltyRoundsRemaining--;
if (penaltyRoundsRemaining <= 0) {
inPenaltyBox = false;
}
} else if (currentBalance <= dangerZoneThreshold) {
inPenaltyBox = true;
penaltyRoundsRemaining = PENALTY_BOX_DURATION;
}
}
private List<Bet> scale(List<Bet> bets, long limit) {
long tValue = BetHelper.getTotalBetValue(bets);
if (tValue == 0) return bets;
final double scaling = (double) limit / tValue;
List<Bet> list = new ArrayList<>(bets.size());
for (Bet item : bets) {
long value = (long) (item.value() * scaling);
if (value >= 1L) {
list.add(Bet.of(item.type(), value));
}
}
return list;
}
}
```

## com/traderoom/strategy/runner/BetRunner.java

```java
package com.traderoom.strategy.runner;
public class BetRunner implements IRunner {
private final UUID id = UUID.randomUUID();
private final IStrategy strategy;
private final State state;
private transient Snapshot snapshot;
private boolean lastApplied;
public BetRunner(IStrategy strategy) {
this.strategy = strategy;
state = State.of(strategy.getStartBalance());
}
@Override
public Snapshot apply(Spot spot) {
if (lastApplied) {
return canContinue() ? applyInternal(spot) : stop();
}
return snapshot;
}
private Snapshot applyInternal(Spot spot) {
snapshot = strategy.playTurn(spot, state);
return snapshot;
}
@Override
public Snapshot snapshot() {
snapshot = strategy.snapshot();
return snapshot;
}
@Override
public boolean canContinue() {
lastApplied = strategy.canContinue(state);
return lastApplied;
}
@Override
public boolean isLastApplied() {
return lastApplied;
}
@Override
public State getState() {
return state;
}
@Override
public Snapshot stop() {
snapshot = strategy.endGame(state);
return snapshot;
}
@Override
public boolean isLive() {
return strategy.isLive();
}
@Override
public IStrategy getStrategy() {
return strategy;
}
@Override
public final int hashCode() {
return Objects.hash(id);
}
@Override
public final boolean equals(Object obj) {
if (this == obj) return true;
if (obj == null || getClass() != obj.getClass()) return false;
BetRunner that = (BetRunner) obj;
return Objects.equals(id, that.id);
}
}
```

## com/traderoom/strategy/runner/BetRunnerManager.java

```java
package com.traderoom.strategy.runner;
public class BetRunnerManager implements RunnerManager {
private final Map<IRunner, Boolean> runners = new ConcurrentHashMap<>();
public BetRunnerManager() {
this(new ArrayList<>());
}
public BetRunnerManager(List<IRunner> strategies) {
strategies.forEach(this::add);
}
@Override
public Map<IRunner, Snapshot> apply(Spot spot) {
Map<IRunner, Snapshot> roundResults = new HashMap<>();
for (Map.Entry<IRunner, Boolean> entry : runners.entrySet()) {
IRunner runner = entry.getKey();
if (Boolean.FALSE.equals(entry.getValue())) continue;
roundResults.put(runner, runner.apply(spot));
runners.put(runner, runner.canContinue());
}
return roundResults;
}
@Override
public Map<IRunner, Snapshot> snapshot() {
Map<IRunner, Snapshot> map = HashMap.newHashMap(runners.size());
runners.keySet().forEach(runner -> map.put(runner, runner.snapshot()));
return map;
}
@Override
public boolean canContinue() {
return runners.entrySet().stream()
.anyMatch(entry -> entry.getValue() && !entry.getKey().canContinue());
}
@Override
public boolean allIsLive() {
return runners.values().stream().allMatch(Boolean::booleanValue);
}
@Override
public Set<IRunner> all() {
return new HashSet<>(runners.keySet());
}
@Override
public List<IRunner> add(List<IRunner> strategies) {
strategies.forEach(this::add);
return strategies;
}
@Override
public IRunner add(IRunner runner) {
runners.put(runner, !runner.isLive());
return runner;
}
@Override
public IRunner disable(IRunner runner) {
runners.computeIfPresent(runner, (_, _) -> false);
return runner;
}
@Override
public boolean exists(IRunner runner) {
return runners.containsKey(runner);
}
@Override
public boolean remove(IRunner runner) {
return runners.remove(runner) != null;
}
}
```

## com/traderoom/strategy/runner/IRunner.java

```java
package com.traderoom.strategy.runner;
public interface IRunner extends Serializable {
static IRunner of(IStrategy strategy) {
return new BetRunner(strategy);
}
static IRunner from(Config config, Class<IStrategy> clazz) {
return new BetRunner(StrategyFactory.getInstance().create(clazz, config));
}
Snapshot apply(Spot spot);
Snapshot snapshot();
boolean canContinue();
boolean isLastApplied();
State getState();
Snapshot stop();
boolean isLive();
IStrategy getStrategy();
}
```

## com/traderoom/strategy/runner/RunnerManager.java

```java
package com.traderoom.strategy.runner;
public interface RunnerManager extends Serializable {
static RunnerManager of() {
return new BetRunnerManager();
}
static RunnerManager of(List<IRunner> strategies) {
return new BetRunnerManager(strategies);
}
static RunnerManager from(List<IStrategy> strategies) {
List<IRunner> list = new ArrayList<>(strategies.size());
for (IStrategy strategy : strategies) {
list.add(IRunner.of(strategy));
}
return new BetRunnerManager(list);
}
static RunnerManager from(Config config, List<Class<IStrategy>> classes) {
StrategyFactory factory = StrategyFactory.getInstance();
List<IRunner> list = classes.stream()
.map(clazz -> factory.create(clazz, config))
.map(IRunner::of)
.toList();
return new BetRunnerManager(list);
}
Map<IRunner, Snapshot> apply(Spot spot);
Map<IRunner, Snapshot> snapshot();
boolean canContinue();
boolean allIsLive();
Set<IRunner> all();
List<IRunner> add(List<IRunner> strategies);
IRunner add(IRunner strategy);
IRunner disable(IRunner strategy);
boolean exists(IRunner strategy);
boolean remove(IRunner strategy);
}
```

## com/traderoom/strategy/simulate/BaseSpotSupplier.java

```java
package com.traderoom.strategy.simulate;
public abstract class BaseSpotSupplier implements SpotSupplier {
@Getter
private final SpotGenerateType generateType;
@Getter
private final RouletteType rouletteType;
@Getter
private final long max;
private long counter;
protected BaseSpotSupplier(RouletteType rouletteType, SpotGenerateType generateType, long max) {
if (max <= 0) {
throw new IllegalArgumentException("max must be > 0");
}
this.generateType = generateType;
this.rouletteType = rouletteType;
this.max = max;
}
@Override
public Spot get() {
if (!hasNext()) {
throw new IllegalStateException("The generation limit has been reached: " + getCount() + " / " + getMax());
}
incrementCounter();
return getInternal();
}
protected abstract Spot getInternal();
@Override
public boolean apply(Consumer<Spot> consumer) {
if (!hasNext()) {
return false;
}
Spot spot = get();
consumer.accept(spot);
return true;
}
public boolean hasNext() {
return counter < max;
}
public long getRemaining() {
return Math.max(0, max - counter);
}
public long getCount() {
return counter;
}
public void setCount(long count) {
this.counter = count;
}
protected void incrementCounter() {
counter++;
}
public void reset() {
counter = 0;
}
}
```

## com/traderoom/strategy/simulate/ConfigurableSpotSupplier.java

```java
package com.traderoom.strategy.simulate;
public class ConfigurableSpotSupplier extends BaseSpotSupplier {
private final List<Spot> pool;
private final Random random;
public ConfigurableSpotSupplier(RouletteType rouletteType, SpotGenerateType generateType, long maxGenerations) {
super(rouletteType, generateType, maxGenerations);
random = new SecureRandom();
List<Spot> allSpots = Spot.getAvailableList(rouletteType);
pool = switch (generateType) {
case RANDOM, ROTATION_NUMBER, ROTATION_WHEEL -> allSpots;
case RANDOM_RED_ONLY -> allSpots.stream().filter(Spot::isRed).toList();
case RANDOM_BLACK_ONLY -> allSpots.stream().filter(Spot::isBlack).toList();
case RANDOM_EXCEPT_ONE -> allSpots.stream().filter(spot -> spot != Spot.SPOT_01).toList();
};
if (pool.isEmpty()) {
throw new IllegalArgumentException("Spot pool is empty for generation type: " + generateType);
}
}
public static SpotSupplier of(RouletteType rouletteType, SpotGenerateType generateType, long maxGenerations) {
return new ConfigurableSpotSupplier(rouletteType, generateType, maxGenerations);
}
public Spot getInternal() {
return switch (getGenerateType()) {
case ROTATION_NUMBER, ROTATION_WHEEL -> pool.get((int) (getCount() % pool.size()));
default -> pool.get(random.nextInt(pool.size()));
};
}
}
```

## com/traderoom/strategy/simulate/QueueSpotSupplier.java

```java
package com.traderoom.strategy.simulate;
public class QueueSpotSupplier extends BaseSpotSupplier {
private Queue<Integer> data;
private final Queue<Integer> original;
public QueueSpotSupplier(RouletteType rouletteType, SpotGenerateType generateType, Queue<Integer> data) {
super(rouletteType, generateType, data.size());
this.data = new LinkedList<>(data);
this.original = new LinkedList<>(data);
}
@Override
protected Spot getInternal() {
if (data.isEmpty()) {
return null;
}
return Spot.getByNumber(data.poll());
}
@Override
public void reset() {
data.clear();
data = new LinkedList<>(original);
}
}
```

## com/traderoom/strategy/simulate/SharedSimulator.java

```java
package com.traderoom.strategy.simulate;
public record SharedSimulator(
List<IRunner> runners,
Map<IRunner, Subscriber> subscribers,
SpotSupplier supplier
) implements Serializable {
public Map<IRunner, Simulator.Result> run() {
while (supplier.hasNext()) {
boolean anyLive = runners.stream().anyMatch(IRunner::canContinue);
if (!anyLive) {
break;
}
Spot spot = supplier.get();
if (spot == null) break;
for (IRunner runner : runners) {
if (runner.canContinue()) {
runner.apply(spot);
}
}
}
Map<IRunner, Simulator.Result> results = new LinkedHashMap<>();
for (IRunner runner : runners) {
Snapshot finalSnapshot = runner.stop();
Subscriber sub = subscribers.get(runner);
results.put(runner, new Simulator.Result(
runner.getStrategy().getName(),
finalSnapshot,
sub != null ? sub.deque() : new ArrayDeque<>()
));
}
return results;
}
}
```

## com/traderoom/strategy/simulate/SimulateResult.java

```java
package com.traderoom.strategy.simulate;
public record SimulateResult(
String config,
String strategy,
Simulator.Result result
) {
}
```

## com/traderoom/strategy/simulate/Simulator.java

```java
package com.traderoom.strategy.simulate;
public sealed interface Simulator extends Serializable permits Simulator.Base {
Result run();
static Simulator create(MetaConfig meta) {
StrategyFactory factory = StrategyFactory.getInstance();
IStrategy strategy = factory.create(meta.clazz(), meta.config());
return create(strategy, meta.supplier());
}
static Simulator create(IStrategy strategy, SpotSupplier supplier) {
Subscriber subscriber = Subscriber.storage();
strategy.addSubscriber(subscriber);
return new Base(IRunner.of(strategy), subscriber, supplier);
}
record Result(String strategy, Snapshot snapshot, Deque<Snapshot> deque) {
}
record Base(IRunner runner, Subscriber subscriber, SpotSupplier supplier) implements Simulator {
public Result run() {
boolean canContinue = runner.canContinue();
boolean hasNext = supplier.hasNext();
while (canContinue && hasNext) {
Spot spot = supplier.get();
if (spot == null) break;
runner.apply(spot);
canContinue = runner.canContinue();
hasNext = supplier.hasNext();
}
Snapshot snapshot = runner.stop();
return new Result(runner.getStrategy().getName(), snapshot, subscriber.deque());
}
}
}
```

## com/traderoom/strategy/simulate/SimulatorManager.java

```java
package com.traderoom.strategy.simulate;
public sealed interface SimulatorManager permits SimulatorManager.Base, SimulatorManager.Shared {
List<SimulateResult> run();
static SimulatorManager create(List<MetaConfig> meta) {
return new Base(meta);
}
static SimulatorManager create(List<MetaConfig> meta, SpotSupplier sharedSupplier) {
return new Shared(meta, sharedSupplier);
}
record Base(List<MetaConfig> meta) implements SimulatorManager {
@Override
public List<SimulateResult> run() {
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
List<Callable<SimulateResult>> tasks = meta.stream()
.map(item -> (Callable<SimulateResult>) () -> {
Simulator simulator = Simulator.create(item);
Simulator.Result run = simulator.run();
return new SimulateResult(item.config().name(), run.strategy(), run);
})
.toList();
return executor.invokeAll(tasks).stream()
.map(this::getFutureResult)
.toList();
} catch (InterruptedException e) {
Thread.currentThread().interrupt();
throw new StrategyException("Simulation interrupted", e);
}
}
private SimulateResult getFutureResult(Future<SimulateResult> future) {
try {
return future.get();
} catch (Exception e) {
throw new StrategyException("Simulation failed", e);
}
}
}
record Shared(List<MetaConfig> meta, SpotSupplier sharedSupplier) implements SimulatorManager {
@Override
public List<SimulateResult> run() {
StrategyFactory factory = StrategyFactory.getInstance();
List<IRunner> runners = new ArrayList<>();
Map<IRunner, Subscriber> subscribers = new HashMap<>();
Map<IRunner, String> configNameMap = new IdentityHashMap<>();
for (MetaConfig item : meta) {
var strategy = factory.create(item.clazz(), item.config());
if (strategy != null) {
Subscriber sub = Subscriber.storage();
strategy.addSubscriber(sub);
IRunner runner = IRunner.of(strategy);
runners.add(runner);
subscribers.put(runner, sub);
configNameMap.put(runner, item.config().name());
}
}
if (runners.isEmpty()) {
return List.of();
}
SharedSimulator simulator = new SharedSimulator(runners, subscribers, sharedSupplier);
Map<IRunner, Simulator.Result> executionResults = simulator.run();
return executionResults.entrySet().stream()
.map(entry -> {
IRunner runner = entry.getKey();
Simulator.Result result = entry.getValue();
String configName = configNameMap.getOrDefault(runner, "UNKNOWN");
return new SimulateResult(configName, result.strategy(), result);
})
.toList();
}
}
}
```

## com/traderoom/strategy/simulate/SpotSupplier.java

```java
package com.traderoom.strategy.simulate;
public interface SpotSupplier  extends Serializable {
Spot get();
RouletteType getRouletteType();
SpotGenerateType getGenerateType();
boolean hasNext();
boolean apply(Consumer<Spot> consumer);
long getRemaining();
long getCount();
long getMax();
void reset();
}
```

## com/traderoom/strategy/sizing/DAlembertSizing.java

```java
package com.traderoom.strategy.sizing;
public class DAlembertSizing implements Sizing {
public static DAlembertSizing of() {
return new DAlembertSizing();
}
@Override
public long calculate(State state, boolean isLastWin, long lastBet, SpotPrediction prediction, Config config) {
long min = config.minBet();
long max = config.maxBet();
if (lastBet == 0) {
return min;
}
long nextBet;
if (isLastWin) {
nextBet = lastBet - min;
if (nextBet < min) {
nextBet = min;
}
} else {
nextBet = lastBet + min;
}
return Math.min(nextBet, max);
}
}
```

## com/traderoom/strategy/sizing/FlatSizing.java

```java
package com.traderoom.strategy.sizing;
public class FlatSizing implements Sizing {
@Override
public long calculate(State state, boolean isLastWin, long lastBet, SpotPrediction prediction, Config config) {
return config.minBet();
}
}
```

## com/traderoom/strategy/sizing/KellySizing.java

```java
package com.traderoom.strategy.sizing;
public class KellySizing implements Sizing {
private static final double FRACTION = 0.25;
public static KellySizing of() {
return new KellySizing();
}
@Override
public long calculate(State state, boolean isLastWin, long lastBet, SpotPrediction prediction, Config config) {
double p = prediction.probability();
double b = 35.0;
double q = 1.0 - p;
double f = (b * p - q) / b;
if (f <= 0) return 0;
long bankroll = config.startBalance();
long bet = (long) (bankroll * f * FRACTION);
return Math.clamp(bet, config.minBet(), config.maxBet());
}
}
```

## com/traderoom/strategy/sizing/MartingaleSizing.java

```java
package com.traderoom.strategy.sizing;
public class MartingaleSizing implements Sizing {
public static MartingaleSizing of() {
return new MartingaleSizing();
}
@Override
public long calculate(State state, boolean isLastWin, long lastBet, SpotPrediction prediction, Config config) {
return isLastWin || lastBet == 0 ? config.minBet() : Math.min(lastBet * 2, config.maxBet());
}
}
```

## com/traderoom/strategy/sizing/OscarsGrindSizing.java

```java
package com.traderoom.strategy.sizing;
public class OscarsGrindSizing implements Sizing {
@Override
public long calculate(State state, boolean isLastWin, long lastBet, SpotPrediction prediction, Config config) {
if (state.getBalance() >= config.startBalance()) {
return config.minBet();
}
if (isLastWin) {
long deficit = config.startBalance() - state.getBalance();
long nextBet = lastBet + config.minBet();
return Math.min(nextBet, deficit + config.minBet());
} else {
return Math.max(lastBet, config.minBet());
}
}
}
```

## com/traderoom/strategy/sizing/Sizing.java

```java
package com.traderoom.strategy.sizing;
public interface Sizing  extends Serializable {
long calculate(State state, boolean isLastWin, long lastBet, SpotPrediction prediction, Config config);
}
```

## com/traderoom/strategy/stop/EquityCurveCondition.java

```java
package com.traderoom.strategy.stop;
public class EquityCurveCondition implements StopCondition {
private final int smaPeriod = 20;
private final Deque<Long> balances = new ArrayDeque<>(smaPeriod + 1);
public static StopCondition of() {
return new EquityCurveCondition();
}
public static Optional<StopCondition> createIfEnabled(Long balance, StopConditionConfig config) {
return Optional.of(new EquityCurveCondition());
}
@Override
public boolean should(Metric metric, State state) {
balances.offer(state.getBalance());
if (balances.size() > smaPeriod) {
balances.poll();
double sum = 0;
for (Long val : balances) {
sum += val;
}
double avg = sum / balances.size();
return state.getBalance() < avg * 0.95;
}
return false;
}
}
```

## com/traderoom/strategy/stop/HighRiskBetCondition.java

```java
package com.traderoom.strategy.stop;
public class HighRiskBetCondition implements StopCondition {
private final double maxPercentage;
public HighRiskBetCondition(Double maxPercentage) {
this.maxPercentage = maxPercentage;
}
public static StopCondition of(Double maxBetBalancePercentage) {
return new HighRiskBetCondition(maxBetBalancePercentage);
}
public static Optional<StopCondition> createIfEnabled(Long balance, StopConditionConfig config) {
try {
if (config.maxBetBalancePercentage() > 0)
return Optional.of(of(config.maxBetBalancePercentage()));
} catch (NullPointerException _) {
}
return Optional.empty();
}
@Override
public boolean should(Metric metric, State state) {
long currentBalance = metric.getBalance();
if (currentBalance <= 0) return true;
long nextTotalBet = BetHelper.getTotalBetValue(metric.getLastBets());
return (double) nextTotalBet / currentBalance > maxPercentage;
}
}
```

## com/traderoom/strategy/stop/InitialStopLossCondition.java

```java
package com.traderoom.strategy.stop;
public class InitialStopLossCondition implements StopCondition {
private final long initialStopLossThreshold;
public InitialStopLossCondition(Long balance, Integer stopLossPercentage) {
initialStopLossThreshold = requireNonNull(stopLossPercentage) > 0
? (long) (requireNonNull(balance) * (1.0 - stopLossPercentage / 100.0))
: 0;
}
public static StopCondition of(Long balance, Integer stopLossPercentage) {
return new InitialStopLossCondition(balance, stopLossPercentage);
}
public static Optional<StopCondition> createIfEnabled(Long balance, StopConditionConfig config) {
try {
if (config.stopLossPercentage() > 0 && config.stopLossPercentage() <= 100)
return Optional.of(of(balance, config.stopLossPercentage()));
} catch (NullPointerException _) {
}
return Optional.empty();
}
@Override
public boolean should(Metric metric, State state) {
return initialStopLossThreshold > 0
&& metric.getPeakBalance() <= metric.getStartBalance()
&& metric.getBalance() < initialStopLossThreshold;
}
}
```

## com/traderoom/strategy/stop/LowWinRateCondition.java

```java
package com.traderoom.strategy.stop;
public class LowWinRateCondition implements StopCondition {
private final double minWinRate;
private final long minRoundsToActivate;
public LowWinRateCondition(Double minWinRate, Long minRoundsToActivate) {
this.minWinRate = Objects.requireNonNull(minWinRate);
this.minRoundsToActivate = Objects.requireNonNull(minRoundsToActivate);
}
public static StopCondition of(Double minWinRate, Long minRoundsToActivate) {
return new LowWinRateCondition(minWinRate, minRoundsToActivate);
}
public static Optional<StopCondition> createIfEnabled(Long balance, StopConditionConfig config) {
try {
if (config.minWinRateThreshold() > 0)
return Optional.of(of(config.minWinRateThreshold(), config.minRoundsForWinRate()));
} catch (NullPointerException _) {
}
return Optional.empty();
}
@Override
public boolean should(Metric metric, State state) {
if (metric.getBetCount() < minRoundsToActivate) {
return false;
}
double currentWinRate = (double) metric.getWonCount() / metric.getBetCount();
return currentWinRate < minWinRate;
}
}
```

## com/traderoom/strategy/stop/MaxDrawdownStopCondition.java

```java
package com.traderoom.strategy.stop;
public class MaxDrawdownStopCondition implements StopCondition {
private final double maxAllowedDrawdown;
public MaxDrawdownStopCondition(Integer maxDrawdownPercentage) {
maxAllowedDrawdown = requireNonNull(maxDrawdownPercentage) / 100.0;
}
public static StopCondition of(Integer maxDrawdownPercentage) {
return new MaxDrawdownStopCondition(maxDrawdownPercentage);
}
public static Optional<StopCondition> createIfEnabled(Long balance, StopConditionConfig config) {
try {
if (config.maxDrawdownPercentage() > 0)
return Optional.of(of(config.maxDrawdownPercentage()));
} catch (NullPointerException _) {
}
return Optional.empty();
}
@Override
public boolean should(Metric metric, State state) {
return metric.getMaxDrawdown() >= maxAllowedDrawdown;
}
}
```

## com/traderoom/strategy/stop/MaxRoundsCondition.java

```java
package com.traderoom.strategy.stop;
public class MaxRoundsCondition implements StopCondition {
private final long maxRounds;
public MaxRoundsCondition(Long maxRounds) {
this.maxRounds = Objects.requireNonNull(maxRounds);
}
public static StopCondition of(Long maxRounds) {
return new MaxRoundsCondition(maxRounds);
}
public static Optional<StopCondition> createIfEnabled(Long balance, StopConditionConfig config) {
try {
if (config.maxRounds() > 0)
return Optional.of(of(config.maxRounds()));
} catch (NullPointerException _) {
}
return Optional.empty();
}
@Override
public boolean should(Metric metric, State sessionState) {
return metric.getBetCount() >= maxRounds;
}
}
```

## com/traderoom/strategy/stop/StagnationCondition.java

```java
package com.traderoom.strategy.stop;
public class StagnationCondition implements StopCondition {
private final int windowSize;
private final Queue<Long> history;
public StagnationCondition(Integer windowSize) {
this.windowSize = Objects.requireNonNull(windowSize);
history = new LinkedList<>();
}
public static StopCondition of(Integer window) {
return new StagnationCondition(window);
}
public static Optional<StopCondition> createIfEnabled(Long balance, StopConditionConfig config) {
try {
if (config.stagnationWindow() > 0)
return Optional.of(of(config.stagnationWindow()));
} catch (NullPointerException _) {
}
return Optional.empty();
}
@Override
public boolean should(Metric metric, State sessionState) {
long currentBalance = metric.getBalance();
history.offer(currentBalance);
if (history.size() > windowSize) {
Long poll = history.poll();
long oldBalance = poll != null ? poll : 0;
long diff = Math.abs(currentBalance - oldBalance);
return diff == 0;
}
return false;
}
}
```

## com/traderoom/strategy/stop/StopCondition.java

```java
package com.traderoom.strategy.stop;
@FunctionalInterface
public interface StopCondition extends Serializable {
boolean should(Metric metric, State state);
}
```

## com/traderoom/strategy/stop/StopConditionConfig.java

```java
package com.traderoom.strategy.stop;
@Builder
public record StopConditionConfig(
Integer stopLossPercentage,
Integer takeProfitPercentage,
Integer trailingStopPercentage,
Integer maxDrawdownPercentage,
Integer maxWinStreak,
Integer maxLossStreak,
Long maxRounds,
Double maxBetBalancePercentage,
Integer stagnationWindow,
Double minWinRateThreshold,
Long minRoundsForWinRate
) implements Serializable {
@Builder
public StopConditionConfig(
Integer stopLossPercentage,
Integer takeProfitPercentage,
Integer trailingStopPercentage,
Integer maxDrawdownPercentage,
Integer maxWinStreak,
Integer maxLossStreak,
Long maxRounds,
Double maxBetBalancePercentage,
Integer stagnationWindow,
Double minWinRateThreshold,
Long minRoundsForWinRate
) {
this.stopLossPercentage = Objects.requireNonNullElse(stopLossPercentage, 0);
this.takeProfitPercentage = Objects.requireNonNullElse(takeProfitPercentage, 0);
this.trailingStopPercentage = Objects.requireNonNullElse(trailingStopPercentage, 0);
this.maxDrawdownPercentage = Objects.requireNonNullElse(maxDrawdownPercentage, 0);
this.maxWinStreak = Objects.requireNonNullElse(maxWinStreak, 0);
this.maxLossStreak = Objects.requireNonNullElse(maxLossStreak, 0);
this.maxRounds = (maxRounds == null || maxRounds < 0) ? 10_000L : maxRounds;
this.maxBetBalancePercentage = Objects.requireNonNullElse(maxBetBalancePercentage, 0.0);
this.stagnationWindow = Objects.requireNonNullElse(stagnationWindow, 0);
this.minWinRateThreshold = Objects.requireNonNullElse(minWinRateThreshold, 0.0);
this.minRoundsForWinRate = (minRoundsForWinRate == null || minRoundsForWinRate < 0) ? 100L : minRoundsForWinRate;
if (this.stopLossPercentage < 0 || this.stopLossPercentage > 100)
throw new IllegalArgumentException("stopLossPercentage must be between 0 and 100");
if (this.takeProfitPercentage < 0)
throw new IllegalArgumentException("takeProfitPercentage must be greater than 0");
}
private static final long serialVersionUID = 1L;
public static StopConditionConfig of() {
return StopConditionConfig.builder().build();
}
}
```

## com/traderoom/strategy/stop/StopConditionFactory.java

```java
package com.traderoom.strategy.stop;
@UtilityClass
public class StopConditionFactory {
public static List<StopCondition> from(StopConditionConfig config, Long balance) {
return Stream.of(ZeroBalanceStopCondition.createIfEnabled(balance, config),
EquityCurveCondition.createIfEnabled(balance, config),
InitialStopLossCondition.createIfEnabled(balance, config),
TakeProfitCondition.createIfEnabled(balance, config),
TrailingStopLossCondition.createIfEnabled(balance, config),
MaxDrawdownStopCondition.createIfEnabled(balance, config),
StreakStopCondition.createIfEnabled(balance, config),
MaxRoundsCondition.createIfEnabled(balance, config),
StagnationCondition.createIfEnabled(balance, config),
HighRiskBetCondition.createIfEnabled(balance, config),
LowWinRateCondition.createIfEnabled(balance, config))
.flatMap(Optional::stream)
.toList();
}
}
```

## com/traderoom/strategy/stop/StreakStopCondition.java

```java
package com.traderoom.strategy.stop;
public class StreakStopCondition implements StopCondition {
private final int maxLossStreak;
private final int maxWinStreak;
private int currentLossStreak = 0;
private int currentWinStreak = 0;
private long lastBalance;
public StreakStopCondition(Integer maxLossStreak, Integer maxWinStreak, Long startBalance) {
this.maxLossStreak = requireNonNull(maxLossStreak);
this.maxWinStreak = requireNonNull(maxWinStreak);
lastBalance = requireNonNull(startBalance);
}
public static StopCondition of(Integer maxLossStreak, Integer maxWinStreak, Long balance) {
return new StreakStopCondition(maxLossStreak, maxWinStreak, balance);
}
public static Optional<StopCondition> createIfEnabled(Long balance, StopConditionConfig config) {
try {
if (config.maxWinStreak() > 0 || config.maxLossStreak() > 0)
return Optional.of(of(config.maxLossStreak(), config.maxWinStreak(), balance));
} catch (NullPointerException _) {
}
return Optional.empty();
}
@Override
public boolean should(Metric metric, State state) {
long curBalance = state.getBalance();
if (curBalance == lastBalance) {
return false;
}
if (curBalance < lastBalance) {
currentLossStreak++;
currentWinStreak = 0;
} else {
currentWinStreak++;
currentLossStreak = 0;
}
lastBalance = curBalance;
if (maxLossStreak > 0 && currentLossStreak >= maxLossStreak) {
return true;
}
return maxWinStreak > 0 && currentWinStreak >= maxWinStreak;
}
}
```

## com/traderoom/strategy/stop/TakeProfitCondition.java

```java
package com.traderoom.strategy.stop;
public class TakeProfitCondition implements StopCondition {
private final long takeProfitThreshold;
public TakeProfitCondition(Long startBalance, Integer profitPercentage) {
takeProfitThreshold = requireNonNull(profitPercentage) > 0 ? (long) (requireNonNull(startBalance) * (1.0 + profitPercentage / 100.0)) : 0;
}
public static StopCondition of(Long balance, Integer profitPercentage) {
return new TakeProfitCondition(balance, profitPercentage);
}
public static Optional<StopCondition> createIfEnabled(Long balance, StopConditionConfig config) {
try {
if (config.takeProfitPercentage() > 0)
return Optional.of(of(balance, config.takeProfitPercentage()));
} catch (NullPointerException _) {
}
return Optional.empty();
}
@Override
public boolean should(Metric metric, State state) {
return takeProfitThreshold > 0 && state.getBalance() >= takeProfitThreshold;
}
}
```

## com/traderoom/strategy/stop/TrailingStopLossCondition.java

```java
package com.traderoom.strategy.stop;
public class TrailingStopLossCondition implements StopCondition {
private final double trailingStopPercentage;
public TrailingStopLossCondition(Integer trailingStopPercentage) {
this.trailingStopPercentage = Objects.requireNonNull(trailingStopPercentage) / 100.0;
}
public static StopCondition of(Integer trailingStopPercentage) {
return new TrailingStopLossCondition(trailingStopPercentage);
}
public static Optional<StopCondition> createIfEnabled(Long balance, StopConditionConfig config) {
try {
if (config.trailingStopPercentage() > 0)
return Optional.of(of(config.trailingStopPercentage()));
} catch (NullPointerException _) {
}
return Optional.empty();
}
@Override
public boolean should(Metric metric, State state) {
if (trailingStopPercentage > 0 && metric.getPeakBalance() > metric.getStartBalance()) {
long trailingStopThreshold = (long) (metric.getPeakBalance() * (1.0 - trailingStopPercentage));
return state.getBalance() < trailingStopThreshold;
}
return false;
}
}
```

## com/traderoom/strategy/stop/ZeroBalanceStopCondition.java

```java
package com.traderoom.strategy.stop;
public class ZeroBalanceStopCondition implements StopCondition {
public static StopCondition of() {
return new ZeroBalanceStopCondition();
}
public static Optional<StopCondition> createIfEnabled(Long balance, StopConditionConfig config) {
return Optional.of(of());
}
@Override
public boolean should(Metric metric, State state) {
return state.getBalance() <= 0;
}
}
```

## com/traderoom/strategy/StrategyFactory.java

```java
package com.traderoom.strategy;
public final class StrategyFactory {
private static class Holder {
private static final StrategyFactory INSTANCE = new StrategyFactory(PACKAGE);
}
public static StrategyFactory getInstance() {
return Holder.INSTANCE;
}
public static Set<Class<IStrategy>> classes() {
return Holder.INSTANCE.map.keySet();
}
private final Map<Class<IStrategy>, StrategyDefinition> map;
@SuppressWarnings("unchecked")
private StrategyFactory(Package aPackage) {
Map<Class<IStrategy>, StrategyDefinition> temp = new HashMap<>();
Set<Class<?>> classes = GlobalContext.classesInPackage(aPackage);
classes.stream()
.filter(clazz -> clazz.isAnnotationPresent(AStrategy.class))
.map(clazz -> (Class<IStrategy>) clazz)
.forEach(clazz -> registration(clazz, temp));
map = Collections.unmodifiableMap(temp);
}
public List<IStrategy> create(Config config) {
return map.values()
.stream()
.map(definition -> definition.instance(config))
.filter(Optional::isPresent)
.map(Optional::get)
.toList();
}
public IStrategy create(Class<? extends IStrategy> clazz, Config config) {
StrategyDefinition def = map.get(clazz);
if (def == null) return null;
return def.instance(config).orElse(null);
}
private void registration(Class<IStrategy> clazz, Map<Class<IStrategy>, StrategyDefinition> map) {
if (!IStrategy.class.isAssignableFrom(clazz) || Modifier.isAbstract(clazz.getModifiers())) {
return;
}
var component = clazz.getAnnotation(AStrategy.class);
if (component == null) {
return;
}
var trimmed = component.name().trim();
var name = trimmed.isEmpty() ? clazz.getSimpleName() : trimmed;
map.put(clazz, StrategyDefinition.of(name, clazz));
}
}
```

## com/traderoom/strategy/StrategyMain.java

```java
package com.traderoom.strategy;
public class StrategyMain {
}
```

## com/traderoom/strategy/utils/BetHelper.java

```java
package com.traderoom.strategy.utils;
@UtilityClass
public final class BetHelper {
private static final String MESSAGE = "The drawn number (spot) cannot be null";
public static long getTotalBetValue(List<Bet> list) {
return (list == null || list.isEmpty()) ? 0 : list.stream()
.mapToLong(Bet::value)
.sum();
}
public static long getTotalPayout(List<Bet> list, Spot spot) {
Objects.requireNonNull(spot, MESSAGE);
return (list == null || list.isEmpty()) ? 0 : list.stream()
.filter(bet -> isWin(bet, spot))
.mapToLong(bet -> bet.value() * bet.type().getReturnMultiplier())
.sum();
}
public static boolean hasWin(List<Bet> list, Spot spot) {
Objects.requireNonNull(spot, MESSAGE);
return list != null && !list.isEmpty() && list.stream().anyMatch(bet -> isWin(bet, spot));
}
public static boolean isWin(Bet bet, Spot spot) {
Objects.requireNonNull(spot, MESSAGE);
return isWin(bet.type(), spot);
}
public static boolean isWin(BetType type, Spot spot) {
Objects.requireNonNull(spot, MESSAGE);
return type.getWinning().contains(spot);
}
public static BetType getStraightUp(Spot spot) {
Objects.requireNonNull(spot, MESSAGE);
return BetType.getStraightUpBetFor(spot);
}
public static List<BetType> getAllCovering(Spot spot) {
Objects.requireNonNull(spot, MESSAGE);
return BetType.getAllCovering(spot);
}
}
```

## com/traderoom/strategy/utils/BettingHelper.java

```java
package com.traderoom.strategy.utils;
@UtilityClass
public class BettingHelper {
private static final Predictor ADVISOR_PREDICTOR = new PatternPredictor();
private static final int NUMBER_OF_BETS_TO_PLACE = 5;
public static List<Bet> createDiversifiedBets(long total, State state, Config config) {
long minBet = config.minBet();
if (total < minBet) {
return List.of();
}
List<SpotPrediction> predictions = ADVISOR_PREDICTOR.getNextSpot(state, config);
if (predictions.isEmpty()) {
return List.of();
}
List<SpotPrediction> top = predictions.stream()
.sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
.limit(NUMBER_OF_BETS_TO_PLACE)
.toList();
if (top.isEmpty()) {
return List.of();
}
double sum = top.stream()
.mapToDouble(SpotPrediction::probability)
.sum();
if (sum == 0) {
return List.of();
}
List<Bet> bets = new ArrayList<>(NUMBER_OF_BETS_TO_PLACE);
for (SpotPrediction item : top) {
long betValue = (long) (total * (item.probability() / sum));
if (betValue >= 1L) {
bets.add(Bet.of(BetHelper.getStraightUp(item.spot()), betValue));
}
}
return bets;
}
}
```

