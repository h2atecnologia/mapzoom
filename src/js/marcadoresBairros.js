/*----------------------------------------------------------------------------------------------------
# Nome do arquivo: marcadoresBairros.js
# Função: Programa de manipulação dos marcadores de acordo com os bairros
# Autora: Joice Käfer
# Data da criação: 08/09/2008
# Última modificação: 12/11/2008
# Comentários: Componente do trabalho de conclusão do curso de Engenharia da Computação - UNIVATES/RS
-----------------------------------------------------------------------------------------------------*/

var overlay = null;

  // Método para testar se um ponto está dentro de um polígono
  // Retorna true se o polígono contém o ponto
  // Algoritmo de http://alienryderflex.com/polygon/ 
  GPolygon.prototype.Contains = function(point) {
    var j=0;
    var oddNodes = false;
    var x = point.lng();
    var y = point.lat();
    for (var i=0; i < this.getVertexCount(); i++) {
      j++;
      if (j == this.getVertexCount()) {j = 0;}
      if (((this.getVertex(i).lat() < y) && (this.getVertex(j).lat() >= y))
      || ((this.getVertex(j).lat() < y) && (this.getVertex(i).lat() >= y))) {
        if ( this.getVertex(i).lng() + (y - this.getVertex(i).lat())
        /  (this.getVertex(j).lat()-this.getVertex(i).lat())
        *  (this.getVertex(j).lng() - this.getVertex(i).lng())<x ) {
          oddNodes = !oddNodes
        }
      }
    }
    return oddNodes;
  }

function exibeFacilidades(){

	var facilidades = ["clube", "hospital", "hotel", "igreja", "ensino", "parque", "posto_gasolina", "restaurante", "rodoviaria", "shopping", "supermercado"];
	for(var j = 0; j< facilidades.length; j++){
		var tipo = facilidades[j];
		var checkbox = document.getElementById(tipo);
		for (var i = 0; i < grupoFacilidades[tipo].length; i++) {
			var marker = grupoFacilidades[tipo][i];
			if (checkbox.checked == true && (overlay == null || overlay.Contains(marker.getLatLng()))) {
				  marker.show(); 
			}
			else {
				marker.hide();
			}
	  	}	
	}
}

function marcadoresBairros(nome){ 

	//Quando a opção "qualquer bairro" é selecionada remove o overlay e mostra todos marcadores
	if (nome == "qualquer"){
		if (overlay!=null){map.removeOverlay(overlay);}
		overlay = null;
		exibeFacilidades();
		return;		
	}
		
	var bairro_parametro = nome;
	var parametro = "carregaBairros.php?nome=";
	GDownloadUrl(parametro + bairro_parametro, function(data) {
		var xml = GXml.parse(data);
		var markers = xml.documentElement.getElementsByTagName("marker");
		for (var i = 0; i < markers.length; i++) {
			//GPolygon espera uma string e não uma matriz. Neste caso, o eval transforma uma matriz numa string.			
			var bairro = eval(markers[i].getAttribute("bairro"));
			
			//Remove overlay
			if (overlay!=null){map.removeOverlay(overlay);}

		 	// cria um polígono -> GPolygon(coordenadas, cor do contorno, espessura do contorno, 
			//transparência do contorno,cor de preenchimento, tranparência da cor de preenchimento)
			overlay = new GPolygon(bairro, "#ff3c00", 2, 0.7, "#ffdcd1", 0.5 );

			// centraliza o mapa no bairro selecionado
			var centro = overlay.getBounds().getCenter();
			map.panTo(centro);

			//adiciona o polígono do bairro sobre o mapa
			map.addOverlay(overlay);

         }//for

	//exibe os marcadores
	exibeFacilidades();
	});//GDownloadUrl
}

