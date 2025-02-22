import java.io.ByteArrayInputStream;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.Certificate;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;

import javax.net.ssl.TrustManager;
import javax.net.ssl.TrustManagerFactory;
import javax.net.ssl.X509TrustManager;

public class CertificateManager {

    private String keyStoreLocation;
    private String keyStorePassword;
    private X509TrustManager myTrustManager;
    private static KeyStore myTrustStore;

    public CertificateManager(String keyStoreLocation, String keyStorePassword) throws Exception {
        this.keyStoreLocation = keyStoreLocation;
        this.keyStorePassword = keyStorePassword;
        myTrustStore = createKeyStore(keyStoreLocation, keyStorePassword);
    }

    public void addCustomCertificate(String certFileName, String certificateAlias)
            throws Exception {
        TrustManagerFactory tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
        tmf.init((KeyStore) null);
        Certificate certificate = myTrustStore.getCertificate(certificateAlias);
        if (certificate == null) {
            addCertificate(certFileName, certificateAlias);
        } else {
        }
        tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
        tmf.init(myTrustStore);
        for (TrustManager tm : tmf.getTrustManagers()) {
            if (tm instanceof X509TrustManager) {
                setMytrustManager((X509TrustManager) tm);
                break;
            }
        }
    }

    private InputStream fullStream(String fname) throws IOException {
        ClassLoader classLoader = getClass().getClassLoader();
        InputStream resource = classLoader.getResourceAsStream(fname);
        try {
            if (resource != null) {
                DataInputStream dis = new DataInputStream(resource);
                byte[] bytes = new byte[dis.available()];
                dis.readFully(bytes);
                return new ByteArrayInputStream(bytes);
            } else {
            }
        } catch (Exception e) {
        }
        return null;
    }

    public static KeyStore createKeyStore(String keystore, String pass) throws Exception {
        try {
            InputStream in = CertificateManager.class.getClass().getResourceAsStream(keystore);
            KeyStore keyStore = KeyStore.getInstance(KeyStore.getDefaultType());
            keyStore.load(in, pass.toCharArray());
            return keyStore;
        } catch (Exception e) {
        }

        File file = new File(keystore);
        KeyStore keyStore = KeyStore.getInstance("JKS");
        if (file.exists()) {
            keyStore.load(new FileInputStream(file), pass.toCharArray());
        } else {
            keyStore.load(null, null);
            keyStore.store(new FileOutputStream(file), pass.toCharArray());
        }
        return keyStore;
    }

    private void addCertificate(String certFileName, String certificateAlias) throws CertificateException,
            IOException, KeyStoreException, NoSuchAlgorithmException {
        CertificateFactory cf = CertificateFactory.getInstance("X.509");
        InputStream certStream = fullStream(certFileName);
        Certificate certs = cf.generateCertificate(certStream);
        myTrustStore.setCertificateEntry(certificateAlias, certs);
        FileOutputStream out = new FileOutputStream(getKeyStoreLocation());
        myTrustStore.store(out, getKeyStorePassword().toCharArray());
        out.close();
    }

    public String getKeyStoreLocation() {
        return keyStoreLocation;
    }

    public String getKeyStorePassword() {
        return keyStorePassword;
    }
    public X509TrustManager getMytrustManager() {
        return myTrustManager;
    }
    public void setMytrustManager(X509TrustManager myTrustManager) {
        this.myTrustManager = myTrustManager;
    }
}