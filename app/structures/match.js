var Puck;

Puck = require('./puck.js');

function makeNewMatch() {
	var match = Object.create(proto);
	
	match.pucks = [];
	match.ball = {};
	match.id = 0;
	match.turnBar = {};
	match.turnIcon = {};
	match.player1Turn = false;

	return match;
}

proto = {
	addGoal: function() {},
	startTurn: function() {},
	endTurn: function() {},
	start: function() {},
}