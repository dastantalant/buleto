ALTER DATABASE buleto SET TIMEZONE TO 'Europe/London';

DROP TABLE IF EXISTS algorithm CASCADE;
DROP TABLE IF EXISTS round CASCADE;
DROP TABLE IF EXISTS betting CASCADE;
DROP TABLE IF EXISTS algorithm_step CASCADE;
DROP TABLE IF EXISTS timeline CASCADE;
DROP TABLE IF EXISTS cell CASCADE;
DROP TABLE IF EXISTS bet_cell CASCADE;
DROP TABLE IF EXISTS bet CASCADE;
DROP TABLE IF EXISTS balance_snapshot CASCADE;
DROP TABLE IF EXISTS balance CASCADE;
DROP TABLE IF EXISTS wave CASCADE;
DROP TABLE IF EXISTS player CASCADE;
DROP TABLE IF EXISTS user_role CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS role CASCADE;
DROP TABLE IF EXISTS round_cell CASCADE;

CREATE TABLE role
(
    role_id bigserial   NOT NULL PRIMARY KEY,
    "name"  varchar(50) NOT NULL
);

CREATE TABLE users
(
    email    varchar(255)       NOT NULL PRIMARY KEY UNIQUE,
    password varchar(500)       NOT NULL,
    enabled  bool DEFAULT false NOT NULL
);

CREATE TABLE user_role
(
    user_id varchar(255) NOT NULL REFERENCES users (email),
    role_id int8         NOT NULL REFERENCES role (role_id)
);

CREATE TABLE player
(
    player_id bigserial    NOT NULL PRIMARY KEY,
    email     varchar(255) NOT NULL UNIQUE,
    password  varchar(255) NOT NULL,
    owner     varchar(255) NOT NULL REFERENCES users (email)
);

CREATE TABLE balance
(
    player_id int8           NOT NULL PRIMARY KEY REFERENCES player (player_id),
    amount    int8 DEFAULT 0 NOT NULL
);

CREATE TABLE balance_snapshot
(
    balance_snapshot_id bigserial   NOT NULL PRIMARY KEY,
    datetime            timestamptz NOT NULL,
    player_id           int8        NOT NULL REFERENCES balance (player_id)
);
CREATE INDEX idx_balance_snapshot_datetime ON balance_snapshot USING btree (datetime);

CREATE TABLE bet
(
    bet_id      bigserial         NOT NULL PRIMARY KEY,
    "name"      varchar(50)       NULL,
    description varchar(500)      NULL,
    email       varchar(255)      NOT NULL REFERENCES users (email),
    enabled     bool DEFAULT true NOT NULL,
    created_at  date              NOT NULL
);
CREATE INDEX idx_bet_email ON bet USING btree (email);

CREATE TABLE bet_cell
(
    bet_id      int8 NOT NULL REFERENCES bet (bet_id),
    cell_number int2 NOT NULL,
    amount      int2 NOT NULL,
    CONSTRAINT bet_cell_pkey PRIMARY KEY (bet_id, cell_number, amount)
);

CREATE TABLE wave
(
    wave_id int8          NOT NULL PRIMARY KEY,
    value   numeric(6, 5) NOT NULL UNIQUE
);

CREATE TABLE cell
(
    cell_id        int8 NOT NULL PRIMARY KEY,
    begin_wave_id  int8 NOT NULL REFERENCES wave (wave_id),
    target_wave_id int8 NOT NULL REFERENCES wave (wave_id),
    cell_number    int2 NOT NULL CHECK (cell_number >= 0 AND cell_number <= 37),
    CONSTRAINT cell_wave_id_cell_number_key UNIQUE (begin_wave_id, target_wave_id, cell_number)
);

CREATE TABLE timeline
(
    timeline_id int8        NOT NULL PRIMARY KEY,
    line        timestamptz NOT NULL,
    wave_id     int8        NOT NULL REFERENCES wave (wave_id)
);

