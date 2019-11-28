/*----------------------------------------------------------------------------------------------------
# Nome do arquivo: armazenaImovel.js
# Função: Armazena os dados do novo marcador na base de dados através do armazenaImovel.php
# Autora: Joice Käfer
# Data da criação: 08/09/2008
# Última modificação: 11/12/2008
# Comentários: Componente do trabalho de conclusão de curso de Engenharia de Computação - UNIVATES/RS
-----------------------------------------------------------------------------------------------------*/

function armazenaImovel(){

	var select = document.getElementById("tipo");
    var tipo = select.options[select.selectedIndex].value;
	var descricao = document.getElementById("descricao").value;
	var area_util = document.getElementById("area_util").value;
	var area_construida = document.getElementById("area_construida").value;
	var num_quartos = document.getElementById("num_quartos").value;
	var num_banheiros = document.getElementById("num_banheiros").value;
	var endereco = document.getElementById("endereco").value;
	var observacao = document.getElementById("observacao").value;
	var lng = document.getElementById("lng").value;
    var lat = document.getElementById("lat").value;

    var getVars = "?tipo=" + tipo
        + "&descricao=" + descricao
        + "&area_util=" + area_util
        + "&area_construida=" + area_construida
        + "&num_quartos=" + num_quartos
        + "&num_banheiros=" + num_banheiros
        + "&endereco=" + endereco
        + "&observacao=" + observacao
        + "&lng=" + lng
        + "&lat=" + lat ;
    var request = GXmlHttp.create();
    //solicita a abertura do armazenaImovel.php no servidor
    request.open('GET', 'armazenaImovel.php' + getVars, true);
    request.send(null);
    map.closeInfoWindow();
	var	point = new GLatLng(lat,lng);
	
	createMarkerImovel(point, tipo, descricao, area_util, area_construida, num_quartos, num_banheiros, endereco, observacao);

	//Após inserir um novo marcador
	//muda o select do imóvel para a opção "qualquer imóvel"
	document.getElementById("imovel").selectedIndex = 0;
	//muda o select da distância para a opção "qualquer distância"
	document.getElementById("distancia").selectedIndex = 0;
	//muda o select dos bairros para a opção "qualquer bairro"
	document.getElementById("bairro").selectedIndex = 0;
	//carrega todos marcadores
	marcadoresBairros ('qualquer');
    return false;
}
