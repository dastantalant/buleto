package com.traderoom.strategy.library;

import com.google.common.reflect.ClassPath;

import lombok.extern.slf4j.Slf4j;

import java.io.File;
import java.io.IOException;
import java.net.JarURLConnection;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashSet;
import java.util.Set;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;
import java.util.stream.Collectors;

@Slf4j
public class ClassScanner {

    public static Set<Class<?>> scanGuava(String... basePackages) {
        if (basePackages == null || basePackages.length == 0) {
            return Collections.emptySet();
        }
        ClassLoader loader = Thread.currentThread().getContextClassLoader();
        try {
            final ClassPath classPath = ClassPath.from(loader);
            return Arrays.stream(basePackages)
                    .flatMap(packageName -> classPath.getTopLevelClassesRecursive(packageName).stream())
                    .map(ClassPath.ClassInfo::load)
                    .collect(Collectors.toUnmodifiableSet());
        } catch (IOException _) {
            return Collections.emptySet();
        }
    }

    public Set<Class<?>> scan(String... basePackages) {
        if (basePackages == null || basePackages.length == 0) {
            log.warn("Scan not started: No base packages specified");
            return Collections.emptySet();
        }

        log.info("Start scanning packages: {}", Arrays.toString(basePackages));
        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        Set<Class<?>> foundClasses = Arrays.stream(basePackages)
                .flatMap(packageName -> findClassesInPackage(packageName, classLoader).stream())
                .collect(Collectors.toUnmodifiableSet());

        log.info("Scan complete. Classes found: {}", foundClasses.size());
        return foundClasses;
    }

    private Set<Class<?>> findClassesInPackage(String packageName, ClassLoader classLoader) {
        String path = packageName.replace('.', '/');
        Set<Class<?>> classes = new HashSet<>();
        try {
            Enumeration<URL> resources = classLoader.getResources(path);
            while (resources.hasMoreElements()) {
                URL resource = resources.nextElement();
                log.debug("Resource found for package'{}': {}", packageName, resource);
                if (resource.getProtocol().equals("file")) {
                    findClassesInDirectory(new File(URLDecoder.decode(resource.getFile(), StandardCharsets.UTF_8)), packageName, classes);
                } else if (resource.getProtocol().equals("jar")) {
                    findClassesInJar(resource, packageName, classes);
                }
            }
        } catch (IOException e) {
            log.error("I/O error while scanning packet '{}': {}", packageName, e.getMessage(), e);
        }
        return classes;
    }

    private void findClassesInDirectory(File directory, String packageName, Set<Class<?>> classes) {
        if (!directory.exists()) {
            log.trace("The directory does not exist: {}", directory);
            return;
        }
        File[] files = directory.listFiles();
        if (files == null) {
            return;
        }

        for (File file : files) {
            if (file.isDirectory()) {
                findClassesInDirectory(file, packageName + "." + file.getName(), classes);
            } else if (file.getName().endsWith(".class")) {
                String className = packageName + '.' + file.getName().substring(0, file.getName().length() - 6);
                loadClass(className, classes);
            }
        }
    }

    private void findClassesInJar(URL jarUrl, String packageName, Set<Class<?>> classes) {
        log.debug("Scanning JAR for a package '{}': {}", packageName, jarUrl);
        String packagePath = packageName.replace('.', '/');
        JarFile jarFile;

        try {
            JarURLConnection conn = (JarURLConnection) jarUrl.openConnection();
            conn.setUseCaches(false);
            jarFile = conn.getJarFile();
        } catch (IOException e) {
            log.error("Failed to get JarFile from URL '{}': {}", jarUrl, e.getMessage(), e);
            return;
        }

        try (JarFile jf = jarFile) {
            Enumeration<JarEntry> entries = jf.entries();
            while (entries.hasMoreElements()) {
                JarEntry entry = entries.nextElement();
                String entryName = entry.getName();
                if (entryName.startsWith(packagePath) && entryName.endsWith(".class")) {
                    String className = entryName.replace('/', '.').substring(0, entryName.length() - 6);
                    loadClass(className, classes);
                }
            }
        } catch (IOException e) {
            log.error("Error reading JAR file '{}': {}", jarUrl, e.getMessage(), e);
        }
    }

    private void loadClass(String className, Set<Class<?>> classes) {
        try {
            Class<?> clazz = Class.forName(className, false, Thread.currentThread().getContextClassLoader());
            classes.add(clazz);
        } catch (ClassNotFoundException _) {
            log.warn("Class '{}' not found. Possibly missing dependencies.", className);
        } catch (LinkageError e) {
            log.error("Error loading class '{}': {}", className, e.getMessage(), e);
        } catch (Exception e) {
            log.error("Unexpected error loading class '{}': {}", className, e.getMessage(), e);
        }
    }
}