CREATE TABLE round
(
    round_id            int8 NOT NULL PRIMARY KEY,
    start_datetime      int8 NOT NULL,
    end_datetime        int8 NOT NULL,
    bet_close_datetime  int8 NOT NULL,
    bet_target_datetime int8 NOT NULL,
    begin_wave_id       int8 NOT NULL REFERENCES wave (wave_id),
    target_wave_id      int8 NOT NULL REFERENCES wave (wave_id),
    start_wave_id       int8 NOT NULL REFERENCES wave (wave_id),
    victory_datetime    int8 NOT NULL,
    victory_wave_id     int8 NOT NULL REFERENCES wave (wave_id),
    victory_cell_number int2 NOT NULL CHECK (victory_cell_number >= 0 AND victory_cell_number <= 37)
);
CREATE INDEX idx_round_start_datetime ON round USING btree (start_datetime);
CREATE INDEX idx_round_end_datetime ON round USING btree (end_datetime);
CREATE INDEX idx_round_victory_datetime ON round USING btree (victory_datetime);

CREATE TABLE round_cell
(
    round_id int8 NOT NULL REFERENCES round (round_id),
    cell_id  int8 NOT NULL REFERENCES cell (cell_id),
    PRIMARY KEY (round_id, cell_id)
);

CREATE TABLE algorithm_step
(
    algorithm_step_id bigserial          NOT NULL PRIMARY KEY,
    run               bool DEFAULT false NOT NULL,
    bet_id            int8               NOT NULL REFERENCES bet (bet_id)
);

CREATE TABLE betting
(
    bet_id    int8 NOT NULL REFERENCES bet (bet_id),
    round_id  int8 NOT NULL REFERENCES round (round_id),
    player_id int8 NOT NULL REFERENCES player (player_id),
    CONSTRAINT betting_pkey PRIMARY KEY (bet_id, round_id, player_id)
);

CREATE TABLE algorithm
(
    algorithm_id bigserial NOT NULL PRIMARY KEY,
    minimum      int8      NOT NULL,
    subtract     int8      NULL,
    loss         int8      NULL REFERENCES algorithm_step (algorithm_step_id),
    win          int8      NULL REFERENCES algorithm_step (algorithm_step_id),
    bet_id       int8      NOT NULL REFERENCES bet (bet_id)
);

CREATE OR REPLACE FUNCTION generate_cell_id()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.cell_id := NEW.begin_wave_id * 100000000 + NEW.target_wave_id * 100 + NEW.cell_number;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_cell_id
    BEFORE INSERT ON cell
    FOR EACH ROW
EXECUTE FUNCTION generate_cell_id();

CREATE OR REPLACE FUNCTION generate_wave_id()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.wave_id := CAST(REPLACE(CAST(NEW.value AS TEXT), '.', '') AS BIGINT);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_wave_id
    BEFORE INSERT
    ON wave
    FOR EACH ROW
EXECUTE FUNCTION generate_wave_id();

CREATE OR REPLACE FUNCTION insert_timeline(p_unix int8, p_value numeric)
    RETURNS bigint AS
$$
DECLARE
    _wave_id bigint;
BEGIN
    _wave_id := insert_wave(p_value);

    PERFORM 1
    FROM timeline
    WHERE timeline_id = p_unix;

    IF NOT FOUND THEN
        INSERT INTO timeline (timeline_id, line, wave_id)
        VALUES (p_unix, to_timestamp(p_unix / 1000), _wave_id);
    END IF;

    RETURN p_unix;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_wave(p_value numeric)
    RETURNS bigint AS
$$
DECLARE
    _wave_id bigint;
BEGIN
    _wave_id := CAST(REPLACE(CAST(p_value AS TEXT), '.', '') AS BIGINT);

    PERFORM 1
    FROM wave
    WHERE wave_id = _wave_id;

    IF NOT FOUND THEN
        INSERT INTO wave (value)
        VALUES (p_value)
        ON CONFLICT (value) DO NOTHING;
    END IF;
    RETURN _wave_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_cell(p_begin numeric, p_target numeric, p_cell_number int2)
    RETURNS bigint AS
