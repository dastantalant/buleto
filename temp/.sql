CREATE TABLE public.cells
(
    cells_id bigserial NOT NULL,
    cell_0   int8      NOT NULL,
    cell_1   int8      NOT NULL,
    cell_2   int8      NOT NULL,
    cell_3   int8      NOT NULL,
    cell_4   int8      NOT NULL,
    cell_5   int8      NOT NULL,
    cell_6   int8      NOT NULL,
    cell_7   int8      NOT NULL,
    cell_8   int8      NOT NULL,
    cell_9   int8      NOT NULL,
    cell_10   int8      NOT NULL,
    cell_11   int8      NOT NULL,
    cell_12   int8      NOT NULL,
    cell_13   int8      NOT NULL,
    cell_14   int8      NOT NULL,
    cell_15   int8      NOT NULL,
    cell_16   int8      NOT NULL,
    cell_17   int8      NOT NULL,
    cell_18   int8      NOT NULL,
    cell_19   int8      NOT NULL,
    cell_20   int8      NOT NULL,
    cell_21   int8      NOT NULL,
    cell_22   int8      NOT NULL,
    cell_23   int8      NOT NULL,
    cell_24   int8      NOT NULL,
    cell_25   int8      NOT NULL,
    cell_26   int8      NOT NULL,
    cell_27   int8      NOT NULL,
    cell_28   int8      NOT NULL,
    cell_29   int8      NOT NULL,
    cell_30   int8      NOT NULL,
    cell_31   int8      NOT NULL,
    cell_32   int8      NOT NULL,
    cell_33   int8      NOT NULL,
    cell_34   int8      NOT NULL,
    cell_35   int8      NOT NULL,
    cell_36   int8      NOT NULL,
    CONSTRAINT cells_pkey PRIMARY KEY (cells_id)
);

ALTER TABLE public.cells  ADD CONSTRAINT cell_0 FOREIGN KEY (cell_0) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_1 FOREIGN KEY (cell_1) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_2 FOREIGN KEY (cell_2) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_3 FOREIGN KEY (cell_3) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_4 FOREIGN KEY (cell_4) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_5 FOREIGN KEY (cell_5) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_6 FOREIGN KEY (cell_6) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_7 FOREIGN KEY (cell_7) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_8 FOREIGN KEY (cell_8) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_9 FOREIGN KEY (cell_9) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_10 FOREIGN KEY (cell_10) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_11 FOREIGN KEY (cell_11) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_12 FOREIGN KEY (cell_12) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_13 FOREIGN KEY (cell_13) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_14 FOREIGN KEY (cell_14) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_15 FOREIGN KEY (cell_15) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_16 FOREIGN KEY (cell_16) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_17 FOREIGN KEY (cell_17) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_18 FOREIGN KEY (cell_18) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_19 FOREIGN KEY (cell_19) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_20 FOREIGN KEY (cell_20) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_21 FOREIGN KEY (cell_21) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_22 FOREIGN KEY (cell_22) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_23 FOREIGN KEY (cell_23) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_24 FOREIGN KEY (cell_24) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_25 FOREIGN KEY (cell_25) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_26 FOREIGN KEY (cell_26) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_27 FOREIGN KEY (cell_27) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_28 FOREIGN KEY (cell_28) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_29 FOREIGN KEY (cell_29) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_30 FOREIGN KEY (cell_30) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_31 FOREIGN KEY (cell_31) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_32 FOREIGN KEY (cell_32) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_33 FOREIGN KEY (cell_33) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_34 FOREIGN KEY (cell_34) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_35 FOREIGN KEY (cell_35) REFERENCES public.wave (wave_id);
ALTER TABLE public.cells ADD CONSTRAINT cell_36 FOREIGN KEY (cell_36) REFERENCES public.wave (wave_id);
