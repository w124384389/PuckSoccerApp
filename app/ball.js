define (["puck", "settings", "vector2"], function (Puck, Settings, Vector2) {
	
	function makeNewBall (id) {
		var myBall = Object.create(Puck.new(id), {
			move: function (deltaTime) {
				console.log(this.id);
			}
		});
		myBall.move(3);
		/*
		myBall.move = function (deltaTime) {
			// Increment location by velocity
			this.position.plusMe(this.velocity);

			// Bounce on field limits
			if (this.getCenterX() >= Settings.fieldWidth-this.radius && this.velocity.x > 0) this.velocity.x = -this.velocity.x;
			if (this.getCenterX() <= this.radius && this.velocity.x < 0) this.velocity.x = -this.velocity.x;
			if (this.getCenterY() >= Settings.fieldHeight-this.radius && this.velocity.y > 0) this.velocity.y = -this.velocity.y;
			if (this.getCenterY() <= this.radius && this.velocity.y < 0) this.velocity.y = -this.velocity.y;
			// Check if enter the goal post of Player 1 or Player 2
			//if (this.getCenterX()+this.radius)

			// Slow it down
			this.velocity.multiplyMe(Settings.dampening);
		};
		myBall.name = "ball";
		myBall.size = Vector2.new(Settings.ballRadius, Settings.ballRadius);
		console.log(myBall.size);*/
		return myBall;
	}

	return {
		new: makeNewBall
	};
});