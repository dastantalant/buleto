import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.InetAddress;
import java.security.KeyStore;
import java.security.SecureRandom;

import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLParameters;
import javax.net.ssl.SSLSocket;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManagerFactory;

class TLSClient {
    public static String request(InetAddress serverHost, int serverPort,
            String tlsVersion, String trustStoreName, char[] trustStorePassword,
            String keyStoreName, char[] keyStorePassword) throws Exception {

        KeyStore trustStore = KeyStore.getInstance(KeyStore.getDefaultType());
        InputStream trustStoreStream = TLSClient.class.getResourceAsStream("/" + trustStoreName);
        trustStore.load(trustStoreStream, trustStorePassword);
        trustStoreStream.close();
        TrustManagerFactory trustManagerFactory = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
        trustManagerFactory.init(trustStore);

        KeyStore keyStore = KeyStore.getInstance(KeyStore.getDefaultType());
        InputStream keyStoreStream = TLSClient.class.getResourceAsStream("/" + keyStoreName);
        keyStore.load(keyStoreStream, keyStorePassword);
        KeyManagerFactory keyManagerFactory = KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm());
        keyManagerFactory.init(keyStore, keyStorePassword);
        SSLContext sslcontext = SSLContext.getInstance("TLS");
        sslcontext.init(keyManagerFactory.getKeyManagers(), trustManagerFactory.getTrustManagers(), SecureRandom.getInstanceStrong());

        SSLSocketFactory factory = sslcontext.getSocketFactory();
        SSLSocket sslsocket = (SSLSocket) factory.createSocket(serverHost, serverPort);
        sslsocket.setEnabledProtocols(new String[] { tlsVersion });
        SSLParameters sslParams = new SSLParameters();
        sslParams.setEndpointIdentificationAlgorithm("HTTPS");
        sslsocket.setSSLParameters(sslParams);

        BufferedReader input = new BufferedReader(new InputStreamReader(sslsocket.getInputStream()));
        return input.readLine();

    }
}
