define(function () {
	var Match,
		gravity = 0,
		dampening = 0.92,
		pullStrength = 0.01,
		numCircles = 10,
		repulsion = 0.2,
		circles = [];

	function makeNewMatch() {
		console.log("new match");
		var match = Object.create(proto);
		
		match.pucks = [];
		match.ball = {};
		match.id = 0;
		match.turnBar = {};
		match.turnIcon = {};
		match.player1Turn = false;

		return match;
	}

	function initializeCircles(){
		// Initialize the array of circle objects
		for(var i = 0; i < numCircles; i++){
			circles.push({
				x: Math.random() * canv.width,
				y: Math.random() * canv.height,
				// (vx, vy) = Velocity vector
				vx: 0,
				vy: 0,
				radius: 20
			});
		}
	}

	function incrementSimulation(circle){
		// Increment location by velocity
		circle.x += circle.vx;
		circle.y += circle.vy;

		// Increment Gravity
		circle.vy += gravity;

		// Slow it down
		circle.vy *= dampening;
		circle.vx *= dampening;
	}

	function bounce(circle){
		// bottom
		if(circle.y + circle.radius > 500){
			circle.y = 500 - circle.radius;
			circle.vy = -Math.abs(circle.vy);
		}
		// right
		if(circle.x + circle.radius > 800){
			circle.x = 800 - circle.radius;
			circle.vx = -Math.abs(circle.vx);
		}
		// top
		if(circle.y - circle.radius < 0){
			circle.y = circle.radius;
			circle.vy = Math.abs(circle.vy);
		}
		// left
		if(circle.x - circle.radius < 0){
			circle.x = circle.radius;
			circle.vx = Math.abs(circle.vx);
		}
	}

	// Collides two circles `a` and `b`.
	function collide(a, b){
		// (dx, dy) distance in x and y
		var dx = b.x - a.x,
		dy = b.y - a.y,
		// d = distance from `a` to `b`
		d = Math.sqrt(dx*dx + dy*dy),
		// (ux, uy) = unit vector
		// in the a -> b direction
		ux = dx / d,
		uy = dy / d;

		// If the balls are on top of one another,
		if(d < a.radius + b.radius){
			// then execute a repulsive force to
			// push them apart, which resembles collision.
			a.vx -= ux * repulsion;
			a.vy -= uy * repulsion;
			b.vx += ux * repulsion;
			b.vy += uy * repulsion;
		}
	}

	proto = {
		update: function(c) {
			var i, j, circle;
			for (i = 0; i < numCircles; i++){
				circle = circles[i];

				// Handle velocity, gravity, and dampening
				incrementSimulation(circle);

				// Bounce off the 4 walls
				bounce(circle);

				// Collision for all pairs
				for(j = i+1; j < numCircles; j++){
					collide(circle, circles[j]);
				}

				// Draw each circle
				c.beginPath();
				c.arc(circle.x, circle.y, circle.radius,
				0, 2*Math.PI);
				c.closePath();
				//c.fillStyle = 'black';
				c.fill();
			}
		},
		addGoal: function() {},
		startTurn: function() {},
		endTurn: function() {},
		start: function() {
			//initializeCircles();
			console.log("Match initiated.");
		}
	}
	
	Match = {
		new: makeNewMatch
	};

	return Object.defineProperty(Match, "prototype", {
		value: proto,
		writable: false
	});
});