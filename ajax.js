$(document).ready(function () {
   getList(); 
});

function getList() {
   $.ajax({
      url: 'controller.php?op=getList',
      method: 'GET',
      dataType: 'text',
      success: function (response) { }
   }).done(function (response) {
      if(response != "BaseDeDadosVazia"){
         $('#tbody').html(response);
         $('#tabelaDeEventos').DataTable({
            "language": {
               "lengthMenu": "Mostrando _MENU_ registros por página",
               "zeroRecords": "Nada encontrado",
               "info": "Mostrando página _PAGE_ de _PAGES_",
               "infoEmpty": "Nenhum registro disponível",
               "infoFiltered": "(filtrado de _MAX_ registros no total)"
            },
            "order": [[ 3, "desc" ]]
         });
         $('.dataTables_length').addClass('bs-select');
      }
      
   }).fail(function (error) {
      console.log(error);
   });
}