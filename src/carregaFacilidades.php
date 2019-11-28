<?php
/*-----------------------------------------------------------------------------------------------------------------------
# Nome do arquivo: carregaFacilidades.php
# Função: Programa que faz a conexão com o banco de dados, através do conecta.php, para buscar os facilidades nos bairros
# Autora: Joice Käfer
# Data da criação: 15/10/2008
# Última modificação:
# Comentários: Componente do trabalho de conclusão do curso de Engenharia da Computação - UNIVATES/RS
------------------------------------------------------------------------------------------------------------------------*/

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

// Abre a conexão com o PostGIS
$connection = pg_connect("host=$host dbname=$database user=$username password=$password");
if (!$connection) {
  die("Impossivel conectar : " . psql_error());
}
//armazena na variável $bairro o nome do bairro vindo da função carregaFacilidades() no principal.js 
$bairro = $_GET['nome'];

//se tiver selecionado a opção "qualquer bairro" faz o select de todos bairros, caso contrário apenas do bairro selecionado
if ($bairro != "qualquer"){
$query =  "SELECT F.tipo, F.descricao, F.endereco, F.observacao, x(transform(F.localizacao,4326)) AS lng, y(transform(F.localizacao,4326)) AS lat FROM facilidades F,bairros B WHERE ST_Contains(B.limites,F.localizacao)AND B.nome='$bairro'";
}
else
{
$query =  "SELECT F.tipo, F.descricao, F.endereco, F.observacao, x(transform(F.localizacao,4326)) AS lng, y(transform(F.localizacao,4326)) AS lat FROM facilidades F,bairros B WHERE ST_Contains(B.limites,F.localizacao)";
}
//executa o select
$result = pg_query($query);
if (!$result) {
  die('Busca invalida: ' . psql_error());
}

//cabeçalho do arquivo XML, assim o navegador interpreta que o arquivo gerado é no formato XML
header("Content-type: text/xml");
//início do arquivo XML, tag pai
echo '<markers>';
//coloca o resultado de cada uma das linhas do $result em nós XML. O pg_fetc_assoc busca as linhas da base de dados e as transforma numa matriz associativa
while ($row = @pg_fetch_assoc($result)){
  echo '<marker ';
  echo 'tipo="' . $row['tipo'] . '" ';
  echo 'descricao="' . parseToXML($row['descricao']) . '" ';
  echo 'endereco="' . parseToXML($row['endereco']) . '" ';
  echo 'observacao="' . parseToXML($row['observacao']) . '" ';
  echo 'lng="' . $row['lng'] . '" ';
  echo 'lat="' . $row['lat'] . '" ';
  echo '/>';
}

//final do arquivo XML
echo '</markers>';

?>
