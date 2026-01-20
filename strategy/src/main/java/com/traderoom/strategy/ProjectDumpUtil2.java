package com.traderoom.strategy;

import java.awt.GraphicsEnvironment;
import java.awt.Toolkit;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.StringSelection;
import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.PathMatcher;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.atomic.AtomicLong;
import java.util.function.Predicate;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ProjectDumpUtil2 {

    // java com.platform.common.util.ProjectDumpUtil com.mastering.utils.excel /Users/dev/myservice full_dump.md --gitignore --remove-javadoc --table-content --clipboard --minify
    public static void main(String[] args) {
        try {
            Config config = new Builder()
                    .root(Paths.get("."))
                    .targetPackage("com.traderoom.strategy")
                    .outputPath(Paths.get("project.md"))
                    .minimizeTokens(true)
                    .removeJavaDoc(true)
                    .copyToClipboard(true)
                    .useGitIgnore(true)
                    .tableContent(false)
                    .addExcludedDir("test")
                    .addExcludedFilename("ProjectDumpUtil2.java")
                    .addExcludedFilename("ByteCsvLogger.java")
                    .addExcludedFilename("CharCsvLogger.java")
                    .addExcludedFilename("UniversalCsvLogger.java")
                    .addExcludedFilename("FastTextWriter.java")
                    .addExcludedFilename("NumberUtils.java")
                    .addExcludedFilename("analyze.md")
                    .addExcludedPattern("*Test.java")
                    .addExcludedPattern("*.log")
                    .addExcludedContent("^package .*")
                    .addExcludedContent("^import .*")
                    .build();

            new ProjectDumpUtil2(config).execute();
        } catch (Exception e) {
            System.err.println("❌ Critical Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private final Config config;

    public ProjectDumpUtil2(Config config) {
        this.config = config;
    }

    public void execute() {
        System.out.println("📂 Project Root: " + config.rootPath());
        System.out.println("🔧 Mode: " + config.getModeDescription());

        try {
            List<Path> files = new FileScanner(config).scan();

            if (files.isEmpty()) {
                System.out.println("⚠️ No files found matching criteria.");
                return;
            }

            files.sort(Comparator.comparing(Path::toString));

            ReportResult result = new ReportWriter(config).write(files);

            System.out.println("✅ Saved to: " + config.outputPath().toAbsolutePath());
            System.out.println("📊 Total files: " + files.size());
            System.out.println("🔢 Approx Tokens: " + result.totalTokens());

            if (config.copyToClipboard()) {
                ClipboardHelper.copyToClipboard(config.outputPath());
            }

        } catch (IOException e) {
            throw new UncheckedIOException("Failed to execute dump", e);
        }
    }

    // --- FileScanner (без изменений) ---
    private static class FileScanner {
        private final Config config;
        private final List<PathMatcher> gitIgnoreMatchers = new ArrayList<>();

        FileScanner(Config config) {
            this.config = config;
            if (config.useGitIgnore()) {
                loadGitIgnore();
            }
        }

        List<Path> scan() throws IOException {
            try (Stream<Path> stream = Files.walk(config.rootPath())) {
                return stream
                        .filter(Files::isRegularFile)
                        .filter(this::isNotTooLarge)
                        .filter(this::matchesTargetPackage)
                        .filter(this::isAllowedExtension)
                        .filter(this::isNotExcluded)
                        .collect(Collectors.toList());
            }
        }

        private boolean isNotTooLarge(Path path) {
            try {
                return Files.size(path) <= config.maxFileSize();
            } catch (IOException e) {
                return false;
            }
        }

        private boolean matchesTargetPackage(Path path) {
            String packagePath = config.targetPackage().replace(".", "/");
            return path.getParent().toString().replace(File.separator, "/").contains(packagePath);
        }

        private boolean isAllowedExtension(Path path) {
            return config.extensions().containsKey(getFileExtension(path));
        }

        private boolean isNotExcluded(Path path) {
            String filename = path.getFileName().toString();
            if (config.excludedFilenames().contains(filename)) return false;
            for (Path part : config.rootPath().relativize(path)) {
                if (config.excludedDirs().contains(part.toString())) return false;
            }
            for (PathMatcher matcher : config.excludedPatterns()) {
                if (matcher.matches(path.getFileName())) return false;
            }
            return !config.useGitIgnore() || !matchesGitIgnore(path);
        }

        private void loadGitIgnore() {
            Path gitIgnore = config.rootPath().resolve(".gitignore");
            if (!Files.exists(gitIgnore)) return;
            try {
                Files.readAllLines(gitIgnore).stream()
                        .map(String::trim)
                        .filter(line -> !line.isEmpty() && !line.startsWith("#"))
                        .forEach(this::addGitIgnorePattern);
            } catch (IOException e) {
                System.err.println("⚠️ Failed to read .gitignore: " + e.getMessage());
            }
        }

        private void addGitIgnorePattern(String line) {
            String pattern = line;
            if (line.endsWith("/")) pattern = line + "**";
            if (!line.contains("/")) pattern = "**/" + line;
            else if (line.startsWith("/")) pattern = line.substring(1);
            try {
                gitIgnoreMatchers.add(FileSystems.getDefault().getPathMatcher("glob:" + pattern));
            } catch (IllegalArgumentException ignored) {
            }
        }

        private boolean matchesGitIgnore(Path path) {
            Path relative = config.rootPath().relativize(path);
            for (PathMatcher matcher : gitIgnoreMatchers) {
                if (matcher.matches(relative) || matcher.matches(path.getFileName())) return true;
            }
            return false;
        }
    }

    // --- ReportWriter (Изменен: создание нового ContentProcessor для каждого файла) ---
    private static class ReportWriter {
        private final Config config;
        private final AtomicLong tokenCounter = new AtomicLong(0);

        ReportWriter(Config config) {
            this.config = config;
        }

        ReportResult write(List<Path> files) throws IOException {
            try (BufferedWriter writer = Files.newBufferedWriter(config.outputPath(), StandardCharsets.UTF_8)) {
                writeHeader(writer, files.size());

                if (config.tableContent()) {
                    writeTableOfContents(writer, files);
                }

                for (Path file : files) {
                    processFile(writer, file);
                }
            }
            return new ReportResult(tokenCounter.get());
        }

        private void writeHeader(BufferedWriter writer, int count) throws IOException {
            writer.write("# Project Context\n\n");
            writer.write("- **Package:** `" + config.targetPackage() + "`\n");
            writer.write("- **Generated:** " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")) + "\n");
            writer.write("- **Files:** " + count + "\n\n---\n\n");
        }

        private void writeTableOfContents(BufferedWriter writer, List<Path> files) throws IOException {
            writer.write("## Table of Contents\n\n");
            for (Path file : files) {
                String rel = getRelativePath(config.rootPath(), file);
                String anchor = rel.toLowerCase().replaceAll("[^a-z0-9\\-_]", "").replace(" ", "-");
                writer.write("- [" + rel + "](#" + anchor + ")\n");
            }
            writer.write("\n---\n\n");
        }

        private void processFile(BufferedWriter writer, Path file) throws IOException {
            String relativePath = getRelativePath(config.rootPath(), file);
            String ext = getFileExtension(file);
            String lang = config.extensions().getOrDefault(ext, "text");

            writer.write("### 📄 `" + relativePath + "`\n\n");
            writer.write("```" + lang + "\n");

            // ВАЖНО: Создаем новый процессор для каждого файла, чтобы сбросить состояние комментариев
            ContentProcessor processor = new ContentProcessor(config);

            try (Stream<String> lines = Files.lines(file, StandardCharsets.UTF_8)) {
                lines
                        .map(processor::processLine) // Сначала обрабатываем комментарии и минификацию
                        .filter(Objects::nonNull)    // Убираем удаленные строки
                        .forEach(line -> writeLine(writer, line));
            } catch (UncheckedIOException | IOException e) {
                writer.write("// Error reading file: " + e.getMessage());
            }

            writer.write("```\n\n---\n\n");
        }

        private void writeLine(BufferedWriter writer, String line) {
            try {
                writer.write(line);
                writer.newLine();
                tokenCounter.addAndGet(line.length() / 4 + 1);
            } catch (IOException e) {
                throw new UncheckedIOException(e);
            }
        }
    }

    // --- ContentProcessor (Полностью переписан для поддержки многострочных комментариев) ---
    private static class ContentProcessor {
        private final boolean minimize;
        private final boolean removeJavaDoc;
        private final List<Predicate<String>> exclusionRules;

        // Состояние: находимся ли мы сейчас внутри блока /* ... */
        private boolean insideBlockComment = false;

        ContentProcessor(Config config) {
            this.minimize = config.minimizeTokens();
            this.removeJavaDoc = config.removeJavaDoc();
            this.exclusionRules = config.lineExclusionRules();
        }

        /**
         * Обрабатывает строку:
         * 1. Проверяет правила исключения строк.
         * 2. Вырезает блочные комментарии, если включено removeJavaDoc.
         * 3. Минифицирует (trim), если включено.
         *
         * @return обработанная строка или null, если строку нужно пропустить.
         */
        String processLine(String line) {
            // 1. Быстрая проверка правил исключения (imports, package и т.д.)
            // Применяем только если мы НЕ внутри комментария, чтобы не ломать логику закрытия комментария
            if (!insideBlockComment && !exclusionRules.isEmpty()) {
                for (Predicate<String> rule : exclusionRules) {
                    if (rule.test(line)) return null;
                }
            }

            // 2. Обработка блочных комментариев
            String processed = line;
            if (removeJavaDoc) {
                processed = stripBlockComments(line);
                if (processed.isEmpty()) return null; // Строка полностью состояла из комментария
            }

            // 3. Минификация и очистка
            if (minimize) {
                processed = processed.trim();
            } else {
                // Даже без минификации убираем trailing spaces для чистоты
                processed = processed.replaceAll("\\s+$", "");
            }

            return processed.isEmpty() ? null : processed;
        }

        private String stripBlockComments(String line) {
            StringBuilder sb = new StringBuilder();
            int ptr = 0;
            int len = line.length();

            while (ptr < len) {
                if (!insideBlockComment) {
                    int startIdx = line.indexOf("/*", ptr);

                    if (startIdx == -1) {
                        // Комментариев больше нет в этой строке
                        sb.append(line.substring(ptr));
                        break;
                    } else {
                        // Нашли начало комментария, добавляем текст ДО него
                        sb.append(line.substring(ptr, startIdx));
                        insideBlockComment = true;
                        ptr = startIdx + 2; // Пропускаем "/*"
                    }
                } else {
                    // Мы внутри комментария, ищем конец
                    int endIdx = line.indexOf("*/", ptr);

                    if (endIdx == -1) {
                        // Конец комментария не найден в этой строке, вся оставшаяся строка - комментарий
                        ptr = len;
                    } else {
                        // Нашли конец комментария
                        insideBlockComment = false;
                        ptr = endIdx + 2; // Пропускаем "*/"
                        // Цикл продолжится, чтобы найти возможный код или следующий комментарий после этого
                    }
                }
            }
            return sb.toString();
        }
    }

    private static class ClipboardHelper {
        static void copyToClipboard(Path path) {
            if (GraphicsEnvironment.isHeadless()) {
                System.err.println("⚠️ Cannot copy to clipboard: Headless environment.");
                return;
            }
            try {
                String content = Files.readString(path);
                StringSelection selection = new StringSelection(content);
                Clipboard clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
                clipboard.setContents(selection, selection);
                System.out.println("📋 Copied to system clipboard!");
            } catch (Exception e) {
                System.err.println("⚠️ Failed to copy to clipboard: " + e.getMessage());
            }
        }
    }

    // --- Static Classes (Java 11) ---

    public static class ReportResult {
        private final long totalTokens;

        public ReportResult(long totalTokens) {
            this.totalTokens = totalTokens;
        }

        public long totalTokens() {
            return totalTokens;
        }
    }

    public static class Config {
        private final Path rootPath;
        private final String targetPackage;
        private final Path outputPath;
        private final long maxFileSize;
        private final boolean minimizeTokens;
        private final boolean removeJavaDoc; // New Field
        private final boolean copyToClipboard;
        private final boolean useGitIgnore;
        private final boolean tableContent;
        private final Set<String> excludedDirs;
        private final Set<String> excludedFilenames;
        private final List<PathMatcher> excludedPatterns;
        private final List<Predicate<String>> lineExclusionRules;
        private final Map<String, String> extensions;

        public Config(Path rootPath, String targetPackage, Path outputPath, long maxFileSize,
                      boolean minimizeTokens, boolean removeJavaDoc, boolean copyToClipboard,
                      boolean useGitIgnore, boolean tableContent, Set<String> excludedDirs,
                      Set<String> excludedFilenames, List<PathMatcher> excludedPatterns,
                      List<Predicate<String>> lineExclusionRules, Map<String, String> extensions) {
            this.rootPath = rootPath;
            this.targetPackage = targetPackage;
            this.outputPath = outputPath;
            this.maxFileSize = maxFileSize;
            this.minimizeTokens = minimizeTokens;
            this.removeJavaDoc = removeJavaDoc;
            this.copyToClipboard = copyToClipboard;
            this.useGitIgnore = useGitIgnore;
            this.tableContent = tableContent;
            this.excludedDirs = Collections.unmodifiableSet(excludedDirs);
            this.excludedFilenames = Collections.unmodifiableSet(excludedFilenames);
            this.excludedPatterns = Collections.unmodifiableList(excludedPatterns);
            this.lineExclusionRules = Collections.unmodifiableList(lineExclusionRules);
            this.extensions = Collections.unmodifiableMap(extensions);
        }

        // Getters
        public Path rootPath() {
            return rootPath;
        }

        public String targetPackage() {
            return targetPackage;
        }

        public Path outputPath() {
            return outputPath;
        }

        public long maxFileSize() {
            return maxFileSize;
        }

        public boolean minimizeTokens() {
            return minimizeTokens;
        }

        public boolean removeJavaDoc() {
            return removeJavaDoc;
        }

        public boolean copyToClipboard() {
            return copyToClipboard;
        }

        public boolean useGitIgnore() {
            return useGitIgnore;
        }

        public boolean tableContent() {
            return tableContent;
        }

        public Set<String> excludedDirs() {
            return excludedDirs;
        }

        public Set<String> excludedFilenames() {
            return excludedFilenames;
        }

        public List<PathMatcher> excludedPatterns() {
            return excludedPatterns;
        }

        public List<Predicate<String>> lineExclusionRules() {
            return lineExclusionRules;
        }

        public Map<String, String> extensions() {
            return extensions;
        }

        public String getModeDescription() {
            return (minimizeTokens ? "Minified" : "Full") +
                    (removeJavaDoc ? " + NoJavaDoc" : "") +
                    (useGitIgnore ? " + .gitignore" : "") +
                    (copyToClipboard ? " + Clipboard" : "");
        }
    }

    public static class Builder {
        private Path rootPath = Paths.get(".");
        private String targetPackage = "";
        private Path outputPath = Paths.get("project.md");
        private final long maxFileSize = 1024 * 1024;
        private boolean minimizeTokens = false;
        private boolean removeJavaDoc = false;
        private boolean copyToClipboard = false;
        private boolean useGitIgnore = false;
        private boolean tableContent = false;

        private final Set<String> excludedDirs = new HashSet<>(Set.of(
                "target", ".git", ".idea", ".mvn", "node_modules", "build", "dist", ".gradle", "out", "bin"));
        private final Set<String> excludedFilenames = new HashSet<>();
        private final List<String> rawExcludedPatterns = new ArrayList<>();
        private final List<String> rawExcludedContent = new ArrayList<>();
        private final Map<String, String> extensions = new HashMap<>(Map.ofEntries(
                Map.entry(".java", "java"),
                Map.entry(".kt", "kotlin"),
                Map.entry(".xml", "xml"),
                Map.entry(".yaml", "yaml"),
                Map.entry(".yml", "yaml"),
                Map.entry(".json", "json"),
                Map.entry(".sql", "sql"),
                Map.entry(".properties", "properties"),
                Map.entry(".js", "javascript"),
                Map.entry(".ts", "typescript"),
                Map.entry(".html", "html"),
                Map.entry(".css", "css"),
                Map.entry(".md", "markdown"),
                Map.entry(".gitignore", "text")
        ));

        public Builder root(Path root) {
            rootPath = resolveProjectRoot(root);
            return this;
        }

        public Builder targetPackage(String pkg) {
            targetPackage = pkg;
            return this;
        }

        public Builder outputPath(Path out) {
            outputPath = out;
            return this;
        }

        public Builder minimizeTokens(boolean val) {
            minimizeTokens = val;
            return this;
        }

        public Builder removeJavaDoc(boolean val) {
            removeJavaDoc = val;
            return this;
        } // New Builder Method

        public Builder copyToClipboard(boolean val) {
            copyToClipboard = val;
            return this;
        }

        public Builder useGitIgnore(boolean val) {
            useGitIgnore = val;
            return this;
        }

        public Builder tableContent(boolean val) {
            tableContent = val;
            return this;
        }

        public Builder addExcludedFilename(String... f) {
            Collections.addAll(excludedFilenames, f);
            return this;
        }

        public Builder addExcludedDir(String d) {
            excludedDirs.add(d);
            return this;
        }

        public Builder addExcludedPattern(String p) {
            rawExcludedPatterns.add(p);
            return this;
        }

        public Builder addExcludedContent(String c) {
            rawExcludedContent.add(c);
            return this;
        }

        public Config build() {
            if (targetPackage.isEmpty()) throw new IllegalArgumentException("Target package required");
            List<PathMatcher> compiledPatterns = rawExcludedPatterns.stream()
                    .map(p -> FileSystems.getDefault().getPathMatcher("glob:" + p))
                    .collect(Collectors.toList());
            List<Predicate<String>> compiledContentRules = rawExcludedContent.stream()
                    .map(this::compileContentRule)
                    .collect(Collectors.toList());
            return new Config(rootPath, targetPackage, outputPath, maxFileSize, minimizeTokens,
                    removeJavaDoc, copyToClipboard, useGitIgnore, tableContent, excludedDirs,
                    excludedFilenames, compiledPatterns, compiledContentRules, extensions);
        }

        private Predicate<String> compileContentRule(String rule) {
            if (rule.startsWith("^") || rule.endsWith("$") || rule.contains(".*")) {
                Pattern p = Pattern.compile(rule);
                return s -> p.matcher(s).find();
            }
            return s -> s.contains(rule);
        }

        private static Path resolveProjectRoot(Path start) {
            Path current = start.toAbsolutePath().normalize();
            while (current != null) {
                if (Files.exists(current.resolve("pom.xml")) ||
                        Files.exists(current.resolve("build.gradle")) ||
                        Files.exists(current.resolve(".git"))) {
                    return current;
                }
                current = current.getParent();
            }
            return start.toAbsolutePath();
        }
    }

    private static String getFileExtension(Path file) {
        String name = file.getFileName().toString();
        int idx = name.lastIndexOf('.');
        return idx == -1 ? "" : name.substring(idx);
    }

    private static String getRelativePath(Path root, Path file) {
        return root.relativize(file).toString().replace("\\", "/");
    }
}