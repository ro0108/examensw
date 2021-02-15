/*function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const id = getParameterByName('id');

$(document).ready(function () {
    const usuario = '';
    $.ajax({
      url : ruta + 'getUsuario',
      type: 'POST',
      dataType : 'json',
      data : {usuario_id : id},
    })
    .done(function(respuesta){
        console.log(respuesta);
        if(respuesta.access){
          console.log(respuesta.user);
          if(respuesta.user.type=='alumno'){
            $('#crear_sala').css('display','none');
          }
          $('#load').css('display','none');
          $('#contenido').css('display','block');
        }else{
          location.href = ruta;
        }
    })
    .fail(function(respuesta){
      console.log('error');
    })
    .always(function(){
      console.log('completado');
    });
  
});*/