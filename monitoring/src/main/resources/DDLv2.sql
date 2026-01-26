CREATE TABLE IF NOT EXISTS round
(
    id           BIGINT PRIMARY KEY,   --  json "id"
    cell         INT         NOT NULL, --  json "c"
    factor       INT         NOT NULL, --  json "v" (x100000)
    start_time   TIMESTAMPTZ NOT NULL, --  json "sd"
    victory_time TIMESTAMPTZ NOT NULL  --  json "dt"
);

CREATE INDEX idx_victory_time ON round (victory_time);
