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
            var datos = respuesta.datos[0];
            console.log(datos.nombre);
            location.href = ruta + 'diagrama?id='+datos.id;
        }
        else{
            $('.error').css('visibility','visible');
            $('.error').slideDown('slow');

            setTimeout(function(){
                $('.error').slideUp('slow'); 
            },3000);
            $('#sub').html('ingresar');
        }
      })
      .fail(function(respuesta){
        console.log(respuesta);
      })
      .always(function(){
        console.log('completado');
      });
  });
});