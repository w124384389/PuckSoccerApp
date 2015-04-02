define(["match", "settings"], function (Match, Settings) {
	var last, dt, now, passed = 0, accumulator = 0, myGame, myMatch, context;

	function makeNewGame() {
		if (myGame == null) {
			myGame = Object.create(proto);
		}
		return myGame;
	}

	function timeStamp() {
		return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
	}

	function animationLoop () {
		window.setTimeout(animationLoop, dt);

		now = timeStamp();
		passed = now - last;
		last = now;
		accumulator += passed;

		while (accumulator >= dt) {
			myGame.update(passed);
			accumulator -= dt;
		}
		
		myGame.draw();
	}

	function assetLoader () {
		console.log("Assets loading...");
		return true;
	}

	var proto = {
		init: function (ctx) {
			context = ctx;
			dt = 1000 / 60;  // constant dt step of 1 frame every 60 seconds
			last = timeStamp();
			// Load all the assets/resources
			if (!assetLoader()) {
				return false;
			}
			// Creates a new match
			myMatch = Match.new();
			if (myMatch == null) {
				return false;
			}
			myMatch.init();
			return true;
		},
		start: function () {
			animationLoop(this);
		},
		update: function (deltaTime) {
			//console.log(deltaTime);
			// Update pucks
			for (var i = 0; i < myMatch.pucks.length; i += 1) {
				// Update movement
				myMatch.pucks[i].move(deltaTime);
				// Bounce off the field
				//myMatch.pucks[i].bounce();
				// Check collisition with all the other pucks
				for (var j = i + 1; j < myMatch.pucks.length; j += 1) {
					myMatch.pucks[i].collide(myMatch.pucks[j]);
				}
			}
			//console.log("Updating...");
		},
		draw: function () {
			// Clean screen
			context.clearRect(0, 0, Settings.gameWidth, Settings.gameHeight);

			// Draw pucks
			for (var i = 0; i < myMatch.pucks.length; i += 1) {
				myMatch.pucks[i].draw(context);
				/*
				context.beginPath();
				context.arc(myMatch.pucks[i].position.x, myMatch.pucks[i].position.y, myMatch.pucks[i].radius, 0, 2*Math.PI);
				context.closePath();
				context.fillStyle = "blue";
				context.fill();*/
			}
			
			//console.log("Drawing...");
		}
	};
	return makeNewGame();		
});