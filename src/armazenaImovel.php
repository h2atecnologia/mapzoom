<?php
/*----------------------------------------------------------------------------------------------------------
# Nome do arquivo: armazenaImovel.php
# Função: Programa que faz a conexão com o banco de dados, através do conecta.php, para armazenar os imóveis
# Autora: Joice Käfer
# Data da criação: 08/09/2008
# Última modificação:
# Comentários: Componente do trabalho de conclusão do curso de Engenharia da Computação - UNIVATES/RS
------------------------------------------------------------------------------------------------------------*/

require("conecta.php");

$lat = (float)$_GET['lat'];
$lng = (float)$_GET['lng'];
$tipo = $_GET['tipo'];
$descricao = $_GET['descricao'];
$area_util = $_GET['area_util'];
$area_construida = $_GET['area_construida'];
$num_quartos = $_GET['num_quartos'];
$num_banheiros = $_GET['num_banheiros'];
$endereco = $_GET['endereco'];
$observacao = $_GET['observacao'];


if (empty($area_util)){
	$area_util = 'null';
}
if (empty($area_construida)){
	$area_construida = 'null';
}
if (empty($num_quartos)){
	$num_quartos = 'null';
}
if (empty($num_banheiros)){
	$num_banheiros = 'null';
}

//conexão com o banco de dados
$conexao = pg_connect ("host=$host dbname=$database user=$username password=$password");
//cria a variável "coordenada" com o formato do POINT esperado pelo PostGIS 
$coordenada = "(GeomFromText('POINT($lng $lat)',4326))";
//cria a variável "sql" com o insert do novo imóvel
$sql = "INSERT INTO imoveis (tipo, descricao, area_util, area_construida, num_quartos, num_banheiros, endereco, observacao, localizacao) VALUES ('$tipo', '$descricao' , $area_util, $area_construida, $num_quartos, $num_banheiros, '$endereco', '$observacao', $coordenada)";

//insere os dados do novo imóvel na tabela "imoveis" conforme a variável "sql" acima
$result = pg_query($sql);
if (!$result) {
  die('Busca invalida: ' . psql_error());
}

//fecha a conexão com o banco
pg_close($conexao);

?>
