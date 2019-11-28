<?php
/*-------------------------------------------------------------------------------------------------------------------
# Nome do arquivo: carregaImoveis.php
# Função: Programa que faz a conexão com o banco de dados, através do conecta.php, para buscar os imóveis nos bairros
# Autora: Joice Käfer
# Data da criação: 15/10/2008
# Última modificação: 13/11/2008
# Comentários: Componente do trabalho de conclusão do curso de Engenharia da Computação - UNIVATES/RS
-------------------------------------------------------------------------------------------------------------------*/

require("conecta.php");

function parseToXML($htmlStr) 
{ 
$xmlStr=str_replace('<','&lt;',$htmlStr); 
$xmlStr=str_replace('>','&gt;',$xmlStr); 
$xmlStr=str_replace('"','&quot;',$xmlStr); 
$xmlStr=str_replace("'",'&#39;',$xmlStr); 
$xmlStr=str_replace("&",'&amp;',$xmlStr); 
return $xmlStr; 
} 

//Abre a conexão com o PostGIS
$connection = pg_connect("host=$host dbname=$database user=$username password=$password");
if (!$connection) {
  die("Impossivel conectar : " . psql_error());
}

//armazena na variável $imovel o tipo do imóvel (qualquer/apartamento/casa/terreno) vindo da função carregaImoveis() no principal.js 
$imovel = $_GET['imovel'];
$distancia = $_GET['distancia'];
$facilidades = $_GET['facilidades'];
$bairro = $_GET['bairro'];

if (empty($facilidades)){
	$facilidades = "nenhuma";
}

//explode: devolve um vetor com as facilidades que estavam entre vírgulas no $facilidades
$lista_facilidades = explode(",", $facilidades);
$imoveis_validos = array();

foreach ($lista_facilidades as $tipo){
	$lista_imoveis = array();
	$restricoes = array();

	//select inicial, antes de qualquer restrição
	$query = "SELECT distinct(I.id) FROM imoveis I, facilidades F, bairros B";

	if ($imovel != "qualquer"){
		array_push($restricoes,"I.tipo='$imovel'"); 
	}

	//Distance_Sphere(GeometryFromText('POINT(-51.9779491425 -29.4663537314)',4326), localizacao) < 500;
	if ($distancia != "qualquer"){
		if ($tipo != "nenhuma"){
		  array_push($restricoes, "F.tipo='$tipo' AND Distance_Sphere(F.localizacao,I.localizacao) <= $distancia");
		}
	}

	// SELECT A.descricao, AsText(A.localizacao) FROM imoveis A,bairros B WHERE ST_Contains(B.limites,A.localizacao) AND B.nome='Moinhos';
	if ($bairro != "qualquer"){
		array_push($restricoes,"B.nome='$bairro' AND ST_Contains(B.limites,I.localizacao)"); 
	}

	if (count($restricoes) != 0) {
		//implode = função que concatena cada um dos elementos do array restricoes usando a string AND como separador
		$query = $query." WHERE ".implode(" AND ", $restricoes); 
	}

	//executa o select
	$result = pg_query($query);
	if (!$result) {
	  die('Busca invalida: ' . psql_error());
	}
	while ($row = @pg_fetch_assoc($result)){
	  array_push($lista_imoveis, $row['id']);
	}

	if (count($imoveis_validos) == 0 ){
		$imoveis_validos = $lista_imoveis;
	}
	else{
		$imoveis_validos = array_intersect($imoveis_validos, $lista_imoveis);
	}
	//se o conjunto estiver vazio, termina a execução do laço	
	if (count($imoveis_validos) == 0 ){
		break;
	}
}

//cabeçalho do arquivo XML, assim o navegador interpreta que o arquivo gerado é no formato XML
header("Content-type: text/xml");
//início do arquivo XML, tag pai
echo '<markers>';

foreach ($imoveis_validos as $id){
	$query = "SELECT  I.tipo, I.descricao, I.area_util, I.area_construida, I.num_quartos, I.num_banheiros, I.endereco, I.observacao, x(transform(I.localizacao,4326)) AS lng, y(transform(I.localizacao,4326)) AS lat FROM imoveis I WHERE id='$id'";

	$result = pg_query($query);
	if (!$result) {
	  die('Busca invalida: ' . psql_error());
	}

	//coloca o resultado de cada uma das linhas do $result em nós XML. O pg_fetc_assoc busca as linhas da base de dados e as transforma numa matriz associativa
	$row = @pg_fetch_assoc($result);
	echo '<marker ';
	echo 'tipo="' . $row['tipo'] . '" ';
	echo 'descricao="' . parseToXML($row['descricao']) . '" ';
	echo 'area_util="' . parseToXML($row['area_util']) . '" ';
	echo 'area_construida="' . parseToXML($row['area_construida']) . '" ';
	echo 'num_quartos="' . parseToXML($row['num_quartos']) . '" ';
	echo 'num_banheiros="' . parseToXML($row['num_banheiros']) . '" ';
	echo 'endereco="' . parseToXML($row['endereco']) . '" ';
	echo 'observacao="' . parseToXML($row['observacao']) . '" ';
	echo 'lng="' . $row['lng'] . '" ';
	echo 'lat="' . $row['lat'] . '" ';
	echo '/>';
}

//final do arquivo XML
echo '</markers>';

?>
