define(["vector2", "settings"], function (Vector2, Settings) {

	function makeNewPuck (x, y) {
		var puck = Object.create(proto);

		puck.sprite = document.createElement("img");
		//puck.sprite = new Image(100, 100);
		puck.sprite.src = "puck.png";
		console.log(puck.sprite);
		puck.position = Vector2.new(x, y);
		puck.velocity = Vector2.new();

		puck.radius = 20;

		return puck;
	}

	var proto = {
		draw: function (context) {
			context.drawImage(this.sprite, this.position.x, this.position.y);
			context.fill();
		},
		move: function (deltaTime) {
			// Increment location by velocity
			this.position.x += (this.velocity.x);
			this.position.y += (this.velocity.y);
			//console.log(this.position);
			// Slow it down
			this.velocity.y *= Settings.dampening;
			this.velocity.x *= Settings.dampening;
		},
		collide: function (other) {
			// (dx, dy) distance in x and y
			var dx = other.position.x - this.position.x,
				dy = other.position.y - this.position.y,
			// d = distance from `a` to `b`
				d = Math.sqrt(dx*dx + dy*dy),
			// (ux, uy) = unit vector, in the a -> b direction
				ux = dx / d,
				uy = dy / d;

			// If the balls are on top of one another,
			if (d < this.radius + other.radius) {
				// then execute a repulsive force to
				// push them apart, which resembles collision.
				this.velocity.x -= ux * Settings.repulsion;
				this.velocity.y -= uy * Settings.repulsion;
				other.velocity.x += ux * Settings.repulsion;
				other.velocity.y += uy * Settings.repulsion;
			}
		},
		bounce: function () {
			// bottom
			if(this.position.y + this.radius > Settings.fieldHeight){
				this.position.y = Settings.fieldHeight - this.radius;
				this.velocity.y = -Math.abs(this.velocity.y);
			}
			// right
			if(this.position.x + this.radius > Settings.fieldWidth){
				this.position.x = Settings.fieldWidth - this.radius;
				this.velocity.x = -Math.abs(this.velocity.x);
			}
			// top
			if(this.position.y - this.radius < 0){
				this.position.y = this.radius;
				this.velocity.y = Math.abs(this.velocity.y);
			}
			// left
			if(this.position.x - this.radius < 0){
				this.position.x = this.radius;
				this.velocity.x = Math.abs(this.velocity.x);
			}
		}
	};

	return {
		new: makeNewPuck
	};
});