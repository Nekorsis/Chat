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
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
	console.log('disc');
  });
  io.clients((error, clients) => {
  if (error) throw error;
  console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
});
  console.log(namespace.name);
});

    
    

http.listen(3000, function(){
  console.log('listening on *:3000');
});