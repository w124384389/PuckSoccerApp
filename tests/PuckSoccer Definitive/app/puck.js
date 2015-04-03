define(["vector2", "settings"], function (Vector2, Settings) {

	function makeNewPuck (id) {
		var puck = Object.create(proto);
		puck.id = id;
		puck.sprite = new Image();
		puck.sprite.src = "app/img/" + (id >= 5 ? "puck_red.png" : "puck_blue.png");
		puck.position = Vector2.new();
		puck.velocity = Vector2.new();
		puck.radius = Settings.puckRadius * 0.5;

		return puck;
	}

	var proto = {
		draw: function (context) {
			context.drawImage(this.sprite, this.position.x, this.position.y, Settings.puckRadius, Settings.puckRadius);
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
			// distance from `a` to `b`
			var d = Vector2.new(other.position.x - this.position.x, other.position.y - this.position.y),
				u = Vector2.new(d.x, d.y).divideMe(d.magnitude());

			// If the balls are on top of one another,
			if (d.magnitude() < this.radius + other.radius) {
				// then execute a repulsive force to
				// push them apart, which resembles collision.
				this.velocity.plusMe(u.multiplyMe(-Settings.repulsion * (d.magnitude() > Settings.puckRadius - 0.2 ? 0.6 : 1)));
				other.velocity.plusMe(u.multiplyMe(-1));
			}
		},
		bounce: function () {
			// bottom
			if(Settings.fieldHeight - 20 < this.position.y + this.radius){
				this.position.y = Settings.fieldHeight - this.radius - 20;
				this.velocity.y = -Math.abs(this.velocity.y);
			}
			// right
			if(Settings.fieldWidth - 25 < this.position.x + this.radius){
				this.position.x = Settings.fieldWidth - this.radius - 25;
				this.velocity.x = -Math.abs(this.velocity.x);
			}
			// top
			if(-25 > this.position.y - this.radius){
				this.position.y = this.radius - 25;
				this.velocity.y = Math.abs(this.velocity.y);
			}
			// left
			if(-30 > this.position.x - this.radius){
				this.position.x = this.radius-30;
				this.velocity.x = Math.abs(this.velocity.x);
			}
		}
	};

	return {
		new: makeNewPuck
	};
});