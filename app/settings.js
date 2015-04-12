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
		godMode: false,
		puckDampening: 0.95,
		puckSpeed: 0.95,
		puckBouncing: 10,
		ballDampening: 0.98,
		ballSpeed: 80,
		pullStrength: 15,
		repulsion: 0.98,
		puckRadius: 50,
		ballRadius: 25,
		turnCooldown: 5,
		maxDirectionalSize: 180,
		winGoals: 2,
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