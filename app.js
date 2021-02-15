'use strict';
const cool = require('cool-ascii-faces');
const express = require('express');
const	app = express();
const server = require('http').Server(app);
const	io = require('socket.io')(server);
const	port = process.env.PORT || 5000;
const	publicDir = express.static(`${__dirname}/public`);


const bodyParser = require('body-parser');
const mysql = require('mysql');
    

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use(publicDir);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tiemporeal',
  port: 3306
});

connection.connect(error => {
  if (error) {
    console.error('error connecting: ' + error.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

app.get( '/diagrama', (req, res) => res.sendFile(`${publicDir}/diagrama/index.html`) );

app.post('/ingresar',(req,res) =>{
    const query = connection.query("SELECT * FROM `usuario` WHERE email='"+req.body.email+"' and password = '"+req.body.password+"'", 
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

app.get( '/salas', (req, res) => res.sendFile(`${publicDir}/sala/index.html`) );

app.post('/getUsuario', (req, res) => {
    var query = connection.query("SELECT * FROM usuario WHERE id = " + req.body.usuario_id,
    function(error,result){
      if(result.length > 0)
        res.status(200).send({access: true, user : result[0]});
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

app.get('/cool', (req, res) => res.send(cool()))

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