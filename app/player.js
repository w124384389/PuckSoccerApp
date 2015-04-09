define(function () {

	function makeNewPlayer (formation) {
		var player = Object.create(proto);
		player.formation = formation;
		return player;
	}

	var proto = {
		"score": 0,
		"formation": ""
	};

	return {
		new: makeNewPlayer
	};
});