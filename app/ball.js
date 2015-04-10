define (["puck", "settings", "vector2", "game"], function (Puck, Settings, Vector2) {
	
	var potentialGoal = 0;

	function makeNewBall (id) {
		function superC () {};
		superC.prototype = Object.create(Puck.new(id));
		// 0: no goal
		// 1: player one
		// 2: player two
		superC.prototype.goal = 0;
		superC.prototype.move = function (deltaTime) {			
			potentialGoal = 0;

			// Field Right
			if (this.getCenterX()+this.radius >= Settings.fieldWidth-Settings.fieldPaddingX) {
				potentialGoal = 1;
				//this.position.x = Settings.fieldWidth - this.radius;
				this.velocity.x = -this.velocity.x;
			}
			// Field Left
			if (this.getCenterX()-this.radius <= Settings.fieldPaddingX) {
				potentialGoal = 2;
				//this.position.x = this.radius;
				this.velocity.x = -this.velocity.x;
			}
			// Field Bottom
			if (this.getCenterY()+this.radius >= Settings.fieldHeight-Settings.fieldPaddingY) {
				//this.position.y = Settings.fieldHeight - this.radius;
				this.velocity.y = -this.velocity.y;
			} 
			// Field Top
			if (this.getCenterY()-this.radius <= Settings.fieldPaddingY) {
				//this.position.y = this.radius;
				this.velocity.y = -this.velocity.y;
			}

			// If there is a potential goal, check the goal height conditions
			if (potentialGoal != 0 && this.getCenterY() >= Settings.getGoalY() && this.getCenterY() <= Settings.getGoalY()+Settings.getGoalHeight()) {
				this.goal = potentialGoal;
			}

			// Increment location by velocity
			this.position.plusMe(this.velocity);
			// Slow it down
			this.velocity.multiplyMe(Settings.dampening);
		};

		var myBall = new superC();
		myBall.name = "ball";
		myBall.size = Vector2.new(Settings.ballRadius, Settings.ballRadius);
		myBall.radius = myBall.size.x/2;
		return myBall;
	}

	return {
		new: makeNewBall
	};
});