
var express = require('express');

var app = express();
var server = app.listen(3000, '0.0.0.0');

app.use(express.static('public'));

console.log("My socket server is running");

var socket = require('socket.io');

var io = socket(server);

players = []
active = []

io.sockets.on('connection', newConnection);

function newConnection(socket) {
	console.log('new connection: ' + socket.id);
	socket.emit('start', players.length);
	
	for (var i = 0; i < active.length; i++) {
		socket.emit('create', players.length - i - 1);
	}
	socket.broadcast.emit('create', players.length);
	players.push(socket.id);
	active.push(socket.id);
	socket.on('move', moveMsg);
	
	socket.on("disconnect", function () {
		console.log('Player disconnected: ' + socket.id)
		for (var i = 0; i < players.length; i++) {
			if (players[i] == socket.id) {
				socket.broadcast.emit('destroy', i);
				break;
			}
		}
		
		for (var i = 0; i < active.length; i++) {
			if (active[i] == socket.id) {
				active.splice(i,1);
				break;
			}
		}
	});
	
	function moveMsg(data) {
		socket.broadcast.emit('move', data);
		//io.sockets.emit('mouse', data); sends message to everyone including the one who sent it
	}
}
