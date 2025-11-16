package com.traderoom.strategy.utils;

import com.traderoom.strategy.Constant;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;

import java.io.File;

@Slf4j
@UtilityClass
public class FileHelper {

    public static File getSettingFile(String fileName) {
        File file = new File(Constant.SETTING_FILE_DIRECTORY, fileName);
        if (!file.getParentFile().exists() && !file.getParentFile().mkdirs()) {
            log.error(" Не удалось создать директорию для файла настроек: {}", file.getParentFile().getAbsolutePath());
        }
        return file;
    }
}