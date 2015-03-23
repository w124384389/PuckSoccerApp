var Vector2;

Vector2 = require('');

function makeNewPuck() {
	var puck = Object.create(proto);
	
	puck.sprite = 'black';
	puck.position = Vector2(0, 0);
	puck.id = 0;

	return puck;
}

proto = {
	f: function() {}
}