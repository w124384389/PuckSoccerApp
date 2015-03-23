define(function() {
	var Game;

	function makeNewGame() {
		var game = Object.create(proto);
		return game;
	}

	proto = {
		init: function() {
			console.log("Game initialized.");
		},
		playMatch: function() {}
	}

	Game = {
		new: makeNewGame
	};

	return Object.defineProperty(Game, "prototype", {
		value: proto,
		writable: false
	});
});