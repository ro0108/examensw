$(document).ready(function(){

  $('#formulario').on('submit', function(event){
    event.preventDefault();
    $.ajax({
        url : ruta + 'ingresar',
        type: 'POST',
        dataType : 'json',
        data : $(this).serialize(),
        beforeSend: function(){
          $('#sub').html('validando...');
        }  
      })
      .done(function(respuesta){
        console.log(respuesta);
        if(respuesta.access){
            const datos = respuesta.datos[0];
            console.log(datos.nombre);
            location.href = ruta + 'salas?id='+datos.id;
        }else{
            $('#sub').html('ingresar');
        }
      })
      .fail(function(respuesta){
        console.log('fail');
        $('#sub').html('ingresar');
        //console.log(respuesta);
      })
      .always(function(){
        console.log('completado always');
      });
  });
});