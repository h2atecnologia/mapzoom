<?php  
/*-----------------------------------------------------------------------------------------------------------
# Nome do arquivo: carregaBairros.php
# Função: Este programa gera, em texto puro, as coordenadas a serem inseridas em um poligono do tipo GPolygon
# Autora: Joice Käfer
# Data da criação: 15/10/2008
# Última modificação: 13/11/2008
# Comentários: Componente do trabalho de conclusão do curso de Engenharia da Computação - UNIVATES/RS
------------------------------------------------------------------------------------------------------------*/

require("conecta.php");

// Abre a conexão com o postgresql
$connection = pg_connect("host=$host dbname=$database user=$username password=$password");
if (!$connection) {
	die("Impossivel conectar : " . psql_error());
}

$bairro = $_GET['nome'];

$query = "SELECT astext(limites) as limite FROM bairros WHERE nome='$bairro'";
$result = pg_query($query);
if (!$result) {
	die('Busca invalida: ' . psql_error());
}

header("Content-type: text/xml");

while ($row = @pg_fetch_assoc($result)){
	$resultado=$row[limite]; 
	//insere as chaves, de acordo com a sintaxe requerida pelo GPolygon
	$resultado=str_replace("))",")]",$resultado);
	//troca vírgulas por novas linhas
	$resultado=str_replace(",","<br>",$resultado);
	//expressão regular, by Nasair Júnior da Silva, que inverte as longitudes e as latitudes
	$resultado = preg_replace(';([-0-9\.]+)[ ,]([-0-9\.-]+);','\2 \1',$resultado);
	//troca espaços por vírgulas
	$resultado=str_replace(" ",",",$resultado);
	//troca o POLYGON pelo primeiro new GLatLng
	$resultado=str_replace("POLYGON(","[new GLatLng",$resultado);
	//troca os <br> por "), new GLatLng("
	$resultado=str_replace("<br>","), new GLatLng(",$resultado);
	//transforma em XML
	$resultado="<markers><marker bairro=\"".$resultado."\" /></markers>"; 
	echo $resultado;
}
?>

