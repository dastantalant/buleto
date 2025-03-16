BEGIN;

CREATE TABLE IF NOT EXISTS public.bullet
(
    timeline_id BIGINT NOT NULL,
    CONSTRAINT bullet_pkey PRIMARY KEY (timeline_id)
);

CREATE TABLE IF NOT EXISTS public.cell
(
    cell_id     bigserial NOT NULL,
    wave_id     BIGINT    NOT NULL,
    cell_number SMALLINT  NOT NULL,
    round_id    BIGINT    NOT NULL,
    CONSTRAINT cell_pkey PRIMARY KEY (cell_id)
);

CREATE TABLE IF NOT EXISTS public.round
(
    round_id BIGINT NOT NULL,
    CONSTRAINT round_pkey PRIMARY KEY (round_id)
);

CREATE TABLE IF NOT EXISTS public.timeline
(
    timeline_id bigserial                      NOT NULL,
    LINE        TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    wave_id     BIGINT                         NOT NULL,
    CONSTRAINT timeline_pkey PRIMARY KEY (timeline_id)
);

CREATE TABLE IF NOT EXISTS public.wave
(
    wave_id bigserial     NOT NULL,
    vlaue   NUMERIC(6, 5) NOT NULL,
    CONSTRAINT wave_pkey PRIMARY KEY (wave_id)
);

ALTER TABLE IF EXISTS public.bullet
    ADD CONSTRAINT bullet_timeline_id_fkey FOREIGN KEY (timeline_id) REFERENCES public.timeline (timeline_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE INDEX IF NOT EXISTS bullet_pkey ON public.bullet (timeline_id);

ALTER TABLE IF EXISTS public.cell
    ADD CONSTRAINT cell_round_id_fkey FOREIGN KEY (round_id) REFERENCES public.round (round_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID;

ALTER TABLE IF EXISTS public.cell
    ADD CONSTRAINT cell_wave_id_fkey FOREIGN KEY (wave_id) REFERENCES public.wave (wave_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE IF EXISTS public.round
    ADD CONSTRAINT round_round_id_fkey FOREIGN KEY (round_id) REFERENCES public.timeline (timeline_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE INDEX IF NOT EXISTS round_pkey ON public.round (round_id);

ALTER TABLE IF EXISTS public.timeline
    ADD CONSTRAINT timeline_wave_id_fkey FOREIGN KEY (wave_id) REFERENCES public.wave (wave_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID;

END;