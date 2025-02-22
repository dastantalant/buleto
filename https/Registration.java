

import javax.net.ssl.SSLSocket;
import javax.net.ssl.SSLSocketFactory;
import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.LinkedHashMap;
import java.util.Map;

public class Registration {

    private static String host;
    private static int port;
    private static String moodleSession;

    public static void run(SSLSocketFactory factory) {
        host = "195.38.164.139";
        port = 443;

        Map<String, String> params = new LinkedHashMap<>();
        params.put("username", "makkambaevdastan");
        params.put("password", "1234%^&*Das");
        params.put("email", "makkambaevdastan@yandex.ru");
        params.put("email2", "makkambaevdastan@yandex.ru");
        params.put("firstname", "Дастан");
        params.put("lastname", "Маккамбаев");
        params.put("country", "KG");
        params.put("city", "Bishkek");
        params.put("_qf__login_signup_form", "1");
        params.put("mform_isexpanded_id_createuserandpass", "1");
        params.put("submitbutton", "Создать мой новый аккаунт");

        System.out.println("==============================BEGIN GET " + host + "/login/signup.php==============================");
        signupGET(factory, params);
        System.out.println("==============================END GET " + host + "/login/signup.php==============================\n");

        System.out.println("==============================BEGIN POST " + host + "/login/signup.php==============================");
        signupPost(factory, params);
        System.out.println("==============================END POST " + host + "/login/signup.php==============================\n");
    }

    private static void signupGET(SSLSocketFactory factory, Map<String, String> params) {
        SSLSocket sslsocket = null;
        BufferedReader bufferedReader = null;
        OutputStream outputStream = null;
        OutputStream outStreamIndex = null;
        OutputStream outStreamHTTP = null;
        try {
            sslsocket = (SSLSocket) factory.createSocket(host, port);
            bufferedReader = new BufferedReader(new InputStreamReader(sslsocket.getInputStream(), StandardCharsets.UTF_8));
            outputStream = sslsocket.getOutputStream();
            String request = "GET" + " " + "/login/signup.php" + " HTTP/1.1" + "\r\n" +
                    "Host: " + host + "\r\n" +
                    "Origin: " + "https://" + host + "\r\n" +
                    "User-Agent: JDK 17" + "\r\n" +
                    "Connection: keep-alive" + "\r\n" +
                    "Accept: text/html" + "\r\n" +
                    "\r\n";
            outputStream.write(request.getBytes(StandardCharsets.UTF_8));
            outputStream.flush();

            String line;
            boolean flag = false;
            StringBuilder result = new StringBuilder();
            StringBuilder http = new StringBuilder();
            http.append("==============================REQUEST BEGIN==============================");
            http.append("\n").append(request);
            http.append("==============================REQUEST END==============================");
            http.append("\n\n");
            http.append("==============================RESPONSE BEGIN==============================");
            while ((line = bufferedReader.readLine()) != null) {
                if (!flag) {
                    http.append("\n");
                    if (line.contains("<!DOCTYPE html>")) {
                        flag = true;
                    } else {
                        http.append(line);
                    }
                }
                if (flag) {
                    result.append(line).append("\n");
                }
                if (line.contains("Set-Cookie:")) {
                    int start = line.indexOf("MoodleSession") + 14;
                    int end = line.indexOf(";", start);
                    moodleSession = line.substring(start, end);
                }

                if (line.contains("name=\"sesskey\"")) {
                    int start = line.indexOf("name=\"sesskey\"");
                    int end = line.length();
                    for (int i = start; i < line.length(); i++) {
                        if (line.charAt(i) == '>') {
                            end = i;
                        }
                    }
                    String in = line.substring(start, end);
                    start = in.indexOf("value");
                    start = in.indexOf('"', start) + 1;
                    end = in.indexOf('"', start);
                    params.put("sesskey", in.substring(start, end));
                }
            }
            http.append("==============================RESPONSE END==============================");

            outStreamIndex = new FileOutputStream("result/0_signup_index_get.html");
            outStreamIndex.write(result.toString().getBytes(StandardCharsets.UTF_8));
            outStreamIndex.close();

            outStreamHTTP = new FileOutputStream("result/0_signup_index_get.http");
            outStreamHTTP.write(http.toString().getBytes(StandardCharsets.UTF_8));
        } catch (IOException ioe) {
            System.out.println(ioe);
        } finally {
            try {
                if (sslsocket != null) {
                    sslsocket.close();
                }
                if (bufferedReader != null) {
                    bufferedReader.close();
                }
                if (outputStream != null) {
                    outputStream.close();
                }
                if (outStreamIndex != null) {
                    outStreamIndex.close();
                }
                if (outStreamHTTP != null) {
                    outStreamHTTP.close();
                }
            } catch (IOException ioe) {
                System.out.println(ioe);
            }
        }
    }

