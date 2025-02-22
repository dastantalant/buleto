

import javax.net.ssl.SSLSocket;
import javax.net.ssl.SSLSocketFactory;
import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class Authorization {
    private static String host;
    private static int port;
    private static String username;
    private static String password;
    private static String moodleSession;
    private static String logintoken;

    public static void run(SSLSocketFactory factory) {
        host = "195.38.164.139";
        port = 443;
        username = "makkambaevdastan";
        password = "1234%^&*Das";

        System.out.println("==============================BEGIN GET " + host + "/login/index.php==============================");
        loginGET(factory);
        System.out.println("==============================END GET " + host + "/login/index.php==============================\n");

        System.out.println("==============================BEGIN POST " + host + "/login/index.php==============================");
        loginPOST(factory);
        System.out.println("==============================END POST " + host + "/login/index.php==============================\n");

        System.out.println("==============================BEGIN GET " + host + "/login/index.php?testsession=118==============================");
        loginRedirect1GET(factory);
        System.out.println("==============================END GET " + host + "/login/index.php?testsession=118==============================\n");

        System.out.println("==============================BEGIN GET " + host + "/my/==============================");
        loginRedirect2GET(factory);
        System.out.println("==============================END GET " + host + "/my/==============================\n");
    }

    private static void loginGET(SSLSocketFactory factory) {
        SSLSocket sslsocket = null;
        BufferedReader bufferedReader = null;
        OutputStream outputStream = null;
        OutputStream outStreamIndex = null;
        OutputStream outStreamHTTP = null;
        try {
            sslsocket = (SSLSocket) factory.createSocket(host, port);
            bufferedReader = new BufferedReader(new InputStreamReader(sslsocket.getInputStream(), StandardCharsets.UTF_8));
            outputStream = sslsocket.getOutputStream();
            String request = "GET" + " " + "/login/index.php" + " HTTP/1.1" + "\r\n" +
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
                if (line.contains("logintoken")) {
                    logintoken = line.substring(line.indexOf("value=\"") + 7, line.lastIndexOf("\""));
                }
            }
            http.append("==============================RESPONSE END==============================");

            outStreamIndex = new FileOutputStream("result/2_login_index_get.html");
            outStreamIndex.write(result.toString().getBytes(StandardCharsets.UTF_8));

            outStreamHTTP = new FileOutputStream("result/2_login_index_get.http");
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

    private static void loginPOST(SSLSocketFactory factory) {
        SSLSocket sslsocket = null;
        BufferedReader bufferedReader = null;
        OutputStream outputStream = null;
        OutputStream outStreamIndex = null;
        OutputStream outStreamHTTP = null;
        try {
            sslsocket = (SSLSocket) factory.createSocket(host, port);
            bufferedReader = new BufferedReader(new InputStreamReader(sslsocket.getInputStream(), StandardCharsets.UTF_8));
            outputStream = sslsocket.getOutputStream();

            String path = "/login/index.php";
            StringBuilder body = new StringBuilder();
            body.append(URLEncoder.encode("logintoken", StandardCharsets.UTF_8)).append('=');
            body.append(URLEncoder.encode(logintoken, StandardCharsets.UTF_8)).append("&");

            body.append(URLEncoder.encode("username", StandardCharsets.UTF_8)).append('=');
            body.append(URLEncoder.encode(username, StandardCharsets.UTF_8)).append("&");

            body.append(URLEncoder.encode("password", StandardCharsets.UTF_8)).append('=');
            body.append(URLEncoder.encode(password, StandardCharsets.UTF_8)).append("&");

            body.append(URLEncoder.encode("anchor", StandardCharsets.UTF_8)).append('=');
            body.append(URLEncoder.encode("", StandardCharsets.UTF_8));

            String request = "POST" + " " + path + " HTTP/1.1" + "\r\n" +
                    "Host: " + host + "\r\n" +
                    "Origin: " + "https://" + host + "\r\n" +
                    "Referer: " + "https://" + host + path + "\r\n" +
                    "User-Agent: JDK 17" + "\r\n" +
                    "Content-Type: application/x-www-form-urlencoded" + "\r\n" +
                    "Content-Length: " + body.length() + "\r\n" +
                    "Connection: keep-alive" + "\r\n" +
                    "Cookie: MoodleSession=" + moodleSession + "\r\n" +
                    "Accept: text/html" + "\r\n" +
                    "\r\n" +
                    body;

            outputStream.write(request.getBytes(StandardCharsets.UTF_8));
            outputStream.flush();

            String line;
            boolean flag = false;
            StringBuilder result = new StringBuilder();
            StringBuilder http = new StringBuilder();
            http.append("==============================REQUEST BEGIN==============================");
            http.append("\n").append(request).append("\n");
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
                if (line.contains("Set-Cookie: MoodleSession=")) {
                    int start = line.indexOf("MoodleSession") + 14;
                    int end = line.indexOf(";", start);
                    moodleSession = line.substring(start, end);
                }
            }
            http.append("==============================RESPONSE END==============================");

            outStreamIndex = new FileOutputStream("result/3_login_index_post.html");
            outStreamIndex.write(result.toString().getBytes(StandardCharsets.UTF_8));

            outStreamHTTP = new FileOutputStream("result/3_login_index_post.http");
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

    private static void loginRedirect1GET(SSLSocketFactory factory) {
        SSLSocket sslsocket = null;
        BufferedReader bufferedReader = null;
        OutputStream outputStream = null;
        OutputStream outStreamIndex = null;
        OutputStream outStreamHTTP = null;
        try {
            sslsocket = (SSLSocket) factory.createSocket(host, port);
            bufferedReader = new BufferedReader(new InputStreamReader(sslsocket.getInputStream(), StandardCharsets.UTF_8));
            outputStream = sslsocket.getOutputStream();

            String path = "/login/index.php";
            String variable = "?testsession=118";
            String request = "GET" + " " + path + variable + " HTTP/1.1" + "\r\n" +
                    "Host: " + host + "\r\n" +
                    "Referer: " + "https://" + host + path + "\r\n" +
                    "User-Agent: JDK 17" + "\r\n" +
                    "Connection: keep-alive" + "\r\n" +
                    "Cookie: MoodleSession=" + moodleSession + "\r\n" +
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
            }
            http.append("==============================RESPONSE END==============================");

            outStreamIndex = new FileOutputStream("result/4_login_index_get_red1.html");
            outStreamIndex.write(result.toString().getBytes(StandardCharsets.UTF_8));
            outStreamIndex.close();

            outStreamHTTP = new FileOutputStream("result/4_login_index_get_red1.http");
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

    private static void loginRedirect2GET(SSLSocketFactory factory) {
        SSLSocket sslsocket = null;
        BufferedReader bufferedReader = null;
        OutputStream outputStream = null;
        OutputStream outStreamIndex = null;
        OutputStream outStreamHTTP = null;
        try {
            sslsocket = (SSLSocket) factory.createSocket(host, port);
            bufferedReader = new BufferedReader(new InputStreamReader(sslsocket.getInputStream(), StandardCharsets.UTF_8));
            outputStream = sslsocket.getOutputStream();

            String path = "/my/";
            String request = "GET" + " " + path + " HTTP/1.1" + "\r\n" +
                    "Host: " + host + "\r\n" +
                    "Referer: " + "https://" + host + path + "\r\n" +
                    "User-Agent: JDK 17" + "\r\n" +
                    "Connection: keep-alive" + "\r\n" +
                    "Cookie: MoodleSession=" + moodleSession + "\r\n" +
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
            }
            http.append("==============================RESPONSE END==============================");

            outStreamIndex = new FileOutputStream("result/5_login_index_get_red2My.html");
            outStreamIndex.write(result.toString().getBytes(StandardCharsets.UTF_8));
            outStreamIndex.close();

            outStreamHTTP = new FileOutputStream("result/5_login_index_get_red2My.http");
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

