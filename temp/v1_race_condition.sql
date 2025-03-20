-- -- Удаление таблиц (без изменений)
-- DROP TABLE IF EXISTS algorithm CASCADE;
-- DROP TABLE IF EXISTS round CASCADE;
-- DROP TABLE IF EXISTS betting CASCADE;
-- DROP TABLE IF EXISTS algorithm_step CASCADE;
-- DROP TABLE IF EXISTS timeline CASCADE;
-- DROP TABLE IF EXISTS cell CASCADE;
-- DROP TABLE IF EXISTS bet_cell CASCADE;
-- DROP TABLE IF EXISTS bet CASCADE;
-- DROP TABLE IF EXISTS balance_snapshot CASCADE;
-- DROP TABLE IF EXISTS balance CASCADE;
-- DROP TABLE IF EXISTS wave CASCADE;
-- DROP TABLE IF EXISTS player CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;
--
-- -- Создание таблиц (с исправлениями)
-- CREATE TABLE users
-- (
--     email    varchar(255)       NOT NULL PRIMARY KEY UNIQUE,
--     password varchar(500)       NOT NULL,
--     enabled  bool DEFAULT false NOT NULL
-- );
--
-- CREATE TABLE player
-- (
--     player_id bigserial    NOT NULL PRIMARY KEY,
--     email     varchar(255) NOT NULL UNIQUE,
--     password  varchar(255) NOT NULL,
--     owner     varchar(255) NOT NULL REFERENCES users (email)
-- );
--
-- CREATE TABLE wave
-- (
--     wave_id bigserial     NOT NULL PRIMARY KEY,
--     value   numeric(6, 5) NOT NULL UNIQUE
-- );
--
-- INSERT INTO wave (value)
-- SELECT 5 + (n * 0.00001)::numeric(6, 5)
-- FROM generate_series(0, 99999) AS n;
--
-- CREATE TABLE balance
-- (
--     player_id int8           NOT NULL PRIMARY KEY REFERENCES player (player_id),
--     amount    int8 DEFAULT 0 NOT NULL
-- );
--
-- CREATE TABLE balance_snapshot
-- (
--     balance_snapshot_id bigserial    NOT NULL PRIMARY KEY,
--     datetime            timestamp(0) NOT NULL,
--     player_id           int8         NOT NULL REFERENCES balance (player_id)
-- );
-- CREATE INDEX idx_balance_snapshot_datetime ON balance_snapshot USING btree (datetime);
--
-- CREATE TABLE bet
-- (
--     bet_id      bigserial         NOT NULL PRIMARY KEY,
--     "name"      varchar(50)       NULL,
--     description varchar(500)      NULL,
--     email       varchar(255)      NOT NULL REFERENCES users (email),
--     enabled     bool DEFAULT true NOT NULL,
--     created_at  date              NOT NULL
-- );
-- CREATE INDEX idx_bet_email ON bet USING btree (email);
--
-- CREATE TABLE bet_cell
-- (
--     bet_id      int8 NOT NULL REFERENCES bet (bet_id),
--     cell_number int2 NOT NULL,
--     amount      int2 NOT NULL,
--     CONSTRAINT bet_cell_pkey PRIMARY KEY (bet_id, cell_number, amount)
-- );
--
-- CREATE TABLE cell
-- (
--     cell_id     bigserial NOT NULL PRIMARY KEY,
--     wave_id     int8      NOT NULL REFERENCES wave (wave_id),
--     cell_number int2      NOT NULL,
--     CONSTRAINT cell_wave_id_cell_number_key UNIQUE (wave_id, cell_number)
-- );
-- CREATE INDEX idx_cell_wave_id ON cell USING btree (wave_id);
--
-- CREATE TABLE timeline
-- (
--     timeline_id bigserial    NOT NULL PRIMARY KEY,
--     line        timestamp(0) NOT NULL,
--     wave_id     int8         NOT NULL REFERENCES wave (wave_id),
--     is_bullet   bool         NULL,
--     is_start    bool         NULL
-- );
-- CREATE INDEX idx_timeline_line ON timeline USING btree (line);
-- CREATE INDEX idx_timeline_is_bullet ON timeline USING btree (is_bullet);
-- CREATE INDEX idx_timeline_is_start ON timeline USING btree (is_start);
--
-- CREATE TABLE algorithm_step
-- (
--     algorithm_step_id bigserial          NOT NULL PRIMARY KEY,
--     run               bool DEFAULT false NOT NULL,
--     bet_id            int8               NOT NULL REFERENCES bet (bet_id)
-- );
--
-- CREATE TABLE betting
-- (
--     bet_id    int8 NOT NULL REFERENCES bet (bet_id),
--     round_id  int8 NOT NULL REFERENCES timeline (timeline_id),
--     player_id int8 NOT NULL REFERENCES player (player_id),
--     CONSTRAINT betting_pkey PRIMARY KEY (bet_id, round_id, player_id)
-- );
--
-- CREATE TABLE round
-- (
--     round_id int8 NOT NULL REFERENCES timeline (timeline_id),
--     cell_id  int8 NOT NULL REFERENCES cell (cell_id)
-- );
--
-- CREATE TABLE algorithm
-- (
--     algorithm_id bigserial NOT NULL PRIMARY KEY,
--     minimum      int8      NOT NULL,
--     subtract     int8      NULL,
--     loss         int8      NULL REFERENCES algorithm_step (algorithm_step_id),
--     win          int8      NULL REFERENCES algorithm_step (algorithm_step_id),
--     bet_id       int8      NOT NULL REFERENCES bet (bet_id) -- Изменено на NOT NULL
-- );

