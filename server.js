
var express     = require('express');
var app         = express();
var http = require('http').Server(app);;
var io          = require('socket.io')(http);
var users       = {};


app.get('/', function(req, res){
  res.sendFile(__dirname + '/chat.html');
});
io.on('connection', function(socket) {
	io.emit('connect');
	console.log('Express server listening on port');
    socket.on('nickname', function(nickname) {
		console.log('nickname');
        user = registerUser(nickname, socket.id);
		socket.nickname = user.nickname;
		socket.userID = user.id
		socket.emit('ready', { id: user.id } );
    });

    socket.on('update visible users', function(users) {
		console.log('update visible users');
        for (var i in users) {
            socket.join(users[i]);
        }
    });

    socket.on('msg', function(msg) {
		console.log('msg');         
		console.log(socket.nickname);
			socket.broadcast.emit('message', { nickname: socket.nickname, text: msg });
			
    });
});

function registerUser(nickname, socketID) {
    if (users[nickname] == undefined) {
        var userId = Object.keys(users).length + 100;
        users[nickname] = {
            id: userId,
            nickname: nickname,
            socketId: socketID
        };
    }

    return users[nickname];
}

http.listen(3000, function(){
  console.log('listening on *:3000');
});