package com.traderoom.strategy.application;

import com.traderoom.strategy.enums.RouletteType;
import com.traderoom.strategy.enums.Spot;
import org.apache.commons.math3.ml.clustering.CentroidCluster;
import org.apache.commons.math3.ml.clustering.DoublePoint;
import org.apache.commons.math3.ml.clustering.KMeansPlusPlusClusterer;
import org.apache.commons.math3.ml.distance.EuclideanDistance;
import org.apache.commons.math3.stat.descriptive.DescriptiveStatistics;
import org.deeplearning4j.nn.conf.MultiLayerConfiguration;
import org.deeplearning4j.nn.conf.NeuralNetConfiguration;
import org.deeplearning4j.nn.conf.layers.LSTM;
import org.deeplearning4j.nn.conf.layers.RnnOutputLayer;
import org.deeplearning4j.nn.multilayer.MultiLayerNetwork;
import org.deeplearning4j.nn.weights.WeightInit;
import org.deeplearning4j.util.ModelSerializer;
import org.nd4j.linalg.activations.Activation;
import org.nd4j.linalg.api.ndarray.INDArray;
import org.nd4j.linalg.dataset.DataSet;
import org.nd4j.linalg.factory.Nd4j;
import org.nd4j.linalg.learning.config.Adam;
import org.nd4j.linalg.lossfunctions.LossFunctions;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class ModelManager {

    private final Path modelsDirectory;

    public ModelManager(String modelsDirectoryPath) {
        this.modelsDirectory = Paths.get(modelsDirectoryPath);
        try {
            Files.createDirectories(this.modelsDirectory);
        } catch (IOException e) {
            throw new RuntimeException("Не удалось создать директорию для моделей: " + modelsDirectoryPath, e);
        }
    }

    public void trainAndSaveRnnModel(List<Spot> trainingData, RouletteType rouletteType) throws IOException {
        System.out.println("RNN Training: Начало обучения модели...");

        int lstmLayerSize = 128;
        int trainingEpochs = 50;
        int sequenceLength = 50;
        List<Spot> availableSpots = Spot.getAvailableList(rouletteType);
        int numClasses = availableSpots.size();
        Map<Spot, Integer> spotToIndex = IntStream.range(0, numClasses).boxed()
                .collect(Collectors.toMap(availableSpots::get, i -> i));

        List<INDArray> featuresList = new ArrayList<>();
        List<INDArray> labelsList = new ArrayList<>();

        for (int i = 0; i < trainingData.size() - sequenceLength; i++) {
            INDArray feature = Nd4j.zeros(1, numClasses, sequenceLength);
            INDArray label = Nd4j.zeros(1, numClasses, sequenceLength);
            for (int j = 0; j < sequenceLength; j++) {
                Spot currentSpot = trainingData.get(i + j);
                Spot nextSpot = trainingData.get(i + j + 1);
                feature.putScalar(new int[]{0, spotToIndex.get(currentSpot), j}, 1);
                label.putScalar(new int[]{0, spotToIndex.get(nextSpot), j}, 1);
            }
            featuresList.add(feature);
            labelsList.add(label);
        }

        if (featuresList.isEmpty()) {
            System.err.println("RNN Training: Недостаточно данных для создания последовательностей. Пропуск.");
            return;
        }

        INDArray trainingFeatures = Nd4j.concat(0, featuresList.toArray(new INDArray[0]));
        INDArray trainingLabels = Nd4j.concat(0, labelsList.toArray(new INDArray[0]));
        DataSet trainingDataSet = new DataSet(trainingFeatures, trainingLabels);

        MultiLayerConfiguration conf = new NeuralNetConfiguration.Builder()
                .seed(12345)
                .weightInit(WeightInit.XAVIER)
                .updater(new Adam(0.005))
                .list()
                .layer(new LSTM.Builder().nIn(numClasses).nOut(lstmLayerSize)
                        .activation(Activation.TANH).build())
                .layer(new RnnOutputLayer.Builder(LossFunctions.LossFunction.MCXENT)
                        .activation(Activation.SOFTMAX)
                        .nIn(lstmLayerSize).nOut(numClasses).build())
                .build();

        MultiLayerNetwork net = new MultiLayerNetwork(conf);
        net.init();

        net.setListeners(new org.deeplearning4j.optimize.listeners.ScoreIterationListener(10));

        System.out.println("RNN Training: Подготовлено " + featuresList.size() + " обучающих последовательностей. Начинаем fit...");

        for (int i = 0; i < trainingEpochs; i++) {
            net.fit(trainingDataSet);
            System.out.println("RNN Training: Эпоха " + (i + 1) + " завершена.");
        }

        File modelFile = modelsDirectory.resolve("rnn_model.zip").toFile();
        boolean saveUpdater = true;
        ModelSerializer.writeModel(net, modelFile, saveUpdater);

        System.out.println("RNN Training: Модель обучена и сохранена в " + modelFile.getAbsolutePath());
    }

    public Optional<MultiLayerNetwork> loadRnnModel() {
        File modelFile = modelsDirectory.resolve("rnn_model.zip").toFile();
        if (!modelFile.exists()) {
            return Optional.empty();
        }
        try {
            MultiLayerNetwork net = ModelSerializer.restoreMultiLayerNetwork(modelFile);
            System.out.println("RNN Loading: Модель успешно загружена из " + modelFile.getAbsolutePath());
            return Optional.of(net);
        } catch (IOException e) {
            System.err.println("RNN Loading: Ошибка при загрузке модели: " + e.getMessage());
            return Optional.empty();
        }
    }


     public void trainAndSaveClusteringModel(List<Spot> trainingData) throws IOException {
        System.out.println("Clustering Training: Начало обучения модели...");

        int historyWindow = 15;
        int kClusters = 4;
        KMeansPlusPlusClusterer<DoublePoint> clusterer = new KMeansPlusPlusClusterer<>(kClusters, 1000, new EuclideanDistance());

        List<DoublePoint> featureVectors = new ArrayList<>();
        for (int i = 0; i <= trainingData.size() - historyWindow; i++) {
            featureVectors.add(createFeatureVector(trainingData.subList(i, i + historyWindow)));
        }

        if(featureVectors.isEmpty()) {
            System.err.println("Clustering Training: Недостаточно данных для обучения. Пропуск.");
            return;
        }

        List<CentroidCluster<DoublePoint>> centroids = clusterer.cluster(featureVectors);

        File modelFile = modelsDirectory.resolve("clustering_model.ser").toFile();
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(modelFile))) {
            oos.writeObject(centroids);
        }
        System.out.println("Clustering Training: Модель обучена и сохранена в " + modelFile.getAbsolutePath());
    }

    @SuppressWarnings("unchecked")
    public Optional<List<CentroidCluster<DoublePoint>>> loadClusteringModel() {
        File modelFile = modelsDirectory.resolve("clustering_model.ser").toFile();
        if (!modelFile.exists()) {
            return Optional.empty();
        }
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(modelFile))) {
            List<CentroidCluster<DoublePoint>> centroids = (List<CentroidCluster<DoublePoint>>) ois.readObject();
            System.out.println("Clustering Loading: Модель успешно загружена из " + modelFile.getAbsolutePath());
            return Optional.of(centroids);
        } catch (IOException | ClassNotFoundException e) {
            System.err.println("Clustering Loading: Ошибка при загрузке модели: " + e.getMessage());
            return Optional.empty();
        }
    }

    private DoublePoint createFeatureVector(List<Spot> historyWindow) {
        DescriptiveStatistics stats = new DescriptiveStatistics();
        historyWindow.stream().mapToDouble(Spot::getNumber).forEach(stats::addValue);
        double redRate = historyWindow.stream().filter(Spot::isRed).count() / (double) 15;
        double volatility = stats.getStandardDeviation();
        double mean = stats.getMean();
        return new DoublePoint(new double[]{redRate, volatility, mean});
    }
}