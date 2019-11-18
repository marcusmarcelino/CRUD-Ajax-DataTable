$(document).ready(function () {
   $("#add").on('click', function () {
      $('#nomeEvento').val('');
      $('#localEvento').val('');
      $('#cidadeEvento').val('');
      $('#estadoEvento option:selected').val('');
      $('#dataEvento').val('');
      $("#editRowID").val('');
   });
   getList();
   listEstados();
});

function getList() {
   $.ajax({
      url: 'controller.php?op=getList',
      method: 'GET',
      dataType: 'text',
      success: function (response) { }
   }).done(function (response) {
      if (response != "BaseDeDadosVazia") {
         $('#tbody').html(response);
         $('#tabelaDeEventos').DataTable({
            "language": {
               "lengthMenu": "Mostrando _MENU_ registros por página",
               "zeroRecords": "Nada encontrado",
               "info": "Mostrando página _PAGE_ de _PAGES_",
               "infoEmpty": "Nenhum registro disponível",
               "infoFiltered": "(filtrado de _MAX_ registros no total)",
               "search": "Procurar por:",
               "paginate": {
                  "first": "Primeiro",
                  "last": "Ultimo",
                  "next": "Próximo",
                  "previous": "Anterior"
               },
            },
            "aaSorting": []
         });
         $('.dataTables_length').addClass('bs-select');
      }

   }).fail(function (error) {
      console.log(error);
   });
}

function listEstados() {
   $.ajax({
      url: 'controller.php?op=listEstados',
      method: 'GET',
      dataType: 'text',
      success: function (response) { }
   }).done(function (response) {
      $('#estadoEvento').html(response);
   }).fail(function (error) {
      console.log(error);
   });
}

function save() {
   if (
      isNotEmpty($('#nomeEvento')) &&
      isNotEmpty($('#localEvento')) &&
      isNotEmpty($('#dataEvento')) &&
      isNotEmpty($('#cidadeEvento')) &&
      isNotEmpty($('#estadoEvento'))
   ) {
      $.ajax({
         url: 'controller.php?op=save',
         method: 'POST',
         dataType: 'text',
         data: {
            nome_evento: $('#nomeEvento').val(),
            local_evento: $('#localEvento').val(),
            cidade_evento: $('#cidadeEvento').val(),
            estado_evento: $('#estadoEvento option:selected').val(),
            data_evento: $('#dataEvento').val()
         },
         success: function () {
            $("#modalForm").modal('hide');
         }
      }).done(function (response) {
         alert(response);
      }).fail(function (error) {
         console.log(error);
      });
   } else {
      alert('Existe campo vazio, porfavor preencha-o');
   }
}

function isNotEmpty(element) {
   if (element.val() == '') {
      return false
   } else {
      return true;
   }
}

function edit(id) {
   $.ajax({
      url: 'controller.php?op=edit',
      method: 'GET',
      dataType: 'json',
      data: {
         id: id
      },
      success: function () {
         $("#modalForm").modal('show');
      }
   }).done(function (response) {
      $('#editRowID').val(id);
      $('#nomeEvento').val(response.nome_evento);
      $('#localEvento').val(response.local_evento);
      $('#dataEvento').val(response.data_evento);
      $('#cidadeEvento').val(response.cidade_evento);
      $('#estadoEvento').val(response.estado_evento);
   }).fail(function (error) {
      console.log(error);
   });
}