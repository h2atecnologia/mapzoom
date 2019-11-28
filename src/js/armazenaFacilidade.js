/*---------------------------------------------------------------------------------------------------
# Nome do arquivo: armazenaFacilidade.js
# Função: Armazena os dados do novo marcador na base de dados através do armazenaFacilidade.php
# Autora: Joice Käfer
# Data da criação: 08/09/2008
# Última modificação: 12/11/2008
# Comentários: Componente do trabalho de conclusão do curso de Engenharia da Computação - UNIVATES/RS
-----------------------------------------------------------------------------------------------------*/

function armazenaFacilidade(){

	var select = document.getElementById("tipo");
    var tipo = select.options[select.selectedIndex].value;
	var descricao = document.getElementById("descricao").value;
	var endereco = document.getElementById("endereco").value;
	var observacao = document.getElementById("observacao").value;
	var lng = document.getElementById("lng").value;
    var lat = document.getElementById("lat").value;

    var getVars = "?tipo=" + tipo
        + "&descricao=" + descricao
        + "&endereco=" + endereco
        + "&observacao=" + observacao
        + "&lng=" + lng
        + "&lat=" + lat ;
    var request = GXmlHttp.create();
    //solicita a abertura do armazenaFacilidade.php no servidor
    request.open('GET', 'armazenaFacilidade.php' + getVars, true);
    request.send(null);
    map.closeInfoWindow();
	var	point = new GLatLng(lat,lng);
	createMarkerFacilidade(point, tipo, descricao, endereco, observacao);

	//Após inserir um novo marcador, marca o checkbox do tipo inserido
	document.getElementById(tipo).checked = true;
	//e muda o select dos bairros para a opção "qualquer bairro"
	document.getElementById("bairro").selectedIndex = 0;
	//carrega todos marcadores
	marcadoresBairros ('qualquer');
    return false;
}