$$
DECLARE
    _begin_wave_id  bigint;
    _target_wave_id bigint;
    _cell_id        bigint;
BEGIN
    _begin_wave_id := insert_wave(p_begin);
    _target_wave_id := insert_wave(p_target);

    SELECT cell_id
    INTO _cell_id
    FROM cell
    WHERE begin_wave_id = _begin_wave_id
      AND target_wave_id = _target_wave_id
      AND cell_number = p_cell_number;

    IF NOT FOUND THEN
        INSERT INTO cell (begin_wave_id, target_wave_id, cell_number)
        VALUES (_begin_wave_id, _target_wave_id, p_cell_number)
        RETURNING cell_id INTO _cell_id;
    END IF;

    RETURN _cell_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_round(
    p_round_id int8,
    p_start_datetime int8,
    p_end_datetime int8,
    p_bet_close_datetime int8,
    p_bet_target_datetime int8,
    p_begin_value numeric,
    p_target_value numeric,
    p_start_value numeric,
    p_victory_datetime int8,
    p_victory_value numeric,
    p_victory_cell_number int2
)
    RETURNS bigint AS
$$
DECLARE
    _begin_wave_id   bigint;
    _target_wave_id  bigint;
    _start_wave_id   bigint;
    _victory_wave_id bigint;
    _victory_cell_id bigint;
BEGIN
    _begin_wave_id := insert_wave(p_begin_value);
    _target_wave_id := insert_wave(p_target_value);
    _start_wave_id := insert_wave(p_start_value);
    _victory_wave_id := insert_wave(p_victory_value);

    INSERT INTO round (round_id,
                       start_datetime,
                       end_datetime,
                       bet_close_datetime,
                       bet_target_datetime,
                       begin_wave_id,
                       target_wave_id,
                       start_wave_id,
                       victory_datetime,
                       victory_wave_id,
                       victory_cell_number)
    VALUES (p_round_id,
            p_start_datetime,
            p_end_datetime,
            p_bet_close_datetime,
            p_bet_target_datetime,
            _begin_wave_id,
            _target_wave_id,
            _start_wave_id,
            p_victory_datetime,
            _victory_wave_id,
            p_victory_cell_number)
    ON CONFLICT (round_id) DO NOTHING;

    RETURN _victory_cell_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_round_cell(p_begin numeric, p_target numeric, p_cell_number int2, p_round_id int8)
    RETURNS bigint AS
$$
DECLARE
    _cell_id bigint;
BEGIN
    _cell_id := insert_cell(p_begin, p_target, p_cell_number);

    INSERT INTO round_cell (round_id, cell_id)
    VALUES (p_round_id, _cell_id)
    ON CONFLICT DO NOTHING;

    RETURN _cell_id;
END;
$$ LANGUAGE plpgsql;

INSERT INTO wave (value)
SELECT 5 + (n * 0.00001)::numeric(6, 5)
FROM generate_series(15000, 45000) AS n;
INSERT INTO role ("name")
VALUES ('ROOT'),
       ('ADMIN'),
       ('USER'),
       ('GUEST');
INSERT INTO users (email, password, enabled)
VALUES ('root', '$2y$12$L2S3Lugy15PDLwQ5RNfEf.ivT1om32t4Nmb3nb1p8QeNUKLjaF6g6', true), --das
       ('admin', '$2y$12$L2S3Lugy15PDLwQ5RNfEf.ivT1om32t4Nmb3nb1p8QeNUKLjaF6g6', true),
       ('user', '$2y$12$L2S3Lugy15PDLwQ5RNfEf.ivT1om32t4Nmb3nb1p8QeNUKLjaF6g6', true),
       ('guest', '$2y$12$L2S3Lugy15PDLwQ5RNfEf.ivT1om32t4Nmb3nb1p8QeNUKLjaF6g6', true);
INSERT INTO user_role (user_id, role_id)
VALUES ('root', 1),
       ('admin', 2),
       ('user', 3),
       ('guest', 4);
