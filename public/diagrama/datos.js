function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var id = getParameterByName('id');

$(document).ready(function () {
  var usuario = '';
  $.ajax({
    url : ruta + 'getUsuario',
    type: 'POST',
    dataType : 'json',
    data : {usuario_id : id},
  })
  .done(function(respuesta){
 
      if(respuesta.access){
        usuario = respuesta.nombre;
        console.log(usuario);
        $('#usuario').html('Chat grupal '+usuario);
      }
      else
      {
        location.href = ruta;
      }
   
  })
  .fail(function(respuesta){
    console.log('error');
  })
  .always(function(){
    console.log('completado');
  });

  });