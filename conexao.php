<?php
$hostname = 'localhost';
$user = 'root';
$password = '';
$database = 'crud-event';

$conn = mysqli_connect($hostname,$user,$password,$database);

if(!$conn){
   echo die("Falha na conexão".mysqli_connect_error());
}
?>