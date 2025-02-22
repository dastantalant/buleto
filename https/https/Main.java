

import java.io.File;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;

public class Main {

    public static void main(String[] args) {
        File result = new File("./result");
        if (!result.exists()) {
            result.mkdir();
        }
        try {

            TrustManager[] trustAllCerts = {new X509TrustManagerImpl()};

            SSLContext sslContext = SSLContext.getInstance("SSL");
            sslContext.init(null, trustAllCerts, new SecureRandom());
            SSLSocketFactory factory = sslContext.getSocketFactory();

            Registration.run(factory);
            Authorization.run(factory);

        } catch (NoSuchAlgorithmException nsae) {
            System.out.println(nsae);
        } catch (KeyManagementException kme) {
            System.out.println(kme);
        }

    }
}
