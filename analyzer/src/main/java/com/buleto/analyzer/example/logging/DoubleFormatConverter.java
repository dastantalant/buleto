//package com.traderoom.analyzer.buleto.logging;
//
//import com.toolbox.core.converter.Converter;
//
//import java.util.Locale;
//
//public class DoubleFormatConverter implements Converter<Double, String> {
//
//    @Override
//    public String convert(Double value) {
//        if (value == null) {
//            return "0.00";
//        }
//        return String.format(Locale.US, "%.2f", value);
//    }
//}