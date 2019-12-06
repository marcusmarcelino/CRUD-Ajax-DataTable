$(document).ready(function () {
   $("#add").on('click', function () {
      limparCampos();
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
            data_evento: $('#dataEvento').val(),
            editRowID: $('#editRowID').val()
         },
         success: function () {
            $("#modalForm").modal('hide');
            limparCampos();
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
      url: 'controller.php?op=setInfo',
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

function view(id) {
   $.ajax({
      url: 'controller.php?op=setInfo',
      method: 'GET',
      dataType: 'json',
      data: {
         id: id
      },
      success: function () {
      }
   }).done(function (response) {
      $('#dtNomeEvent').append("O evento <strong >" + response.nome_evento + "</strong>");
      $('#dtLocalEvent').append("Ocorrerá no: <strong >" + response.local_evento + "</strong>");
      $('#dtDataEvent').append("Data do Evento: <strong >" + response.data_evento + "</strong>");
      $('#dtCidadeEvent').append("Cidade em que ocorrerá o evento: <strong >" + response.cidade_evento + "</strong>");
      $('#dtEstadoEvent').append("Estado em que ocorrerá o evento: <strong >" + response.estado_evento + "</strong>");
   }).fail(function (error) {
      console.log(error);
   });
}

function delet(id) {
   if (confirm('Você tem certeza??')) {
      $.ajax({
         url: 'controller.php?op=delet',
         method: 'POST',
         dataType: 'text',
         data: {
            id: id
         },
         success: function (response) {
            window.location.reload();
         }
      }).done(function (response) {
         alert(response);
      }).fail(function (error) {
         console.log(error);
      });
   } else {
      alert('Exclusão cancelado!!')
   }
}

function limparCampos() {
   $('#nomeEvento').val('');
   $('#localEvento').val('');
   $('#cidadeEvento').val('');
   $('#estadoEvento').val('');
   $('#dataEvento').val('');
   $("#editRowID").val('');
}

function limparCamposView(){
   $('#dtNomeEvent strong').remove();
   $('#dtLocalEvent strong').remove();
   $('#dtDataEvent strong').remove();
   $('#dtCidadeEvent strong').remove();
   $('#dtEstadoEvent strong').remove();
}