<?php
$op = $_GET['op'];
switch ($op) {
   case 'getList':
      getList();
      break;
   case 'listEstados':
      listEstados();
      break;
   case 'save':
      save();
      break;
   case 'edit':
      edit();
      break;
   case 'delet':
      delet();
      break;
   default:
      echo "Entrou na opção default";
      break;
}

function getList()
{
   include_once("conexao.php");
   if (isset($_GET)) {
      $sql = "SELECT * FROM events";
      $result = mysqli_query($conn, $sql);
      $response = '';

      if ($result->num_rows > 0) {
         while ($data = $result->fetch_assoc()) {
            $response .= '
               <tr>
                  <td >' . $data['id'] . '</td>
                  <td id="event_' . $data['id'] . '">' . $data['nome_evento'] . '</td>
                  <td >' . $data['local_evento'] . '</td>
                  <td >' . $data['data_evento'] . '</td>
                  <td>
                     <button value="edit" onclick="edit(' . $data['id'] . ')" type="button" name="edit" id="edit" class="btn btn-warning">
                        <i class="fa fa-edit"></i></button>
                     <button value="view" onclick="view(' . $data['id'] . ')" type="button" name="edit" id="edit" class="btn btn-primary">
                        <i class="fa fa-info" aria-hidden="true"></i>
                     </button>
                     <button value="delet" onclick="delet(' . $data['id'] . ')" type="button" name="edit" id="edit" class="btn btn-danger">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                     </button>
                  </td>
               </tr>
            ';
         }
         exit($response);
      } else {
         exit("BaseDeDadosVazia");
      }
   }
   mysqli_close($conn);
}

function listEstados()
{
   include_once("conexao.php");
   if (isset($_GET)) {
      $sql = "SELECT * FROM estados";
      $result = mysqli_query($conn, $sql);
      $response = '<option value="">Selecione o Estado...</option>';

      if ($result->num_rows > 0) {
         while ($data = $result->fetch_assoc()) {
            $response .= '
               <option value="' . $data['sigla'] . '">' . $data['sigla'] . '</option>
            ';
         }
         exit($response);
      } else {
         exit("BaseDeDadosVazia");
      }
   }
   mysqli_close($conn);
}

function save()
{
   include_once("conexao.php");
   if (isset($_POST)) {
      $editRowID = $_POST['editRowID'];
      $nome_evento = $_POST['nome_evento'];
      $local_evento = $_POST['local_evento'];
      $cidade_evento = $_POST['cidade_evento'];
      $estado_evento = $_POST['estado_evento'];
      $data_evento = $_POST['data_evento'];

      if ($_POST['key'] == 'update') {
         mysqli_query($conn, "UPDATE events SET 
         nome_evento='$nome_evento',
         local_evento='$local_evento',
         cidade_evento='$cidade_evento',
         estado_evento='$estado_evento',
         data_evento='$data_evento' WHERE id='$editRowID'");
         exit('update');
      }

      if ($_POST['key'] == 'add') {
         $result = mysqli_query($conn, "SELECT id FROM events WHERE nome_evento='$nome_evento'");
         if ($result->num_rows > 0) {
            exit('Registro já existe');
         } else {
            mysqli_query($conn, "INSERT INTO events (nome_evento, local_evento, cidade_evento, estado_evento, data_evento)
            VALUES ('$nome_evento','$local_evento','$cidade_evento','$estado_evento','$data_evento')") or die($mysqli->error);
            exit('O Evento foi inserido!');
         }
      }
   }
   mysqli_close($conn);
}

function edit()
{

   include_once("conexao.php");
   if (isset($_GET)) {
      $id = $_GET['id'];
      $result = mysqli_query($conn, "SELECT 
      nome_evento, 
      local_evento,
      cidade_evento,
      estado_evento,
      data_evento
      FROM events WHERE id='$id'") or die($mysqli->error);
      $data = $result->fetch_array();
      $jsonArray = array(
         'nome_evento' => $data['nome_evento'],
         'local_evento' => $data['local_evento'],
         'cidade_evento' => $data['cidade_evento'],
         'estado_evento' => $data['estado_evento'],
         'data_evento' => $data['data_evento'],
      );
      exit(json_encode($jsonArray));
   }
   mysqli_close($conn);
}
