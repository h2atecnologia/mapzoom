/*----------------------------------------------------------------------------------------------------
# Nome do arquivo: icones.js
# Função: Definição dos ícones a serem utilizados
# Autora: Joice Käfer
# Data da criação: 08/09/2008
# Última modificação: 10/11/2008
# Comentários: Componente do trabalho de conclusão do curso de Engenharia da Computação - UNIVATES/RS
-----------------------------------------------------------------------------------------------------*/

//Imóveis
    var iconApartamento = new GIcon(); 
    iconApartamento.image = '../icones/apartamento.png';
    iconApartamento.shadow = '../icones/apartamentos.png';
    iconApartamento.iconSize = new GSize(32, 32);
    iconApartamento.shadowSize = new GSize(59, 32);
    iconApartamento.iconAnchor = new GPoint(6, 20);
    iconApartamento.infoWindowAnchor = new GPoint(5, 1);

    var iconCasa = new GIcon(); 
    iconCasa.image = '../icones/casa.png';
    iconCasa.shadow = '../icones/casas.png';
    iconCasa.iconSize = new GSize(32, 32);
    iconCasa.shadowSize = new GSize(59, 32);
    iconCasa.iconAnchor = new GPoint(6, 20);
    iconCasa.infoWindowAnchor = new GPoint(5, 1);

    var iconTerreno = new GIcon(); 
    iconTerreno.image = '../icones/terreno.png';
    iconTerreno.shadow = '../icones/terrenos.png';
    iconTerreno.iconSize = new GSize(32, 32);
    iconTerreno.shadowSize = new GSize(59, 32);
    iconTerreno.iconAnchor = new GPoint(6, 20);
    iconTerreno.infoWindowAnchor = new GPoint(5, 1);

//Facilidades
    var iconClube = new GIcon(); 
    iconClube.image = '../icones/clube.png';
    iconClube.shadow = '../icones/clubes.png';
    iconClube.iconSize = new GSize(32, 32);
    iconClube.shadowSize = new GSize(59, 32);
    iconClube.iconAnchor = new GPoint(6, 20);
    iconClube.infoWindowAnchor = new GPoint(5, 1);

    var iconEnsino = new GIcon(); 
    iconEnsino.image = '../icones/escola.png';
    iconEnsino.shadow = '../icones/escolas.png';
    iconEnsino.iconSize = new GSize(32, 32);
    iconEnsino.shadowSize = new GSize(59, 32);
    iconEnsino.iconAnchor = new GPoint(6, 20);
    iconEnsino.infoWindowAnchor = new GPoint(5, 1);

    var iconHospital = new GIcon(); 
    iconHospital.image = '../icones/hospital.png';
    iconHospital.shadow = '../icones/hospitals.png';
    iconHospital.iconSize = new GSize(32, 32);
    iconHospital.shadowSize = new GSize(59, 32);
    iconHospital.iconAnchor = new GPoint(6, 20);
    iconHospital.infoWindowAnchor = new GPoint(5, 1);

    var iconIgreja = new GIcon(); 
    iconIgreja.image = '../icones/igreja.png';
    iconIgreja.shadow = '../icones/igrejas.png';
    iconIgreja.iconSize = new GSize(32, 32);
    iconIgreja.shadowSize = new GSize(59, 32);
    iconIgreja.iconAnchor = new GPoint(6, 20);
    iconIgreja.infoWindowAnchor = new GPoint(5, 1);

    var iconShopping = new GIcon(); 
    iconShopping.image = '../icones/shopping.png';
    iconShopping.shadow = '../icones/shoppings.png';
    iconShopping.iconSize = new GSize(28, 28);
    iconShopping.shadowSize = new GSize(49, 28);
    iconShopping.iconAnchor = new GPoint(6, 20);
    iconShopping.infoWindowAnchor = new GPoint(5, 1);

    var iconPostoGasolina = new GIcon(); 
    iconPostoGasolina.image = '../icones/posto_gasolina.png';
    iconPostoGasolina.shadow = '../icones/posto_gasolinas.png';
    iconPostoGasolina.iconSize = new GSize(32, 32);
    iconPostoGasolina.shadowSize = new GSize(59, 32);
    iconPostoGasolina.iconAnchor = new GPoint(6, 20);
    iconPostoGasolina.infoWindowAnchor = new GPoint(5, 1);

    var iconSupermercado = new GIcon(); 
    iconSupermercado.image = '../icones/supermercado.png';
    iconSupermercado.shadow = '../icones/supermercados.png';
    iconSupermercado.iconSize = new GSize(32, 32);
    iconSupermercado.shadowSize = new GSize(59, 32);
    iconSupermercado.iconAnchor = new GPoint(6, 20);
    iconSupermercado.infoWindowAnchor = new GPoint(5, 1);

    var iconRestaurante = new GIcon(); 
    iconRestaurante.image = '../icones/restaurante.png';
    iconRestaurante.shadow = '../icones/restaurantes.png';
    iconRestaurante.iconSize = new GSize(32, 32);
    iconRestaurante.shadowSize = new GSize(59, 32);
    iconRestaurante.iconAnchor = new GPoint(6, 20);
    iconRestaurante.infoWindowAnchor = new GPoint(5, 1);

    var iconHotel = new GIcon(); 
    iconHotel.image = '../icones/hotel.png';
    iconHotel.shadow = '../icones/hotels.png';
    iconHotel.iconSize = new GSize(32, 32);
    iconHotel.shadowSize = new GSize(59, 32);
    iconHotel.iconAnchor = new GPoint(6, 20);
    iconHotel.infoWindowAnchor = new GPoint(5, 1);

    var iconParque = new GIcon(); 
    iconParque.image = '../icones/parque.png';
    iconParque.shadow = '../icones/parques.png';
    iconParque.iconSize = new GSize(32, 32);
    iconParque.shadowSize = new GSize(59, 32);
    iconParque.iconAnchor = new GPoint(6, 20);
    iconParque.infoWindowAnchor = new GPoint(5, 1);

    var iconRodoviaria = new GIcon(); 
    iconRodoviaria.image = '../icones/rodoviaria.png';
    iconRodoviaria.shadow = '../icones/rodoviarias.png';
    iconRodoviaria.iconSize = new GSize(32, 32);
    iconRodoviaria.shadowSize = new GSize(59, 32);
    iconRodoviaria.iconAnchor = new GPoint(6, 20);
    iconRodoviaria.infoWindowAnchor = new GPoint(5, 1);


//Aloca os ícones por tipo
    var customIcons = [];
    customIcons["clube"] = iconClube;
    customIcons["hospital"] = iconHospital;
    customIcons["igreja"] = iconIgreja;
    customIcons["ensino"] = iconEnsino;
    customIcons["shopping"] = iconShopping;
    customIcons["posto_gasolina"] = iconPostoGasolina;
    customIcons["supermercado"] = iconSupermercado;
    customIcons["restaurante"] = iconRestaurante;
    customIcons["hotel"] = iconHotel;
    customIcons["parque"] = iconParque;
    customIcons["rodoviaria"] = iconRodoviaria;

    var customIconsImoveis = [];
    customIconsImoveis["apartamento"] = iconApartamento;
    customIconsImoveis["casa"] = iconCasa;
    customIconsImoveis["terreno"] = iconTerreno;

	var grupoFacilidades = {"clube": [], "hospital": [], "igreja": [], "ensino": [], "shopping": [], "posto_gasolina": [], "supermercado": [], "restaurante": [], "hotel": [], "parque": [], "rodoviaria": []};

	var grupoImoveis = [];
	var grupoRemover = [];

