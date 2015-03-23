function makeNewPlayer() {
	var player = Object.create(proto);
	
	player.name = "";
	player.profile = new Image(100, 200);

	return player;
}

proto = {
	f: function() {}
}
