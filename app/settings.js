define(["vector2"], function (Vector2) {
	var config, goalHeight = 120;

	config = {
		gameWidth: 800,
		gameHeight: 500,
		fieldWidth: 600,
		fieldHeight: 360,
		fieldOffsetX: 100,
		fieldOffsetY: 100,
		fieldPaddingX: 30,
		fieldPaddingY: 15,
		godMode: true,
		dampening: 0.95,
		pullStrength: 0.08,
		repulsion: 0.95,
		puckRadius: 50,
		ballRadius: 25,
		getGoalWidth: function () {
			return this.fieldPaddingX;
		},
		getGoalHeight: function () {
			return goalHeight;
		},
		getGoalY: function () {
			return this.fieldHeight/2 - goalHeight/2;
		},
	};

	return config;
});