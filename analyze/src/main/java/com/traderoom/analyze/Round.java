package com.traderoom.analyze;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;

@Getter
@RequiredArgsConstructor
@Builder
@ToString
public class Round implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private final long id;
    private final long unix;
    private final Instant datetime;
    private final int cell;
}
