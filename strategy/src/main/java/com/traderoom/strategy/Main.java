package com.traderoom.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.application.ModelManager;
import com.traderoom.strategy.application.ModelProvider;
import com.traderoom.strategy.application.StrategyFactory;
import com.traderoom.strategy.enums.RouletteType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.enums.SpotGenerateType;
import com.traderoom.strategy.model.ContextModel;
import com.traderoom.strategy.model.SimulatorLog;
import com.traderoom.strategy.strategy.Strategy;
import lombok.Builder;

import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Queue;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Main {
    private static final String MODELS_DIR = "data/models";
    static final int START = 1_000;
    static final Random random = new Random();
    static final Simulator simulator = new Simulator();
    static final ContextModel context = ContextModel.builder()
            .rouletteType(RouletteType.AMERICAN) // Или EUROPEAN, для консистентности
            .spotGenerateType(SpotGenerateType.RANDOM)
            .start(START)
            .min(1)
            .max(10)
            .totalRoundBetLimit(15_000)
            // 1. Устанавливаем ОЧЕНЬ жесткий стоп-лосс.
            //    Стратегия остановится, если баланс упадет всего на 1% (до 990).
            .stopLossPercentage(10)
            // 2. Трейлинг-стоп нам не нужен при такой тактике.
            .trailingStopPercentage(0)
            // 3. Устанавливаем небольшую, но достижимую цель по прибыли.
            //    Стратегия остановится, как только заработает 10% (баланс 1100).
            .takeProfitPercentage(25)

            .build();
    static final Set<String> strategies = StrategyFactory.getAll().keySet();

//    static final Set<String> strategies = StrategyFactory.getAll(List.of(
//                    "TripleSixStrategy",
//                    "MartingaleStrategy5",
//                    "StraightUpStrategy3",
//                    "MartingaleStrategy4",
//                    "ThirtyOneSystemStrategy",
//                    "TwoInOneStrategy",
//                    "TenPercentStrategy",
//                    "MarketRegimeClusteringStrategy",
//                    "AdaptiveVolatilityStrategy",
//                    "RomanoskyStrategy",
//                    "RandomStrategy",
//                    "MartingaleStrategy2",
//                    "MartingaleStrategy3",
//                    "FlowerBetStrategy",
//                    "GameRegimeStrategy",
//                    "EastCoastProgressionStrategy",
//                    "SimpleAdaptiveVolatilityStrategy",
//                    "ColorBalanceStrategy",
//                    "CocomoStrategy",
//                    "RepeatingColorPatternStrategy",
//                    "MonteCarloStrategy",
//                    "MartingaleStrategy",
//                    "MeanReversionStrategy",
//                    "Q_LearningAgentStrategy",
//                    "BarnetStrategy",
//                    "ReverseMartingaleRedStrategy",
//                    "TopNRnnCandidatesStrategy",
//                    "EvenOddBalanceStrategy",
//                    "CappedMartingaleStrategy",
//                    "FibonacciStrategy",
//                    "KellyCriterionStrategy",
//                    "StraightUpStrategy",
//                    "PredictorConfidenceStrategy",
//                    "DalembertStrategy",
//                    "TenUnitStrategy",
//                    "GrandMartingaleStrategy",
//                    "EnsemblePredictionStrategy",
//                    "StraightUpStrategy2",
//                    "SelfTuningHybridStrategy",
//                    "HybridPredictorStrategy",
//                    "PatternStrategy",
//                    "StrategyPortfolioManager",
//                    "GoodmanStrategy",
//                    "Rate9848PercentStrategy",
//                    "RandomStrategy2",
//                    "NeighborAnalysisStrategy",
//                    "ParoliStrategy",
//                    "MansuriansStrategy",
//                    "ColdNumbersStrategy",
//                    "DistantProgressionStrategy",
//                    "HotNumbersStrategy"))
//            .keySet();

    static final int TRAINING_DATA_SIZE = 5000;

    static final int EPOCH = 5;
    static final int ROUNDS_PER_EPOCH = 1000;


    void main() throws IOException {

        if (areModelsTrained()) {
            System.out.println("Pre-trained models found. Skipping offline training.");
        } else {
            System.out.println("Pre-trained models not found. Starting offline training...");
            runOfflineTraining(true);
        }
        Map<String, Long> finalStatistics = runSimulation();

        System.out.println("\n--- Final Statistics (Total Profit/Loss) ---");
        finalStatistics.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .forEach(entry -> System.out.printf("%-40s %d\n", entry.getKey(), entry.getValue()));
    }

    private static boolean areModelsTrained() {
        Path rnnModelPath = Paths.get(MODELS_DIR, "rnn_model.zip");
        Path clusteringModelPath = Paths.get(MODELS_DIR, "clustering_model.ser");

        boolean rnnExists = Files.exists(rnnModelPath);
        boolean clusteringExists = Files.exists(clusteringModelPath);

        return rnnExists && clusteringExists;
    }

    public static void runOfflineTraining(boolean file) throws IOException {
        if (file) {
            Queue<Integer> queue = readFile("C:\\Users\\dastan\\home\\github\\traderoom\\victory.csv");
            if(queue != null)
                runOfflineTraining(queue);
        } else {
            Queue<Integer> queue = new LinkedList<>();
            for (int i = 0; i < TRAINING_DATA_SIZE; i++) {
                queue.add(random.nextInt(38) - 1);
            }
            runOfflineTraining(queue);
        }
    }

    public static void runOfflineTraining(Queue<Integer> que) throws IOException {
        ModelManager modelManager = new ModelManager(MODELS_DIR);

        System.out.println("Generating offline training data programmatically...");

        int size = que.size();
        List<Spot> trainingData = new ArrayList<>(size);
        for (int i = 0; i < size-1; i++) {
            Integer poll = que.poll();
            if (poll == null) {
                break;
            }
            trainingData.add(Spot.getByNumber(poll));
        }

        System.out.println("Training data generated (" + size + " spots). Starting model training...");

        if (trainingData.size() < 100) {
            System.err.println("Not enough training data. Skipping training.");
            return;
        }

        modelManager.trainAndSaveRnnModel(trainingData, context.rouletteType());
        modelManager.trainAndSaveClusteringModel(trainingData);
        System.out.println("Offline training complete.");
    }

    public static Map<String, Long> runSimulation() {
        System.out.println("Starting simulation...");
        ModelManager modelManager = new ModelManager(MODELS_DIR);
        ModelProvider modelProvider = new ModelProvider(modelManager, context.rouletteType());

        Map<Integer, Map<String, Result>> allResults = HashMap.newHashMap(EPOCH);
        for (int i = 0; i < EPOCH; i++) {
            System.out.println("Running epoch " + (i + 1) + "/" + EPOCH);
            allResults.put(i, epoch(readFile("C:\\Users\\dastan\\home\\github\\traderoom\\victory.csv"), modelProvider));
//            allResults.put(i, epoch(generateRandomRoundData(), modelProvider));
        }
        System.out.println("Simulation finished.");
        return write(allResults, true);
    }

//    private static Queue<Integer> generateRandomRoundData() {
//        Queue<Integer> list = new LinkedList<>();
//        for (int i = 0; i < ROUNDS_PER_EPOCH; i++) {
//            list.add(random.nextInt(38) - 1);
//        }
//        return list;
//    }


    private static Map<String, Long> write(Map<Integer, Map<String, Result>> map, boolean all) {
        Map<String, Long> statistic = HashMap.newHashMap(strategies.size());
        StringBuilder csv = new StringBuilder();
        csv.append("epoch,strategy,balance\n");
        map.forEach((key, results) -> {
            csv.append(key + 1).append(",,,\n");
            results.entrySet().stream()
                    .sorted(Map.Entry.<String, Result>comparingByValue(Comparator.comparingLong(Result::finalBalance).reversed()))
                    .forEach(entry -> {
                        String strategy = entry.getKey();
                        Result result = entry.getValue();
                        if (all || result.finalBalance() >= START) {
                            csv.append(',')
                                    .append(strategy).append(',')
                                    .append(result.finalBalance()).append(',')
                                    .append('\n');
                        }
                        long diff = result.finalBalance() - START;
                        if (result.strategy() != null) {
                            statistic.compute(result.strategy(), (_k, current) -> current == null ? diff : current + diff);
                        }
                    });
        });

        String outputPath = "C:\\Users\\dastan\\home\\github\\traderoom\\result.csv";
        csv.append("Statistic").append(",,,\n");
        statistic.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .forEach(entry -> csv.append(',').append(entry.getKey()).append(',').append(entry.getValue()).append(",\n"));

        writeFile(outputPath, csv.toString());
        System.out.println("Results written to " + outputPath);
        return statistic;
    }


    public static Map<String, Result> epoch(Queue<Integer> list, ModelProvider modelProvider) {
        Map<String, Result> resultMap = HashMap.newHashMap(strategies.size());
        List<Integer> initialList = new ArrayList<>(list);

        strategies.forEach(strategyName -> {
            Queue<Integer> spotsQueue = new LinkedList<>(initialList);
            Result result = simulate(strategyName, spotsQueue, modelProvider);
            if (result != null) {
                resultMap.put(result.strategy(), result);
            }
        });
        return resultMap;
    }


    private static Result simulate(String strategyName, Queue<Integer> spotsQueue, ModelProvider modelProvider) {
        Context freshContext = context.toContext();
        Optional<Strategy> optionalStrategy = StrategyFactory.load(strategyName, freshContext, modelProvider);
        if (optionalStrategy.isEmpty()) {
            return null;
        }
        Strategy strategyInstance = optionalStrategy.get();
        SimulatorLog simLog = simulator.run(strategyInstance, freshContext, spotsQueue);

        if (simLog.spots().isEmpty()) {
            return Result.builder()
                    .finalBalance(START)
                    .strategy(strategyName)
                    .csv("")
                    .build();
        }

        StringBuilder csv = new StringBuilder();
        csv.append("round,victory_spot,is_win,balance,total_bet,win_amount,loss_amount,bets_on_spots\n");
        simLog.spots().forEach((key, value) -> {
            String betsString = value.bets().entrySet().stream()
                    .map(entry -> entry.getKey() + ":" + entry.getValue())
                    .collect(Collectors.joining(" "));
            csv.append(key).append(',')
                    .append(value.victory()).append(',')
                    .append(value.isWin()).append(',')
                    .append(value.balance()).append(',')
                    .append(value.allBetAmount()).append(',')
                    .append(value.winAmount()).append(',')
                    .append(value.lossAmount()).append(',')
                    .append('"').append(betsString).append('"').append('\n');
        });

        long finalBalance = START;

        if (!simLog.spots().isEmpty()) {
            finalBalance = simLog.spots().get(simLog.spots().size() - 1).balance();
        }

        return Result.builder()
                .finalBalance(finalBalance)
                .strategy(strategyName)
                .csv(csv.toString())
                .build();
    }

    private static void writeFile(String file, String content) {
        try {
            Path filePath = Path.of(file);
            Files.createDirectories(filePath.getParent());
            Files.writeString(filePath, content);
        } catch (IOException e) {
            System.err.println("Failed to write to file: " + file);
            e.printStackTrace();
        }
    }

    private static void promt() {
        String sourceDir = "C:\\Users\\dastan\\home\\github\\traderoom";
        String outputFile = "combined_output.txt";

        try {
            Files.deleteIfExists(Paths.get(outputFile));
            try (BufferedWriter writer = Files.newBufferedWriter(Paths.get(outputFile));
                 Stream<Path> walk = Files.walk(Paths.get(sourceDir))) {
                walk.filter(Files::isRegularFile)
                        .filter(path -> path.toString().endsWith(".java"))
                        .forEach(path -> {
                            try {
                                writer.write("===== File: " + path.toString() + " =====\n\n");
                                String content = Files.readString(path);
                                writer.write(content);
                                writer.write("\n\n");
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        });
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static Queue<Integer> readFile(String csvPath) {
        Path path = Paths.get(csvPath);
        if (!Files.exists(path)) {
            return null;
        }
        try (Stream<String> lines = Files.lines(path)) {
            List<Integer> list = lines
                    .skip(1)
                    .map(String::trim)
                    .filter(line -> !line.isEmpty())
                    .map(Integer::parseInt)
                    .map(number -> (number == 37) ? -1 : number)
                    .toList();
            return new LinkedList<>(list);
        } catch (IOException e) {
            System.err.println("Ошибка чтения файла " + csvPath + ": " + e.getMessage());
            return null;
        }
    }

    public static void write(String dir, Map<String, Result> sortedMap) throws IOException {
        clearDirectoryContents(dir);
        sortedMap.forEach((_k, value) -> writeFile(dir + "\\" + value.finalBalance() + "_" + value.strategy() + ".csv", value.csv()));
    }

    public static void clearDirectoryContents(String dir) throws IOException {
        Path directory = Path.of(dir);
        if (!Files.isDirectory(directory)) {
            throw new IllegalArgumentException("Path must be a directory: " + directory);
        }
        try (Stream<Path> walk = Files.walk(directory)) {
            walk.sorted(Comparator.reverseOrder())
                    .filter(path -> !path.equals(directory))
                    .forEach(path -> {
                        try {
                            Files.delete(path);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    });
        }
    }

    @Builder
    public record Result(String strategy, long finalBalance, String csv) {
    }

}