//package com.selenium.java.buleto.repository;
//
//import com.selenium.java.buleto.model.Grid;
//import com.selenium.java.buleto.service.GridService;
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Paths;
//import java.nio.file.StandardOpenOption;
//import org.springframework.stereotype.Repository;
//
//@Repository
//public class GridFileRepository implements GridService {
//    @Override
//    public boolean save(Grid grid) {
//        try {
//            Files.write(Paths.get("grid.bw"), grid.get().getBytes(), StandardOpenOption.APPEND);
//            return true;
//        } catch (IOException e) {
//            e.printStackTrace();
//            return false;
//        }
//    }
//    @Override
//    public boolean save(String grid) {
//        try {
//            Files.write(Paths.get("grid.bw"), grid.getBytes(), StandardOpenOption.APPEND);
//            return true;
//        } catch (IOException e) {
//            e.printStackTrace();
//            return false;
//        }
//    }
//}
