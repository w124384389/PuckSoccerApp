var Vector2, Rect;

Vector2 = require('./vector2.js');
Rect = require('./rect.js');

function makeNewStatusbar() {
	var sbar = Object.create(proto);
	
	sbar.frontground = new Image(100, 200);
	sbar.background = new Image(100, 200);
	sbar.value = 0;
	sbar.bar = new Image(100, 200);
	sbar.position = Vector2(0, 0);
	sbar.width = 100;
	sbar.length = 20;

	return sbar;
}

proto = {
	f: function() {}
}