(function (d, io) {
	'use strict';

	function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

  var id = getParameterByName('id');


	var io = io(),
		chatForm = d.querySelector('#chat-form'),
		messageText = d.querySelector('#btn-input'),
		chat = d.querySelector('#chat');

chatForm.onsubmit = function (e) {
		e.preventDefault();
       
          var usuario = '';
          $.ajax({
         url : ruta + 'getUsuario',
        type: 'POST',
       dataType : 'json',
       data : {usuario_id : id},
         })
         .done(function(respuesta){
 
           if(respuesta.access){
         var usuario1 = respuesta.nombre;
            io.emit('new message', {
		    text : messageText.value,
		    usuario : usuario1	
		   });
		  messageText.value = null;
		   return false;
         }
       })


	}

	io.on('new user', function (newUser) {
		alert(newUser.message);

	});

	io.on('user says', function (userSays) {
		chat.insertAdjacentHTML('beforeend', '<li class="right clearfix"><hr><div class="chat-body clearfix" ><div class="header"><small class=" text-muted"><span class="glyphicon glyphicon-time"></span>20:30</small><strong id="mensaje" class="pull-right primary-font">' + userSays.usuario + '</strong></div><p>' + userSays.text + '</p></div></li>');
	});

	io.on('bye bye user', function (byeByeUser) {
		alert(byeByeUser.message);
	});
})(document, io);