import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.nio.file.Files;

public class Main {

    public static void main(String[] args) throws Exception {
        byte[] buffer = new byte[1024 * 1024];
        BufferedInputStream bis = new BufferedInputStream(new FileInputStream("temp/main.js"));
        int bytesRead = bis.read(buffer);
        StringBuilder build = new StringBuilder();
        int bracket = 0;
        int count = 0;
        while (bytesRead != -1) {
            boolean func = false;
            boolean open = false;
            for (int i = 0; i < bytesRead; i++) {
                if (!func && ((char) buffer[i] == ',' || (char) buffer[i] == '\n')) {
                    continue;
                }
                build.append((char) buffer[i]);
                if (func) {
                    if (!open && (char) buffer[i] == '{') {
                        open = true;
                        bracket++;
                    } else if ((char) buffer[i] == '{') {
                        bracket++;
                    } else if ((char) buffer[i] == '}') {
                        bracket--;
                    } else {
                        continue;
                    }
                    if (bracket == 0) {
                        count++;
                        Files.write(new File(getFileName(count)).toPath(),
                                build.toString().getBytes());
                        func = false;
                        build = new StringBuilder();
                        open = false;
                    }
                } else {
                    func = check(build);
                }
            }
            bytesRead = bis.read(buffer);
        }
        bis.close();
    }

    private static boolean check(StringBuilder build) {
        return build.indexOf("function") != -1;
    }

    private static String getFileName(int count) {
        if (0 < count && count < 10) {
            return "temp/000" + count + ".js";
        } else if (10 <= count && count < 100) {
            return "temp/00" + count + ".js";
        } else if (100 <= count && count < 1000) {
            return "temp/0" + count + ".js";
        } else {
            return "temp/"+count + ".js";
        }
    }
}