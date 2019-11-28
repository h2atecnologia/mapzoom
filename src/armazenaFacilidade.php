<?php
/*--------------------------------------------------------------------------------------------------------------
# Nome do arquivo: armazenaFacilidade.php
# Função: Programa que faz a conexão com o banco de dados, através do conecta.php, para armazenar as facilidades
# Autora: Joice Käfer
# Data da criação: 08/09/2008
# Última modificação: 12/11/2008
# Comentários: Componente do trabalho de conclusão do curso de Engenharia da Computação - UNIVATES/RS
---------------------------------------------------------------------------------------------------------------*/

require("conecta.php");

$lat = (float)$_GET['lat'];
$lng = (float)$_GET['lng'];
$tipo = $_GET['tipo'];
$descricao = $_GET['descricao'];
$endereco = $_GET['endereco'];
$observacao = $_GET['observacao'];

//conexão com o banco de dados
$conexao = pg_connect ("host=$host dbname=$database user=$username password=$password");
//cria a variável "coordenada" com o formato do POINT esperado pelo PostGIS 
$coordenada = "(GeomFromText('POINT($lng $lat)',4326))";
//cria a variável "sql" com o insert da nova facilidade
$sql = "INSERT INTO facilidades (tipo, descricao, endereco, observacao, localizacao) VALUES ('$tipo', '$descricao' , '$endereco', '$observacao', $coordenada)";

//insere os dados da nova facilidade na tabela "facilidades" conforme a variável "sql" acima
pg_query($sql);

//fecha a conexão com o banco
pg_close($conexao);

?>

