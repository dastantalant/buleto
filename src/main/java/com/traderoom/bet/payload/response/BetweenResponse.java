package com.traderoom.bet.payload.response;

import com.jsoniter.output.JsonStream;
import com.jsoniter.spi.Encoder;
import com.jsoniter.spi.JsoniterSpi;
import java.io.IOException;

public record BetweenResponse(
        long from,
        long to,
        String data
) {
    static {
        JsoniterSpi.registerTypeEncoder(BetweenResponse.class, new Encoder() {
            public void encode(Object obj, JsonStream stream) throws IOException {
                BetweenResponse b = (BetweenResponse) obj;
                stream.writeObjectStart();
                stream.writeObjectField("from");
                stream.writeVal(b.from);
                stream.writeMore();
                stream.writeObjectField("to");
                stream.writeVal(b.to);
                stream.writeMore();
                stream.writeObjectField("data");
                stream.writeRaw(b.data);
                stream.writeObjectEnd();
            }
        });
    }
}
