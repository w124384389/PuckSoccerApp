define(function () {

	function makeNewPlayer() {
		var player = Object.create(proto);
		return player;
	}

	var proto = {
		
	};

	return {
		new: makeNewPlayer
	};
});