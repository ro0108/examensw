'use strict';

var express = require('express');
var	app = express();
var server = require('http').Server(app);
var	io = require('socket.io')(server);
var	port = process.env.PORT || 38599;
var	publicDir = express.static(`${__dirname}/public`);
    const bodyParser = require('body-parser');
    

    app.use(bodyParser.urlencoded({extended : false}));
    app.use(bodyParser.json());



    var mysql = require('mysql');
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tiemporeal',
    port: 3306
     });

    connection.connect(function(error){
    if(error){
      throw error;
    }else{
      console.log('Conexion correcta.');
    }
     });

app.use(publicDir)
app.get( '/diagrama', (req, res) => res.sendFile(`${publicDir}/diagrama/index.html`) );

app.post('/ingresar/',(req,res) =>{
    var query = connection.query("SELECT * FROM `usuario` WHERE correo='"+req.body.email+"' and password = '"+req.body.password+"'", 
    function(error,result){
        if(error){
        console.log("error");  
        }
        
        else {
          if(result.length > 0)
            res.status(200).send({access : true, datos : result});
          else
            res.status(200).send({access: false});
        }
    });
    
});

app.post('/getUsuario', (req, res) => {
      var query = connection.query("SELECT * FROM usuario WHERE id = " + req.body.usuario_id,
    function(error,result){
      if(result.length > 0)
        res.status(200).send({access: true, nombre : result[0].nombre});
        else
        res.status(200).send({access: false});
    });
});

app.post('/registrar',(req,res)=>{
  var query = connection.query("INSERT INTO `usuario`(`id`, `nombre`, `correo`, `password`) VALUES (NULL,'"+req.body.nombre+"','"+req.body.email+"','"+req.body.password+"')", 
  function(error,result){
      if(error)
      throw error;
      else {
          res.status(200).send({operation:true});
      }
  });
});

io.on('connection', (socket) => {
	//socket.broadcast.emit('new user', {message : 'Se ha conectado un  nuevo usuario'});

	socket.on( 'new message', message => io.emit('user says', message) );

	socket.on('new xml', message =>{
		console.log(message);
		socket.broadcast.emit('xml reenviado', message);
	});

	/*socket.on('disconnect', () => {
		console.log('Ha salido un usuario');
		socket.broadcast.emit('bye bye user', {message : 'Ha salido un usuario del Chat'});
	});*/
});

server.listen( port, () => console.log('Iniciando Express y Socket.IO en localhost:%d', port) );