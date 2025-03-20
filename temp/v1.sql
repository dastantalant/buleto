ALTER DATABASE buleto SET TIMEZONE TO 'Europe/London';
-- Удаление таблиц (обратный порядок создания)
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

CREATE TABLE role
(
    role_id bigserial   NOT NULL PRIMARY KEY,
    "name"  varchar(50) NOT NULL
);

-- 1. users (нет зависимостей)
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

-- 2. player (зависит от users через owner)
CREATE TABLE player
(
    player_id bigserial    NOT NULL PRIMARY KEY,
    email     varchar(255) NOT NULL UNIQUE,
    password  varchar(255) NOT NULL,
    owner     varchar(255) NOT NULL REFERENCES users (email)
);

-- 3. wave (нет зависимостей)
CREATE TABLE wave
(
    wave_id bigserial     NOT NULL PRIMARY KEY,
    value   numeric(6, 5) NOT NULL UNIQUE
);

-- 4. balance (зависит от player)
CREATE TABLE balance
(
    player_id int8           NOT NULL PRIMARY KEY REFERENCES player (player_id),
    amount    int8 DEFAULT 0 NOT NULL
);

-- 5. balance_snapshot (зависит от balance)
CREATE TABLE balance_snapshot
(
    balance_snapshot_id bigserial   NOT NULL PRIMARY KEY,
    datetime            timestamptz NOT NULL,
    player_id           int8        NOT NULL REFERENCES balance (player_id)
);
CREATE INDEX idx_balance_snapshot_datetime ON balance_snapshot USING btree (datetime);

-- 6. bet (зависит от users)
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

-- 7. bet_cell (зависит от bet)
CREATE TABLE bet_cell
(
    bet_id      int8 NOT NULL REFERENCES bet (bet_id),
    cell_number int2 NOT NULL,
    amount      int2 NOT NULL,
    CONSTRAINT bet_cell_pkey PRIMARY KEY (bet_id, cell_number, amount)
);

-- 8. cell (зависит от wave)
CREATE TABLE cell
(
    cell_id     bigserial NOT NULL PRIMARY KEY,
    wave_id     int8      NOT NULL REFERENCES wave (wave_id),
    cell_number int2      NOT NULL,
    CONSTRAINT cell_wave_id_cell_number_key UNIQUE (wave_id, cell_number)
);
CREATE INDEX idx_cell_wave_id ON cell USING btree (wave_id);

-- 9. timeline (зависит от wave)
CREATE TABLE timeline
(
    timeline_id int8        NOT NULL PRIMARY KEY,
    line        timestamptz NOT NULL,
    wave_id     int8        NOT NULL REFERENCES wave (wave_id),
    is_bullet   bool        NULL,
    is_start    bool        NULL
);
CREATE INDEX idx_timeline_is_bullet ON timeline USING btree (is_bullet);
CREATE INDEX idx_timeline_is_start ON timeline USING btree (is_start);

-- 10. algorithm_step (зависит от bet)
CREATE TABLE algorithm_step
(
    algorithm_step_id bigserial          NOT NULL PRIMARY KEY,
    run               bool DEFAULT false NOT NULL,
    bet_id            int8               NOT NULL REFERENCES bet (bet_id)
);

-- 11. betting (зависит от bet, timeline, player)
CREATE TABLE betting
(
    bet_id    int8 NOT NULL REFERENCES bet (bet_id),
    round_id  int8 NOT NULL REFERENCES timeline (timeline_id),
    player_id int8 NOT NULL REFERENCES player (player_id),
    CONSTRAINT betting_pkey PRIMARY KEY (bet_id, round_id, player_id)
);

-- 12. round (зависит от timeline, cell)
CREATE TABLE round
(
    round_id int8 NOT NULL REFERENCES timeline (timeline_id),
    cell_id  int8 NOT NULL REFERENCES cell (cell_id)
);

-- 13. algorithm (зависит от algorithm_step, bet)
CREATE TABLE algorithm
(
    algorithm_id bigserial NOT NULL PRIMARY KEY,
    minimum      int8      NOT NULL,
    subtract     int8      NULL,
    loss         int8      NULL REFERENCES algorithm_step (algorithm_step_id),
    win          int8      NULL REFERENCES algorithm_step (algorithm_step_id),
    bet_id       int8      NOT NULL REFERENCES bet (bet_id)
);

CREATE OR REPLACE FUNCTION insert_timeline(p_unix int8, p_value numeric)
    RETURNS bigint AS
$$
DECLARE
    _wave_id     bigint;
    _timeline_id bigint;
BEGIN
    SELECT wave_id
    INTO _wave_id
    FROM wave
    WHERE value = p_value;

    IF NOT FOUND THEN
        INSERT INTO wave (value)
        VALUES (p_value)
        RETURNING wave_id INTO _wave_id;
    END IF;

    INSERT INTO timeline (timeline_id, line, wave_id)
    VALUES (p_unix, to_timestamp(p_unix / 1000), _wave_id)
    RETURNING timeline_id INTO _timeline_id;

    RETURN _timeline_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_timeline_with_bullet(p_unix int8, p_value numeric)
    RETURNS bigint AS
$$
DECLARE
    _wave_id     bigint;
    _timeline_id bigint;
BEGIN
    SELECT wave_id
    INTO _wave_id
    FROM wave
    WHERE value = p_value;

    IF NOT FOUND THEN
        INSERT INTO wave (value)
        VALUES (p_value)
        RETURNING wave_id INTO _wave_id;
    END IF;

    INSERT INTO timeline (timeline_id, line, wave_id, is_bullet)
    VALUES (p_unix, to_timestamp(p_unix / 1000), _wave_id, true)
    RETURNING timeline_id INTO _timeline_id;

    RETURN _timeline_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_timeline_with_round(p_unix int8, p_value numeric)
    RETURNS bigint AS
$$
DECLARE
    _wave_id     bigint;
    _timeline_id bigint;
BEGIN
    SELECT wave_id
    INTO _wave_id
    FROM wave
    WHERE value = p_value;

    IF NOT FOUND THEN
        INSERT INTO wave (value)
        VALUES (p_value)
        RETURNING wave_id INTO _wave_id;
    END IF;

    INSERT INTO timeline (timeline_id, line, wave_id, is_start)
    VALUES (p_unix, to_timestamp(p_unix / 1000), _wave_id, true)
    RETURNING timeline_id INTO _timeline_id;

    RETURN _timeline_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_cell(p_value numeric, p_cell_number int2, p_timeline_id int8)
    RETURNS bigint AS
$$
DECLARE
    _wave_id bigint;
    _cell_id bigint;
BEGIN
    SELECT wave_id
    INTO _wave_id
    FROM wave
    WHERE value = p_value;

    IF NOT FOUND THEN
        INSERT INTO wave (value)
        VALUES (p_value)
        RETURNING wave_id INTO _wave_id;
    END IF;

    SELECT cell_id
    INTO _cell_id
    FROM cell
    WHERE wave_id = _wave_id
      AND cell_number = p_cell_number;

    IF NOT FOUND THEN
        INSERT INTO cell (wave_id, cell_number)
        VALUES (_wave_id, p_cell_number)
        RETURNING cell_id INTO _cell_id;
    END IF;

    INSERT INTO round (round_id, cell_id)
    VALUES (p_timeline_id, _cell_id);

    RETURN _cell_id;
END;
$$ LANGUAGE plpgsql;

-- Заполнение таблицы значениями от 5.00001 до 5.99999
INSERT INTO wave (value)
SELECT 5 + (n * 0.00001)::numeric(6, 5)
FROM generate_series(1, 99999) AS n;

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


