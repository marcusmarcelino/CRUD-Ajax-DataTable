<?php
$op = $_GET['op'];
switch ($op){
   case 'getList':
      getList();
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

function getList (){
   include_once("conexao.php");
   if(isset($_GET)){
      $sql = "SELECT * FROM events";
      $result = mysqli_query($conn,$sql);
      $response = '';

      if($result->num_rows > 0){
         while($data = $result->fetch_assoc()){
            $response .= '
               <tr>
                  <td id="event_'.$data['id'].'">'.$data['nome'].'</td>
                  <td >'.$data['local'].'</td>
                  <td >'.$data['data'].'</td>
                  <td>
                     <button value="edit" onclick="edit('.$data['id'].')" type="button" name="edit" id="edit" class="btn btn-warning">
                        <i class="fa fa-edit"></i></button>
                     <button value="view" onclick="view('.$data['id'].')" type="button" name="edit" id="edit" class="btn btn-primary">
                        <i class="fa fa-info" aria-hidden="true"></i>
                     </button>
                     <button value="delet" onclick="delet('.$data['id'].')" type="button" name="edit" id="edit" class="btn btn-danger">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                     </button>
                  </td>
               </tr>
            ';
         }exit($response);
      }else{
         exit("BaseDeDadosVazia");
      }
   }
   mysqli_close($conn);
}
