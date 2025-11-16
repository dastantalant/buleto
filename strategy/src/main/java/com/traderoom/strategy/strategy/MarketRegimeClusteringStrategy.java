package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.enums.Spot;

import org.apache.commons.math3.ml.clustering.CentroidCluster;
import org.apache.commons.math3.ml.clustering.Clusterable;
import org.apache.commons.math3.ml.clustering.DoublePoint;
import org.apache.commons.math3.ml.distance.DistanceMeasure;
import org.apache.commons.math3.ml.distance.EuclideanDistance;
import org.apache.commons.math3.stat.descriptive.DescriptiveStatistics;

import java.util.Collections;
import java.util.List;

/**
 * Стратегия, использующая кластеризацию K-Means для автоматического определения
 * "игровых режимов" и применения соответствующей тактики.
 * Эта версия ЗАГРУЖАЕТ предобученную модель, а не обучает ее сама.
 */
public class MarketRegimeClusteringStrategy extends BaseStrategy {

    private static final int HISTORY_WINDOW = 15;

    private final List<CentroidCluster<DoublePoint>> clusterCentroids;
    private final boolean isReady;
    private final DistanceMeasure distanceMeasure = new EuclideanDistance();

    /**
     * Конструктор, который получает готовую, предобученную модель.
     * @param context Контекст игры.
     * @param centroids Загруженная модель (список центроидов кластеров).
     */
    public MarketRegimeClusteringStrategy(Context context, List<CentroidCluster<DoublePoint>> centroids) {
        super(context);

        if (centroids != null && !centroids.isEmpty()) {
            clusterCentroids = centroids;
            isReady = true;
        } else {
            clusterCentroids = Collections.emptyList();
            isReady = false;
        }
    }

    @Override
    public String getName() {
        return MarketRegimeClusteringStrategy.class.getSimpleName();
    }

    @Override
    protected List<Bet> getNextInternal(Context context) {
        if (!isReady || context.getSpotHistory().size() < HISTORY_WINDOW) {
            return Collections.emptyList();
        }

        DoublePoint currentSituation = createFeatureVector(
                context.getSpotHistory().subList(context.getSpotHistory().size() - HISTORY_WINDOW, context.getSpotHistory().size())
        );

        int regimeId = predictRegime(currentSituation);

        return applyTacticForRegime(regimeId, context);
    }

    private int predictRegime(DoublePoint point) {
        double minDistance = Double.MAX_VALUE;
        int closestClusterId = -1;
        for (int i = 0; i < clusterCentroids.size(); i++) {
            CentroidCluster<DoublePoint> cluster = clusterCentroids.get(i);

            Clusterable center = cluster.getCenter();
            if (center instanceof DoublePoint) {
                DoublePoint centerPoint = (DoublePoint) center;
                double distance = distanceMeasure.compute(point.getPoint(), centerPoint.getPoint());

                if (distance < minDistance) {
                    minDistance = distance;
                    closestClusterId = i;
                }
            }
        }
        return closestClusterId;
    }

    private DoublePoint createFeatureVector(List<Spot> historyWindow) {
        DescriptiveStatistics stats = new DescriptiveStatistics();
        historyWindow.stream().mapToDouble(Spot::getNumber).forEach(stats::addValue);

        double redRate = historyWindow.stream().filter(Spot::isRed).count() / (double) HISTORY_WINDOW;
        double volatility = stats.getStandardDeviation();
        double mean = stats.getMean();

        return new DoublePoint(new double[]{redRate, volatility, mean});
    }

    private List<Bet> applyTacticForRegime(int regimeId, Context context) {
        return switch (regimeId) {
            case 0 -> {
                BetType trendColor = context.getLastSpot().isRed() ? BetType.RED : BetType.BLACK;
                yield createBet(trendColor, context.getMin(), context);
            }
            case 1 -> {
                BetType oppositeColor = context.getLastSpot().isRed() ? BetType.BLACK : BetType.RED;
                yield createBet(oppositeColor, context.getMin(), context);
            }
            default -> Collections.emptyList();
        };
    }

    private List<Bet> createBet(BetType type, long value, Context context) {
        long safeValue = Math.min(value, curBalance);
        if (safeValue < context.getMin()) return Collections.emptyList();
        return List.of(Bet.builder().type(type).value(safeValue).build());
    }
}