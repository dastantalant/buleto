package com.traderoom.api.payload.response;

import com.jsoniter.output.JsonStream;
import com.jsoniter.spi.Encoder;
import com.jsoniter.spi.JsoniterSpi;
import java.io.IOException;

public record PageResponse(
    int page,
    int size,
    String data
) {
    static {
        JsoniterSpi.registerTypeEncoder(PageResponse.class, new Encoder() {
            public void encode(Object obj, JsonStream stream) throws IOException {
                PageResponse b = (PageResponse) obj;
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
