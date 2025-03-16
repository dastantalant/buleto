//package com.selenium.java.buleto.repository;
//
//import com.selenium.java.buleto.service.BulletWaveService;
//import com.selenium.java.buleto.model.BulletWave;
//import java.io.IOException;
//import java.math.BigDecimal;
//import java.nio.file.Files;
//import java.nio.file.Paths;
//import java.nio.file.StandardOpenOption;
//import org.springframework.stereotype.Repository;
//
//@Repository
//public class BulletWaveFileRepository implements BulletWaveService {
//    private final StringBuilder content;
//
//    public BulletWaveFileRepository() {
//        content = new StringBuilder();
//    }
//
//    @Override
//    public boolean save(BulletWave bulletWave) {
//        try {
//            content.delete(0, content.length());
//            BigDecimal bigDecimal;
//            while ((bigDecimal = bulletWave.pollFirst()) != null) {
//                content.append(bigDecimal).append('\n');
//            }
//            Files.write(Paths.get("bullet_wave.bw"), content.toString().getBytes(), StandardOpenOption.APPEND);
//            return true;
//        } catch (IOException e) {
//            e.printStackTrace();
//            return false;
//        }
//    }
//}
