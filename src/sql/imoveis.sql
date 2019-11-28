--
-- PostgreSQL database dump
--

SET client_encoding = 'UTF8';
SET standard_conforming_strings = off;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET escape_string_warning = off;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: imoveis; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE imoveis (
    id integer NOT NULL,
    tipo character varying(30) NOT NULL,
    descricao character varying(200) NOT NULL,
    area_util integer NOT NULL,
    area_construida integer,
    num_quartos integer,
    num_banheiros integer,
    endereco character varying(200) NOT NULL,
    observacao character varying(400),
    localizacao geometry,
    CONSTRAINT enforce_dims_localizacao CHECK ((ndims(localizacao) = 2)),
    CONSTRAINT enforce_geotype_localizacao CHECK (((geometrytype(localizacao) = 'POINT'::text) OR (localizacao IS NULL))),
    CONSTRAINT enforce_srid_localizacao CHECK ((srid(localizacao) = 4326))
);


ALTER TABLE public.imoveis OWNER TO postgres;

--
-- Name: imoveis_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE imoveis_id_seq
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;


ALTER TABLE public.imoveis_id_seq OWNER TO postgres;

--
-- Name: imoveis_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE imoveis_id_seq OWNED BY imoveis.id;


--
-- Name: imoveis_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('imoveis_id_seq', 10, true);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE imoveis ALTER COLUMN id SET DEFAULT nextval('imoveis_id_seq'::regclass);


--
-- Data for Name: imoveis; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO imoveis VALUES (1, 'apartamento', 'Residencial Moinhos', 500, 120, 3, 2, 'Rua Maria Tereza Mallmann, 77 - cjto 3/apto 102 - Moinhos', 'Condomínio fechado, com vigia à noite, espaço para esportes.', '0101000020E610000058FBFFE52FFD49C07F7B29C4F4763DC0');
INSERT INTO imoveis VALUES (2, 'casa', 'Sobrado', 200, 160, 3, 2, 'Av. 7 de Setembro, 941 - Moinhos', '3 andares', '0101000020E6100000AF0F009706FD49C06CB44D461D763DC0');
INSERT INTO imoveis VALUES (3, 'apartamento', 'Residencial Cyan', 150, 90, 2, 1, 'Rua 15 de novembro, 501 - Florestal', 'Box para 2 carros', '0101000020E6100000ACE4FF27C1FC49C01A3E2138C0753DC0');
INSERT INTO imoveis VALUES (5, 'terreno', 'Terreno com 6ha', 60000, NULL, NULL, NULL, 'Rua Rio Grande do Norte - Carneiros', 'Nas margens do Rio Taquari', '0101000020E6100000E5EFFF5FACF749C0D068C9E8E26F3DC0');
INSERT INTO imoveis VALUES (6, 'terreno', '15x20', 300, NULL, NULL, NULL, 'Rua Bento Rosa', 'Terreno de esquina, pronto para construir. Aceita-se carro ou moto na negociação.', '0101000020E61000009C0900A89FF849C0848A3308A8713DC0');
INSERT INTO imoveis VALUES (7, 'terreno', '30x30', 900, NULL, NULL, NULL, 'Av. Alberto Muller', 'Amplo terreno de esquina, próximo à Univates.', '0101000020E610000010FBFFDFB1F949C0F2E9A1DD70723DC0');
INSERT INTO imoveis VALUES (8, 'casa', 'Casa de alvenaria', 300, 156, 4, 2, 'Rua João Abott', 'Próximo ao Colégio Fernandes Vieira', '0101000020E610000055EAFFC4BBFB49C082D39A21B7773DC0');
INSERT INTO imoveis VALUES (9, 'casa', 'Ampla casa, com garagem para 3 carros', 310, 200, 5, 3, 'Av. Benjamim Constant', 'Próximo ao Geneshopping', '0101000020E6100000B3F6FF39A1FB49C065EA58A32A773DC0');
INSERT INTO imoveis VALUES (10, 'terreno', '15x20', 300, NULL, NULL, NULL, 'Av. Benjamin Constant', 'Aceita-se carro ou moto', '0101000020E6100000450400A406FF49C0B5FF6F973E733DC0');


--
-- Name: imoveis_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY imoveis
    ADD CONSTRAINT imoveis_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

