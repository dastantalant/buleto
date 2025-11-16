package com.traderoom.strategy.predictor;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.RouletteType;
import com.traderoom.strategy.model.BetTypePrediction;
import com.traderoom.strategy.model.ColorPrediction;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.enums.Spot;

import org.deeplearning4j.nn.conf.MultiLayerConfiguration;
import org.deeplearning4j.nn.conf.NeuralNetConfiguration;
import org.deeplearning4j.nn.conf.layers.LSTM;
import org.deeplearning4j.nn.conf.layers.RnnOutputLayer;
import org.deeplearning4j.nn.multilayer.MultiLayerNetwork;
import org.deeplearning4j.nn.weights.WeightInit;
import org.nd4j.linalg.activations.Activation;
import org.nd4j.linalg.api.ndarray.INDArray;
import org.nd4j.linalg.dataset.DataSet;
import org.nd4j.linalg.factory.Nd4j;
import org.nd4j.linalg.learning.config.Adam;
import org.nd4j.linalg.lossfunctions.LossFunctions;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/**
 * Предиктор, использующий рекуррентную нейронную сеть (LSTM) для предсказания
 * следующего номера на основе истории предыдущих выпадений.
 */
public class RnnPredictor implements Predictor {

    private static final int LSTM_LAYER_SIZE = 128;
    private static final int TRAINING_EPOCHS = 50;
    private static final long SEED = 12345;


    private MultiLayerNetwork net;
    private Map<Spot, Integer> spotToIndex;
    private Map<Integer, Spot> indexToSpot;

    public RnnPredictor(MultiLayerNetwork preTrainedNet, RouletteType rouletteType) {
        this.net = preTrainedNet;
        this.net.rnnClearPreviousState();

        List<Spot> availableSpots = Spot.getAvailableList(rouletteType);
        int numClasses = availableSpots.size();
        this.spotToIndex = IntStream.range(0, numClasses).boxed().collect(Collectors.toMap(availableSpots::get, i -> i));
        this.indexToSpot = IntStream.range(0, numClasses).boxed().collect(Collectors.toMap(i -> i, availableSpots::get));
    }
    @Override
    public List<BetTypePrediction> getNextBetTypePredictionList(Context context) {
        return List.of();
    }

    @Override
    public ColorPrediction getNextColorPrediction(Context context) {
        // Можно реализовать, суммируя вероятности предсказанных номеров по цветам.
        List<SpotPrediction> spotPredictions = getNextSpotPredictionList(context);

        if (spotPredictions.isEmpty()) {
            return ColorPrediction.builder().red(0).black(0).green(0).build();
        }

        double redProb = spotPredictions.stream().filter(p -> p.spot().isRed()).mapToDouble(SpotPrediction::probability).sum();
        double blackProb = spotPredictions.stream().filter(p -> p.spot().isBlack()).mapToDouble(SpotPrediction::probability).sum();
        double greenProb = spotPredictions.stream().filter(p -> p.spot().isGreen()).mapToDouble(SpotPrediction::probability).sum();

        return ColorPrediction.builder().red(redProb).black(blackProb).green(greenProb).build();
    }

    @Override
    public List<SpotPrediction> getNextSpotPredictionList(Context context) {
        if (this.net == null || context.getLastSpot() == null) {
            return Collections.emptyList(); // Если нет модели, нет предсказаний
        }

        // Логика предсказания остается почти той же
        INDArray input = Nd4j.zeros(1, spotToIndex.size());
        Integer lastSpotIndex = spotToIndex.get(context.getLastSpot());
        if(lastSpotIndex == null) return Collections.emptyList(); // Если номер внезапно не в маппинге

        input.putScalar(lastSpotIndex, 1);
        INDArray output = net.rnnTimeStep(input);

        List<SpotPrediction> predictions = new ArrayList<>();
        for (int i = 0; i < output.columns(); i++) {
            predictions.add(SpotPrediction.builder()
                    .spot(indexToSpot.get(i))
                    .probability(output.getDouble(i))
                    .build());
        }
        return predictions;
    }

    private void trainModel(Context context) {
        List<Spot> availableSpots = Spot.getAvailableList(context.getRouletteType());
        int numClasses = availableSpots.size();

        spotToIndex = IntStream.range(0, numClasses).boxed()
                .collect(Collectors.toMap(availableSpots::get, i -> i));
        indexToSpot = IntStream.range(0, numClasses).boxed()
                .collect(Collectors.toMap(i -> i, availableSpots::get));

        MultiLayerConfiguration conf = new NeuralNetConfiguration.Builder()
                .seed(SEED)
                .weightInit(WeightInit.XAVIER)
                .updater(new Adam(0.005))
                .list()
                .layer(new LSTM.Builder().nIn(numClasses).nOut(LSTM_LAYER_SIZE)
                        .activation(Activation.TANH).build())
                .layer(new RnnOutputLayer.Builder(LossFunctions.LossFunction.MCXENT)
                        .activation(Activation.SOFTMAX)
                        .nIn(LSTM_LAYER_SIZE).nOut(numClasses).build())
                .build();

        net = new MultiLayerNetwork(conf);
        net.init();

        List<Spot> history = context.getSpotHistory();
        int historySize = history.size();

        INDArray features = Nd4j.zeros(1, numClasses, historySize - 1);
        INDArray labels = Nd4j.zeros(1, numClasses, historySize - 1);

        for (int i = 0; i < historySize - 1; i++) {
            Spot currentSpot = history.get(i);
            Spot nextSpot = history.get(i + 1);

            features.putScalar(new int[]{0, spotToIndex.get(currentSpot), i}, 1);
            labels.putScalar(new int[]{0, spotToIndex.get(nextSpot), i}, 1);
        }

        DataSet trainingData = new DataSet(features, labels);

        for (int i = 0; i < TRAINING_EPOCHS; i++) {
            net.fit(trainingData);
        }

        net.rnnClearPreviousState();
    }
}