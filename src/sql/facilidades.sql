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
-- Name: facilidades; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE facilidades (
    id integer NOT NULL,
    tipo character varying(30) NOT NULL,
    descricao character varying(60) NOT NULL,
    endereco character varying(200) NOT NULL,
    observacao character varying(400) NOT NULL,
    localizacao geometry,
    CONSTRAINT enforce_dims_localizacao CHECK ((ndims(localizacao) = 2)),
    CONSTRAINT enforce_geotype_localizacao CHECK (((geometrytype(localizacao) = 'POINT'::text) OR (localizacao IS NULL))),
    CONSTRAINT enforce_srid_localizacao CHECK ((srid(localizacao) = 4326))
);


ALTER TABLE public.facilidades OWNER TO postgres;

--
-- Name: facilidades_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE facilidades_id_seq
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;


ALTER TABLE public.facilidades_id_seq OWNER TO postgres;

--
-- Name: facilidades_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE facilidades_id_seq OWNED BY facilidades.id;


--
-- Name: facilidades_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('facilidades_id_seq', 44, true);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE facilidades ALTER COLUMN id SET DEFAULT nextval('facilidades_id_seq'::regclass);


--
-- Data for Name: facilidades; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO facilidades VALUES (1, 'clube', 'Clube Esportivo Sete de Setembro', 'Av. 7 de Setembro, 1348 - Moinhos', 'Tel: 3714-1014', '0101000020E6100000C7FCFFDF08FD49C0CC10B72107773DC0');
INSERT INTO facilidades VALUES (2, 'parque', 'Parque Professor Theobaldo Dick', 'Rua Santos Filho', 'Área para esporte, shows e eventos.', '0101000020E61000007F0A00045EFC49C0F8FEE72877773DC0');
INSERT INTO facilidades VALUES (3, 'restaurante', 'Nápoli', 'Rua Santos Filho, 407', 'Tel: 3748-3357', '0101000020E6100000D806002499FB49C0657701EEF2763DC0');
INSERT INTO facilidades VALUES (5, 'ensino', 'Colégio Cenecista João Batista de Mello', 'Rua Germano Berner, 272 - Florestal', 'Tel: 3714-2614', '0101000020E6100000A4EBFF2947FC49C091D74E0EC2753DC0');
INSERT INTO facilidades VALUES (6, 'posto_gasolina', 'Posto Faleiro', 'Rua Júlio de Castilhos, 1348', 'Aberto 24 horas', '0101000020E61000007CF6FF59EAFB49C05F7A6357C6753DC0');
INSERT INTO facilidades VALUES (7, 'ensino', 'Colégio Madre Bárbara', 'Rua Borges de Medeiros, 403 - Centro', 'Tel: 3714-3341', '0101000020E61000004CF6FF5576FB49C01C923F41AE773DC0');
INSERT INTO facilidades VALUES (8, 'hotel', 'Hotel Vallér', 'Rua Donga Menezes, 165 - Montanha', 'Tel: 3714-1413', '0101000020E6100000F60500C87AFD49C0C1DEAE62EB713DC0');
INSERT INTO facilidades VALUES (9, 'hotel', 'Weind Turis Hotel', 'Av. Sete de Setembro, 745 - Moinhos', 'www.weindhotel.com.br, Tel: 3714-8500', '0101000020E61000001D0300B00BFD49C06ADD14BBA7753DC0');
INSERT INTO facilidades VALUES (10, 'hotel', 'Hotel Locatelli', 'Alameda Almirante Barroso, 112', 'Tel: 3748-3562', '0101000020E61000003F070008C4FB49C0ECD94A6348733DC0');
INSERT INTO facilidades VALUES (11, 'hotel', 'Hotel Recanto', 'Rua Maranhão, 11', 'Tel: 3714-4881, próximo a RS-130', '0101000020E610000051E5FFC7E5FB49C07DAAAD0907703DC0');
INSERT INTO facilidades VALUES (12, 'hotel', 'Zallon Hotel Executivo', 'Rua Jacob A. Altmayer, 36 - Americano', 'www.zallonhotel.com.br, Tel:3709-1002', '0101000020E610000046160091A4FB49C0A492C03A1C743DC0');
INSERT INTO facilidades VALUES (13, 'hotel', 'Imperatriz Apart Hotel', 'Rua Tereza Cristina, 353 - Florestal', 'www.imperatrizaparthotel.com.br, Tel: 3748-7272', '0101000020E6100000C8E8FFA336FC49C0A16F056F6C743DC0');
INSERT INTO facilidades VALUES (14, 'hotel', 'Hotel Solar da Barra', 'Rua Silva Jardim, 135 - Centro', 'Tel: 3748-1955', '0101000020E6100000A7FDFFCD85FB49C0E7F574ED43783DC0');
INSERT INTO facilidades VALUES (16, 'restaurante', 'Restaurante Planeta Terra', 'BR 386 Km 346 - Unicshopping', 'Tel: 3714-7369', '0101000020E6100000560200C4F8FB49C00B910B8212733DC0');
INSERT INTO facilidades VALUES (17, 'shopping', 'Unicshopping', 'BR 386 Km 346', 'As lojas não abrem em domingos e feriados.', '0101000020E61000005E0D00F80FFC49C0D32F6191F7723DC0');
INSERT INTO facilidades VALUES (18, 'restaurante', 'Sborneas', 'BR 386 Km 346', 'Tel: 3714-7374', '0101000020E610000005FDFF9B02FC49C0C37587BB13733DC0');
INSERT INTO facilidades VALUES (4, 'restaurante', 'Emertini', 'Av. Benjamin Constant, 1743 - Florestal', '', '0101000020E610000040F5FFD126FC49C0A2265C826A753DC0');
INSERT INTO facilidades VALUES (19, 'restaurante', 'Galeteria Alvi Azul', 'Av. dos 15, 410', 'Tel: 3710-2951', '0101000020E610000015E9FFCE56FC49C0E2168620F4733DC0');
INSERT INTO facilidades VALUES (20, 'restaurante', 'Restaurante Skinão', 'Rua Osvaldo Aranha, 14', 'Tel: 3714-2907', '0101000020E610000030F5FF6200FB49C0C6C77D6460783DC0');
INSERT INTO facilidades VALUES (21, 'restaurante', 'Ki-kão Lanches, Rest. e Pizzaria', 'Av. Senador Alberto Pasqualini, 527', 'Tel: 3714-5185', '0101000020E6100000001300B9C7FB49C014CCB3B2BF743DC0');
INSERT INTO facilidades VALUES (22, 'restaurante', 'Restaurante Piloneto', 'Av. Benjamim Constant, 1520', 'Tel: 3714-3855', '0101000020E6100000F002001A39FC49C08B3EE90470753DC0');
INSERT INTO facilidades VALUES (23, 'hotel', 'Hotel Dahlen', 'Rua Júlio de Castilhos, 896 - Centro', 'www.hoteldahlen.com.br, Tel: 3714-1225', '0101000020E6100000140D003B91FB49C0CC15F78283763DC0');
INSERT INTO facilidades VALUES (24, 'restaurante', 'Restaurante Moenda', 'Rua João Batista de Mello, 251 - Centro', 'Tel: 3714-2323', '0101000020E6100000140800AC5CFB49C0148E3856FD763DC0');
INSERT INTO facilidades VALUES (25, 'restaurante', 'Casa da Montanha', 'Av. Benjamim Constant, 3333', 'Tel: 3710-1276', '0101000020E6100000BB1700B0BFFD49C05E94A5C169733DC0');
INSERT INTO facilidades VALUES (26, 'restaurante', 'Churrascaria Caixeral', 'Av. Benjamim Constant, 420 – Centro', 'Tel: 3714 3141', '0101000020E6100000631B004785FB49C01A7208EEA2773DC0');
INSERT INTO facilidades VALUES (27, 'shopping', 'Geneshopping', 'Av. Benjamin Constant, 1419 - Centro', 'Tel: 3714-6116', '0101000020E610000060FAFFF5A8FB49C0BA01EC8911773DC0');
INSERT INTO facilidades VALUES (28, 'hospital', 'Hospital Bruno Born', 'Av. Benjamim Constant, 881 - Centro', 'Tel: 3714-7500', '0101000020E61000007EE8FFE6B7FB49C0A5BE33F098763DC0');
INSERT INTO facilidades VALUES (29, 'igreja', 'Igreja Matriz Santo Inácio de Loyola', 'Rua Bento Gonçalves - Centro', 'Igreja católica, próxima ao Castelinho', '0101000020E61000002AE6FFD91FFB49C00F5562AA9A773DC0');
INSERT INTO facilidades VALUES (30, 'ensino', 'Escola Estadual Presidente Castelo Branco', 'Rua Bento Gonçalves, 291 - Centro', 'Tel: 3748-2828', '0101000020E6100000FBE6FF0F17FB49C04DF4F34AC4773DC0');
INSERT INTO facilidades VALUES (31, 'posto_gasolina', 'Charrua Arco Gás Lajeado', 'RS-130, km 38', 'Oferece também abastecimento de gás', '0101000020E61000002AE8FFDF54FC49C0F37140DEF1703DC0');
INSERT INTO facilidades VALUES (32, 'posto_gasolina', 'Posto de Gasolina Moinhos', 'Rua Carlos Sphor Filho, 1520 - Moinhos', 'Tel: (51) 3748-1152 ', '0101000020E61000008E0A007384FD49C045B054CC46773DC0');
INSERT INTO facilidades VALUES (33, 'igreja', 'Igreja de Moinhos', 'Esquina da Av. 7 de Setembro com a Rua Carlos Spohr Filho', 'Igreja católica', '0101000020E6100000241700C820FD49C0F5F45D8689773DC0');
INSERT INTO facilidades VALUES (34, 'posto_gasolina', 'Charrua Posto da Bento', 'Rua Bento Gonçalves, 1008 - Centro', '', '0101000020E61000007CECFF3B81FB49C05AAD317F3C763DC0');
INSERT INTO facilidades VALUES (35, 'clube', 'Clube Tiro e Caça', 'Rua Saldanha Marinho, 15', 'www.ctclajeado.com.br, Tel: 3714-7899', '0101000020E6100000951500F0FAFA49C0B7EF028288753DC0');
INSERT INTO facilidades VALUES (36, 'rodoviaria', 'Estação Rodoviária de Lajeado', 'Av. Castelo Branco, 42', 'www.rodoviarialajeado.com.br, Tel: 3011-3911', '0101000020E61000001D08003F40FD49C04882EC15CF733DC0');
INSERT INTO facilidades VALUES (37, 'supermercado', 'IMEC Matriz', 'Rua Júlio de Castilhos, 1157 - Centro', 'Contato: Renato Luis Cemin renato@superimec.com.br, Tel: 3710-1711', '0101000020E6100000D4EEFFB6BAFB49C039826290E5753DC0');
INSERT INTO facilidades VALUES (38, 'supermercado', 'IMEC Florestal', 'Av. Benjamin Constant, 1758 - Florestal', 'Contato: Gelson Joaby Spall gelson@superimec.com.br , Tel: 3714-6295', '0101000020E6100000F9F6FF887EFC49C08B1571D639753DC0');
INSERT INTO facilidades VALUES (39, 'supermercado', 'IMEC São Cristóvão', 'Av. Sen. Alberto Pasqualini, 1760 - São Cristóvão', 'Contato: Nelson Mesquita nmesquita@superimec.com.br , Tel: 3714-3320', '0101000020E6100000DF10001E45FB49C0EFA1F7E012723DC0');
INSERT INTO facilidades VALUES (40, 'ensino', 'Escola Estadual Érico Veríssimo Lajeado', 'Av. Sen. Alberto Pasqualine, 1940', 'Tel: 3714-3174', '0101000020E6100000671B00B526FB49C0A80997A0CA713DC0');
INSERT INTO facilidades VALUES (42, 'clube', 'Centro Esportivo Municipal', 'Rua Fábio Brito de Azambuja, 167', 'Ginásio poliesportivo', '0101000020E6100000C014004C62FB49C0EB5FB6FECD713DC0');
INSERT INTO facilidades VALUES (41, 'clube', 'CTG Tropilha Farrapa', 'Rua Fábio Brito Azambuja, 245', 'Clube de Tradições Gaúchas', '0101000020E6100000CBFAFF4775FB49C0572CB7D9BC713DC0');
INSERT INTO facilidades VALUES (43, 'clube', 'Clube Esportivo Lajeadense', 'Av. dos Quinze, s/n - Florestal', 'Sede da equipe de futebol lajeadense', '0101000020E61000000310009E69FC49C06868FE3F27743DC0');
INSERT INTO facilidades VALUES (44, 'ensino', 'Univates', 'Rua Avelin', '', '0101000020E6100000D9FAFFFFFAF949C0D4E4FE732C6E3DC0');


--
-- Name: facilidades_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY facilidades
    ADD CONSTRAINT facilidades_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

