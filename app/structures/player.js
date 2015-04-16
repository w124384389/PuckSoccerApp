define(function () {
	var proto;
	function makeNewPlayer(formation) {
		var player = Object.create(proto);
		player.formation = formation;
		return player;
	}

	proto = {
		score: 0,
		formation: "",
		name: "",
		profile: ""
	};

	return {
		new: makeNewPlayer
	};
});
