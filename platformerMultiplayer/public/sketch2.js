var socket;

function setup() {
	createCanvas(600,600);
	
	//socket = io.connect('http://localhost:3000');
	socket = io.connect('192.168.1.86:3000');
	socket.on('start', createPlayer);
	socket.on('create', createOther);
	socket.on('destroy', destroyOther);
	socket.on('move', newMovement);
	
	blocks = [];
	blocks.push(new Block(0, height - 20, width, 20));
	blocks.push(new Block(width / 2 + 9, height - 150, 50, 50));
	blocks.push(new Block(width / 2 + 9, height / 2, 50, 50));
	blocks.push(new Block(width / 2 - 109, height / 2 + 75, 50, 50));
	me = new Player(width / 2, 50);
	otherPlayers = [];

}

function createPlayer(id) {
	me = new Player(width / 2, 50, id);
}

function createOther(id) {
	otherPlayers.push(new Cpu(width / 2, 0, id));
}

function destroyOther(data) {
	for (var i = 0; i < otherPlayers.length; i++) {
		if (otherPlayers[i].id == data) {
			otherPlayers.splice(i,1);
			break;
		}
	}
}

function newMovement(data) {
	for (var i = 0; i < otherPlayers.length; i++) {
		if (otherPlayers[i].id == data.id) {
			otherPlayers[i].update(data.x, data.y);
		}
	}
}

function moving() {
	
	var data = {
		x: me.x,
		y: me.y,
		id: me.id
	}
	socket.emit('move', data);
}

function draw () {
	background(150);
	for (var i = 0; i < blocks.length; i++){
		blocks[i].show();
	}
	for (var i = 0; i < otherPlayers.length; i++) {
		otherPlayers[i].show();
	}
	me.update();
	me.show();
}

function keyPressed() {
	if (keyCode == 32 && me.accel == 0) {
		me.jump();
	}
}