-- Функции с устранением race condition
CREATE OR REPLACE FUNCTION insert_timeline(p_line timestamp, p_value numeric)
    RETURNS bigint AS
$$
DECLARE
    _wave_id     bigint;
    _timeline_id bigint;
BEGIN
    INSERT INTO wave (value)
    VALUES (p_value)
    ON CONFLICT (value) DO NOTHING
    RETURNING wave_id INTO _wave_id;

    IF NOT FOUND THEN
        SELECT wave_id
        INTO _wave_id
        FROM wave
        WHERE value = p_value;
    END IF;

    INSERT INTO timeline (line, wave_id)
    VALUES (p_line, _wave_id)
    RETURNING timeline_id INTO _timeline_id;

    RETURN _timeline_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_timeline_with_bullet(p_line timestamp, p_value numeric, p_bullet boolean)
    RETURNS bigint AS
$$
DECLARE
    _wave_id     bigint;
    _timeline_id bigint;
BEGIN
    INSERT INTO wave (value)
    VALUES (p_value)
    ON CONFLICT (value) DO NOTHING
    RETURNING wave_id INTO _wave_id;

    IF NOT FOUND THEN
        SELECT wave_id
        INTO _wave_id
        FROM wave
        WHERE value = p_value;
    END IF;

    INSERT INTO timeline (line, wave_id, is_bullet)
    VALUES (p_line, _wave_id, p_bullet)
    RETURNING timeline_id INTO _timeline_id;

    RETURN _timeline_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_timeline_with_round(p_line timestamp, p_value numeric, p_round boolean)
    RETURNS bigint AS
$$
DECLARE
    _wave_id     bigint;
    _timeline_id bigint;
BEGIN
    INSERT INTO wave (value)
    VALUES (p_value)
    ON CONFLICT (value) DO NOTHING
    RETURNING wave_id INTO _wave_id;

    IF NOT FOUND THEN
        SELECT wave_id
        INTO _wave_id
        FROM wave
        WHERE value = p_value;
    END IF;

    INSERT INTO timeline (line, wave_id, is_start)
    VALUES (p_line, _wave_id, p_round)
    RETURNING timeline_id INTO _timeline_id;

    RETURN _timeline_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_cell(p_value numeric, p_cell_number smallint, p_timeline_id bigint)
    RETURNS bigint AS
$$
DECLARE
    _wave_id bigint;
    _cell_id bigint;
BEGIN
    INSERT INTO wave (value)
    VALUES (p_value)
    ON CONFLICT (value) DO NOTHING
    RETURNING wave_id INTO _wave_id;

    IF NOT FOUND THEN
        SELECT wave_id
        INTO _wave_id
        FROM wave
        WHERE value = p_value;
    END IF;

    INSERT INTO cell (wave_id, cell_number)
    VALUES (_wave_id, p_cell_number)
    ON CONFLICT ON CONSTRAINT cell_wave_id_cell_number_key DO NOTHING
    RETURNING cell_id INTO _cell_id;

    IF NOT FOUND THEN
        SELECT cell_id
        INTO _cell_id
        FROM cell
        WHERE wave_id = _wave_id
          AND cell_number = p_cell_number;
    END IF;

    INSERT INTO round (round_id, cell_id)
    VALUES (p_timeline_id, _cell_id);

    RETURN _cell_id;
END;
$$ LANGUAGE plpgsql;
