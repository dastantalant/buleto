package com.traderoom.strategy.application;

import com.traderoom.strategy.enums.RouletteType;
import org.apache.commons.math3.ml.clustering.CentroidCluster;
import org.apache.commons.math3.ml.clustering.DoublePoint;
import org.deeplearning4j.nn.multilayer.MultiLayerNetwork;

import java.util.List;
import java.util.Optional;

/**
 * Поставщик предварительно обученных ИИ-моделей.
 * Загружает все модели один раз при инициализации и предоставляет к ним доступ.
 */
public class ModelProvider {

    private final Optional<MultiLayerNetwork> rnnModel;
    private final Optional<List<CentroidCluster<DoublePoint>>> clusteringModel;
    private final RouletteType rouletteType; // Сохраняем для передачи в конструктор RnnPredictor

    /**
     * Конструктор, который использует ModelManager для загрузки всех моделей из файлов.
     * @param modelManager Менеджер, отвечающий за I/O операции с моделями.
     * @param rouletteType Тип рулетки, для которой были обучены модели.
     */
    public ModelProvider(ModelManager modelManager, RouletteType rouletteType) {
        System.out.println("ModelProvider: Загрузка всех предобученных моделей...");
        this.rnnModel = modelManager.loadRnnModel();
        this.clusteringModel = modelManager.loadClusteringModel();
        this.rouletteType = rouletteType;
        System.out.println("ModelProvider: Загрузка завершена.");
    }

    // Геттеры для доступа к загруженным моделям
    public Optional<MultiLayerNetwork> getRnnModel() {
        return rnnModel;
    }

    public Optional<List<CentroidCluster<DoublePoint>>> getClusteringModel() {
        return clusteringModel;
    }

    public RouletteType getRouletteType() {
        return rouletteType;
    }
}