import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.UnknownHostException;
import java.security.SecureRandom;
import java.security.cert.X509Certificate;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocket;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

public class Main1 {
    public static void main(String[] args) throws UnknownHostException, Exception {
        TrustManager[] trustAllCerts = { new X509TrustManager() {
            public X509Certificate[] getAcceptedIssuers() {
                return null;
            }

            public void checkClientTrusted(X509Certificate[] certs, String authType) {
            }

            public void checkServerTrusted(X509Certificate[] certs, String authType) {
            }
        }
        };
        String request = "GET" + " " + "/" + " HTTP/1.1" + "\r\n" +
                "Host: " + "195.38.164.139" + "\r\n" +
                "Origin: " + "https://" + "195.38.164.139" + "\r\n" +
                "User-Agent: JDK 17" + "\r\n" +
                "Connection: keep-alive" + "\r\n" +
                "Accept: text/html" + "\r\n" +
                "\r\n";
        SSLContext sc = SSLContext.getInstance("SSL");
        sc.init(null, trustAllCerts, new SecureRandom());
        SSLSocketFactory factory = (SSLSocketFactory) sc.getSocketFactory();

        // SSLSocketFactory factory = (SSLSocketFactory)
        SSLSocketFactory.getDefault();
        SSLSocket ss = (SSLSocket) factory.createSocket("195.38.164.139", 443);

        // BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedReader in = new BufferedReader(new InputStreamReader(ss.getInputStream()));
        PrintWriter out = new PrintWriter(ss.getOutputStream(), true);
        out.write(request);
        out.flush();

        String line = null;
        while ((line = in.readLine()) != null) {
            System.out.println(line);
            // out.println(line);
            // System.out.println("sent    --> " + line);
            // System.out.println("received<-- " + in.readLine());
        }
    }
}