    private static void signupPost(SSLSocketFactory factory, Map<String, String> params) {
        SSLSocket sslsocket = null;
        BufferedReader bufferedReader = null;
        OutputStream outputStream = null;
        OutputStream outStreamIndex = null;
        OutputStream outStreamHTTP = null;
        try {
            String path = "/login/signup.php";

            sslsocket = (SSLSocket) factory.createSocket(host, port);
            bufferedReader = new BufferedReader(new InputStreamReader(sslsocket.getInputStream(), StandardCharsets.UTF_8));
            outputStream = sslsocket.getOutputStream();

            StringBuilder body = new StringBuilder();
            for (Map.Entry<String, String> param : params.entrySet()) {
                if (body.length() != 0) body.append('&');
                body.append(URLEncoder.encode(param.getKey(), StandardCharsets.UTF_8));
                body.append('=');
                body.append(URLEncoder.encode(param.getValue(), StandardCharsets.UTF_8));
            }

            StringBuilder request = new StringBuilder();
            request.append("POST").append(" ").append(path).append(" HTTP/1.1").append("\r\n");
            request.append("Host: ").append(host).append("\r\n");
            request.append("Origin: ").append("https://").append(host).append("\r\n");
            request.append("Referer: ").append("https://").append(host).append(path).append("\r\n");
            request.append("User-Agent: JDK 17").append("\r\n");
            request.append("Content-Type: application/x-www-form-urlencoded").append("\r\n");
            request.append("Content-Length: ").append(body.length()).append("\r\n");
            request.append("Cookie: MoodleSession=").append(moodleSession).append("\r\n");
            request.append("Connection: keep-alive").append("\r\n");
            request.append("Accept: text/html").append("\r\n");
            request.append("\r\n");
            request.append(body);

            outputStream.write(request.toString().getBytes(StandardCharsets.UTF_8));
            outputStream.flush();

            String line;
            boolean flag = false;
            StringBuilder result = new StringBuilder();
            StringBuilder http = new StringBuilder();
            http.append("==============================REQUEST BEGIN==============================");
            http.append("\n").append(request);
            http.append("==============================REQUEST END==============================");
            http.append("\n\n");
            http.append("==============================RESPONSE BEGIN==============================");
            while ((line = bufferedReader.readLine()) != null) {
                if (!flag) {
                    http.append("\n");
                    if (line.contains("<!DOCTYPE html>")) {
                        flag = true;
                    } else {
                        http.append(line);
                    }
                }
                if (flag) {
                    result.append(line).append("\n");
                }
                if (line.contains("Set-Cookie:")) {
                    int start = line.indexOf("MoodleSession") + 14;
                    int end = line.indexOf(";", start);
                    moodleSession = line.substring(start, end);
                }
            }
            http.append("==============================RESPONSE END==============================");

            outStreamIndex = new FileOutputStream("result/1_signup_index_post.html");
            outStreamIndex.write(result.toString().getBytes(StandardCharsets.UTF_8));
            outStreamIndex.close();

            outStreamHTTP = new FileOutputStream("result/1_signup_index_post.http");
            outStreamHTTP.write(http.toString().getBytes(StandardCharsets.UTF_8));
        } catch (IOException ioe) {
            System.out.println(ioe);
        } finally {
            try {
                if (sslsocket != null) {
                    sslsocket.close();
                }
                if (bufferedReader != null) {
                    bufferedReader.close();
                }
                if (outputStream != null) {
                    outputStream.close();
                }
                if (outStreamIndex != null) {
                    outStreamIndex.close();
                }
                if (outStreamHTTP != null) {
                    outStreamHTTP.close();
                }
            } catch (IOException ioe) {
                System.out.println(ioe);
            }
        }
    }
}
