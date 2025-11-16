package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.Bet;
import org.apache.commons.math3.ml.clustering.CentroidCluster;
import org.apache.commons.math3.ml.clustering.Clusterable;
import org.apache.commons.math3.ml.clustering.DoublePoint;
import org.apache.commons.math3.ml.distance.DistanceMeasure;
import org.apache.commons.math3.ml.distance.EuclideanDistance;
import org.apache.commons.math3.stat.descriptive.DescriptiveStatistics;

import java.util.Collections;
import java.util.List;

public class EnhancedMarketRegimeStrategy extends BaseStrategy {

    private static final int HISTORY_WINDOW = 15;

    private final List<CentroidCluster<DoublePoint>> clusterCentroids;
    private final boolean isReady;
    private final DistanceMeasure distanceMeasure = new EuclideanDistance();

    private final Strategy trendFollowingStrategy;
    private final Strategy meanReversionStrategy;

    public EnhancedMarketRegimeStrategy(Context context, List<CentroidCluster<DoublePoint>> centroids) {
        super(context);

        if (centroids != null && !centroids.isEmpty()) {
            clusterCentroids = centroids;
            isReady = true;
        } else {
            clusterCentroids = Collections.emptyList();
            isReady = false;
        }

        trendFollowingStrategy = new ParoliStrategy(context);
        meanReversionStrategy = new MeanReversionStrategy(context);
    }

    @Override
    public String getName() {
        return EnhancedMarketRegimeStrategy.class.getSimpleName();
    }

    @Override
    public void updateStrategyParameter(List<Bet> betList, Spot spot, Context context) {
        super.updateStrategyParameter(betList, spot, context);
        ((BaseStrategy) trendFollowingStrategy).setCurBalance(curBalance);
        ((BaseStrategy) meanReversionStrategy).setCurBalance(curBalance);
        trendFollowingStrategy.updateStrategyParameter(betList, spot, context);
        meanReversionStrategy.updateStrategyParameter(betList, spot, context);
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

    private List<Bet> applyTacticForRegime(int regimeId, Context context) {
        ((BaseStrategy) trendFollowingStrategy).setCurBalance(this.curBalance);
        ((BaseStrategy) meanReversionStrategy).setCurBalance(this.curBalance);

        return switch (regimeId) {
            case 0 -> ((BaseStrategy) trendFollowingStrategy).getNextInternal(context);
            case 1 -> ((BaseStrategy) meanReversionStrategy).getNextInternal(context);
            default -> Collections.emptyList();
        };
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
}