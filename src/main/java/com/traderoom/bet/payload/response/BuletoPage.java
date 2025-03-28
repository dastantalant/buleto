package com.traderoom.bet.payload.response;

import com.jsoniter.output.JsonStream;
import com.jsoniter.spi.Encoder;
import com.jsoniter.spi.JsoniterSpi;
import java.io.IOException;

public record BuletoPage(
    int page,
    int size,
    String data
) {
    static {
        JsoniterSpi.registerTypeEncoder(BuletoPage.class, new Encoder() {
            public void encode(Object obj, JsonStream stream) throws IOException {
                BuletoPage b = (BuletoPage) obj;
                stream.writeObjectStart();
                stream.writeObjectField("page");
                stream.writeVal(b.page);
                stream.writeMore();
                stream.writeObjectField("size");
                stream.writeVal(b.size);
                stream.writeMore();
                stream.writeObjectField("data");
                stream.writeRaw(b.data);
                stream.writeObjectEnd();
            }
        });
    }
}
