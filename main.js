var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('conn');
    io.emit('connected', "#New User Connected");
 
  socket.on('chat message', function(msg){
    io.broadcast.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
	console.log('disc');
  });
  console.log(socket.id);
});

    
    

http.listen(3000, function(){
  console.log('listening on *:3000');
});