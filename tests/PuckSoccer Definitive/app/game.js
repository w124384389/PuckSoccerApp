define(["match", "settings"], function (Match, Settings) {
	var last, dt, now, passed = 0, accumulator = 0, myGame, myMatch, context, background;

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
		/*
		accumulator += passed;
		while (accumulator >= dt) {
			myGame.update(passed);
			accumulator -= dt;
		}*/
		myGame.update(dt);
		
		myGame.draw();
	}
	
	function assetLoader () {
		background = new Image();
		background.src = "app/img/background2.jpg";	
		console.log("Assets loading...");
		return true;
	}

	var proto = {
		init: function (canvas) {
			context = canvas.getContext("2d");
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
			myMatch.init(canvas);
			return true;
		},
		start: function () {
			animationLoop(this);
		},
		update: function (deltaTime) {
			// Update pucks
			for (var i = 0; i < myMatch.pucks.length; i += 1) {
				// Bounce off the field
				myMatch.pucks[i].bounce();
				// Update movement
				myMatch.pucks[i].move(deltaTime);
				// Check collisition with all the other pucks
				for (var j = i + 1; j < myMatch.pucks.length; j += 1) {
					myMatch.pucks[i].collide(myMatch.pucks[j]);
				}
			}

			// Update general input
			myMatch.inputUpdate();
		},
		draw: function () {
			// Clean screen
			context.clearRect(0, 0, Settings.gameWidth, Settings.gameHeight);
			this.drawBackground();
			//Navigation.drawBackground();
			// Draw pucks
			for (var i = 0; i < myMatch.pucks.length; i += 1) {
				myMatch.pucks[i].draw(context);
			}
		},
		drawBackground: function () {
			context.drawImage(background, 0, 0, Settings.fieldWidth, Settings.fieldHeight);
		}
	};
	return makeNewGame();		
});