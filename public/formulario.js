
$(document).ready(function(){

 	


// Funcion que se ejecuta cuando el evento click es activado
var validarInputs = function(){
	var name,email,password;
	name= document.getElementById("nombre").value;
	email= document.getElementById("email").value;
	password= document.getElementById("password").value;
    emailRegex1 = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

	
    if (name==="" || email==="" || password==="") {
   	return false;
   }else{
     if (!emailRegex1.test(email)){
     return false;
      }else{
      	 return true;
      }

   }
	
};

  $('#formularioRegister').on('submit', function(event){
      event.preventDefault();
	if (!validarInputs()) {
		console.log('Falto validar los Input');
	
	} else{

		$.ajax({
			url : ruta + 'registrar',
			type: 'POST',
			dataType : 'json',
			data : $(this).serialize(),
			beforeSend: function(){
			  $('#btn-submit').html('validando...');
			}  
		  })
		  .done(function(respuesta){
			  alert('Ha sido Registrado Satisfactoriamente')
			location.href = '/';
			
		  })
		  .fail(function(respuesta){
			console.log(respuesta);
		  })
		  .always(function(){
			console.log('completado');
		  }); 
	}
  });



});
