/*-----------------------------------------------------------------------------------------------------
# Nome do arquivo: principal.js
# Função: Programa de manipulação do mapa e marcadores
# Autora: Joice Käfer
# Data da criação: 08/09/2008
# Última modificação: 12/11/2008
# Comentários: Componente do trabalho de conclusão do curso de Engenharia da Computação - UNIVATES/RS
------------------------------------------------------------------------------------------------------*/

//FUNÇÃO geral do mapa
function load() {

	if (GBrowserIsCompatible()) {

		//cria a variável map instanciando a classe GMap2
		//o mapa será exibido no div id="map" do documento HTML     
		map = new GMap2(document.getElementById("map"));
		//adiciona os controles de zoom, deslocamento e tipo
		//(mapa, satélite, híbrido)
        map.addControl(new GSmallMapControl());
        map.addControl(new GMapTypeControl());
		//define as coordenadas centrais
		map.setCenter(new GLatLng(-29.459796, -51.977799),14);
		// Cria um listener para quando clicar no mapa adicionar um novo marcador
        GEvent.addListener(map, "click", function(overlayclicado, latlng, overlaylatlng) {
			//se for clicado num local do mapa que não tiver overlay ou se for clicado no polígono (e não no marcador)
			if (overlayclicado == null || overlayclicado == overlay){
				//se for clicado no polígono
				if(overlayclicado != null){
					latlng = overlaylatlng;
				}
				
				//cria um form HTML de acordo com o padrão DOM
				var inputForm = document.createElement("form");
				inputForm.setAttribute("action","");

 				//recupera a longitude e a latitude do ponto clicado
				var lng = latlng.lng();
				var lat = latlng.lat();
				
				if(document.getElementsByName('cadastro')[0].checked == true){
					//chama a função armazenaFacilidade() que armazena os dados da nova facilidade na 
					//base de dados através do armazenaFacilidade.php
					inputForm.onsubmit = function() {armazenaFacilidade(); return false;};
					inputForm.innerHTML = '<fieldset style="width:150px; font-size: 9px;">'
					  + '<legend>Nova facilidade</legend>'
					  + '<select name="tipo" id="tipo" style="font-size: 9px;">'
					  + '<option value="clube" selected="selected">Clube</option>'
					  + '<option value="hospital">Hospital</option>'
					  + '<option value="hotel">Hotel</option>'
					  + '<option value="igreja">Igreja</option>'
	 				  + '<option value="ensino">Institui&ccedil;&atilde;o de Ensino</option>'
					  + '<option value="parque">Parque</option>'
					  + '<option value="posto_gasolina">Posto de Gasolina</option>'
					  + '<option value="restaurante">Restaurante</option>'
					  + '<option value="rodoviaria">Rodovi&aacute;ria</option>'
					  + '<option value="shopping">Shopping</option>'
					  + '<option value="supermercado">Supermercado</option>'
					  + '</select><br><br>'
					  + '<label for="descricao">Descri&ccedil;&atilde;o</label>'
					  + '<input type="text" id="descricao" style="width:100%; font-size: 9px;"/>'
					  + '<label for="endereco">Endere&ccedil;o</label>'
					  + '<input type="text" id="endereco" style="width:100%; font-size: 9px;"/>'
					  + '<label for="observacao">Observa&ccedil;&atilde;o</label>'
					  + '<input type="text" id="observacao" style="width:100%; font-size: 9px;"/>'
					  + '<input type="submit" value="Salvar"/>'
					  + '<input type="hidden" id="lng" value="' + lng + '"/>'
					  + '<input type="hidden" id="lat" value="' + lat + '"/>'
					  + '</fieldset>';
					map.openInfoWindow (latlng,inputForm);
				}
				else {
					//chama a função armazenaImovel() que armazena os dados do novo imóvel na 
					//base de dados através do armazenaImovel.php
					inputForm.onsubmit = function() {armazenaImovel(); return false;};
					inputForm.innerHTML = '<fieldset style="width:150px; font-size: 9px;">'
					  + '<legend>Novo im&oacute;vel</legend>'
					  + '<select name="tipo" id="tipo" style="font-size: 9px;">'
					  + '<option value="apartamento" selected="selected">Apartamento</option>'
					  + '<option value="casa">Casa</option>'
					  + '<option value="terreno">Terreno</option>'
					  + '</select><br><br>'
					  + '<label for="descricao">Descri&ccedil;&atilde;o</label>'
					  + '<input type="text" id="descricao" style="width:100%; font-size: 9px;"/>'
					  + '<label for="area_util">&Aacute;rea &uacute;til  </label>'
					  + '<input type="text" id="area_util" style="width:20%; font-size: 9px;"/>m&sup2;<br>'
					  + '<label for="area_construida">constru&iacute;da </label>'
					  + '<input type="text" id="area_construida" style="width:20%; font-size: 9px;"/>m&sup2;<br>'
					  + '<label for="num_quartos">N&ordm; de quartos </label>'
					  + '<input type="text" id="num_quartos" style="width:10%; margin-top:5px;font-size: 9px;"/><br>'
					  + '<label for="num_banheiros">N&ordm; de banheiros </label>'
					  + '<input type="text" id="num_banheiros" style="width:10%; font-size: 9px;"/><br>'
					  + '<label for="endereco">Endere&ccedil;o</label>'
					  + '<input type="text" id="endereco" style="width:100%; font-size: 9px;"/>'
					  + '<label for="observacao">Observa&ccedil;&atilde;o</label>'
					  + '<input type="text" id="observacao" style="width:100%; font-size: 9px;"/>'
					  + '<input type="submit" value="Salvar"/>'
					  + '<input type="hidden" id="lng" value="' + lng + '"/>'
					  + '<input type="hidden" id="lat" value="' + lat + '"/>'
					  + '</fieldset>';
					map.openInfoWindow (latlng,inputForm);
				}
				
			}//if (overlayclicado == null || overlayclicado == overlay)		});//GEvent

		//função que carrega as facilidades somente no primeiro acesso ao mapa
		carregaFacilidades();
		//função que carrega os imóveis no primeiro acesso ao mapa e em cada interação posterior
		carregaImoveis();

    }//if (GBrowserIsCompatible())
    else {
      alert("Desculpe, a Google Maps API não é compatível com este navegador!");
    }
}//function load()

//FUNÇÃO que carrega as facilidades somente no primeiro acesso ao mapa na função load()
function carregaFacilidades() {

	var bairro_parametro = "qualquer";
	var parametro = "carregaFacilidades.php?nome=";
	GDownloadUrl(parametro + bairro_parametro, function(data){
		var xml = GXml.parse(data);
		var markers = xml.documentElement.getElementsByTagName("marker");
		for (var i = 0; i < markers.length; i++){
		var tipo = markers[i].getAttribute("tipo");
		var descricao = markers[i].getAttribute("descricao");
		var endereco = markers[i].getAttribute("endereco");
		var observacao = markers[i].getAttribute("observacao");
		var point = new GLatLng(parseFloat(markers[i].getAttribute("lat")),
				                parseFloat(markers[i].getAttribute("lng")));
		//chama a função que cria o marcador da facilidade
		createMarkerFacilidade(point, tipo, descricao, endereco, observacao);

		}//for
	});
}

//FUNÇÃO que instancia a variável marker (usada na criação de um marcador facilidade) e cria um listener que aguarda o click sobre a facilidade para abrir a janela de informações (html)
function createMarkerFacilidade(point, tipo, descricao, endereco, observacao) {

	var marker = new GMarker(point, customIcons[tipo]);
	grupoFacilidades[tipo].push(marker);

	//formata a janela de informações do marcador
	var html = "<b>" + tipo + "</b> <br>" + descricao + "<br>" + endereco + "<br>" + observacao;
	var html = "<b>Facilidade:</b> " + tipo + "</b> <br><b>Descri&ccedil;&atilde;o:</b> " + descricao + "<br><b>Endere&ccedil;o:</b> " + endereco + "<br><b>Observa&ccedil;&atilde;o:</b> " + observacao + "<br><b>Ponto:</b> " + point;
	//cria o evento listener para abrir a janela de informações da facilidade quando esta for clicada
	GEvent.addListener(marker, 'click', function() {
	marker.openInfoWindowHtml(html);
	});
	map.addOverlay(marker);
	marker.hide();
}

//FUNÇÃO que carrega os imóveis no primeiro acesso ao mapa na função load() e em cada interação posterior
function carregaImoveis() { 

	//remove todos os marcadores de imóveis antigos
	while(grupoImoveis.length != 0){
		var marker = grupoImoveis.pop();
		grupoRemover.push(marker);
	}	

	var lista = [];
	var categorias = ["clube", "hospital", "hotel", "igreja", "ensino", "parque", "posto_gasolina", "restaurante", "rodoviaria", "shopping", "supermercado"];
	for(var j = 0; j< categorias.length; j++){
		var tipo = categorias[j];
		var checkbox = document.getElementById(tipo);
		if (checkbox.checked == true){
			lista.push(tipo);
		}	
	}
	//transforma o array em uma string onde cada um dos elementos está concatenado por vírgula
	var facilidades = lista.join(",");
	
	var select_imovel = document.getElementById("imovel");
    var imovel = select_imovel.options[select_imovel.selectedIndex].value;

	var select_distancia = document.getElementById("distancia");
    var distancia = select_distancia.options[select_distancia.selectedIndex].value;

	var select_bairro = document.getElementById("bairro");
    var bairro = select_bairro.options[select_bairro.selectedIndex].value;

	var parametro = "carregaImoveis.php?imovel=" + imovel + "&distancia=" + distancia + "&facilidades=" + facilidades + "&bairro=" + bairro;
	GDownloadUrl(parametro, function(data){
       var xml = GXml.parse(data);
       var markers = xml.documentElement.getElementsByTagName("marker");
	   if (markers.length == 0){
			alert ("Nao foram encontrados imoveis com estas caracteristicas!");
	   }
       for (var i = 0; i < markers.length; i++)
       {
        var tipo = markers[i].getAttribute("tipo");
        var descricao = markers[i].getAttribute("descricao");
        var area_util = markers[i].getAttribute("area_util");
        var area_construida = markers[i].getAttribute("area_construida");
        var num_quartos = markers[i].getAttribute("num_quartos");
        var num_banheiros = markers[i].getAttribute("num_banheiros");
        var endereco = markers[i].getAttribute("endereco");
        var observacao = markers[i].getAttribute("observacao");
        var point = new GLatLng(parseFloat(markers[i].getAttribute("lat")),
                                parseFloat(markers[i].getAttribute("lng")));
		//chama a função que cria o marcador do imóvel
        createMarkerImovel(point, tipo, descricao, area_util, area_construida, num_quartos, num_banheiros, endereco, observacao);

      }//for
		//remove todos os marcadores de imóveis antigos
		while(grupoRemover.length != 0){
			var marker = grupoRemover.pop();
			map.removeOverlay(marker);
		}
    });
}

//FUNÇÃO que instancia a variável marker (usada na criação de um marcador imóvel) e cria um listener que aguarda o click sobre o imóvel para abrir a janela de informações (html)
function createMarkerImovel(point, tipo, descricao, area_util, area_construida, num_quartos, num_banheiros, endereco, observacao) {

	var marker = new GMarker(point, customIconsImoveis[tipo]);
	grupoImoveis.push(marker);
	
	if(tipo != "terreno"){
		//formata a janela de informações do marcador
		var html = "<b>Im&oacute;vel:</b> " + tipo + "</b> <br><b>Descri&ccedil;&atilde;o:</b> " + descricao + "<br><b>&Aacute;rea &uacute;til:</b> " + area_util + "<br><b>&Aacute;rea constru&iacute;da:</b> " + area_construida + "<br><b>N&ordm; de quartos:</b> " + num_quartos + "<br><b>N&ordm; de banheiros:</b> " + num_banheiros + "<br><b>Endere&ccedil;o:</b> " + endereco + "<br><b>Observa&ccedil;&atilde;o:</b> " + observacao + "<br><b>Ponto:</b> " + point;
	}
	else{
		var html = "<b>Im&oacute;vel:</b> " + tipo + "</b> <br><b>Descri&ccedil;&atilde;o:</b> " + descricao + "<br><b>&Aacute;rea:</b> " + area_util + "<br><b>Endere&ccedil;o:</b> " + endereco + "<br><b>Observa&ccedil;&atilde;o:</b> " + observacao + "<br><b>Ponto:</b> " + point;
	}
	
	//cria o evento listener para abrir a janela de informações do imóvel quando este for clicado
	GEvent.addListener(marker, 'click', function() {
	marker.openInfoWindowHtml(html);
	});
	map.addOverlay(marker);
}
