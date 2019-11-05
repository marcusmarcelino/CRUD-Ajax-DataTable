$(document).ready(function () {
   $('#tabelaDeEventos').DataTable();
   $('.dataTables_length').addClass('bs-select');

   getList();
});

function getList (){
   $.ajax({
      url: 'controller.php?op=getList',
      method: 'GET',
      dataType: 'text',
      success: function(response){}
   }).done(function(response){
      $('#tbody').html(response);
   }).fail(function(error){
      console.log(error);
   });
}