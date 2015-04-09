define(["match", "settings", "asset_loader"], function (Match, Settings, AssetLoader) {
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

	var proto = {
		init: function (canvas) {
			context = canvas.getContext("2d");
			dt = 1000 / 60;  // constant dt step of 1 frame every 60 seconds
			last = timeStamp();
			// Creates a new match
			myMatch = Match.new();
			myMatch.init(canvas);
			return true;
		},
		start: function () {
			animationLoop(this);
		},
		update: function (deltaTime) {
			// Update general input
			myMatch.inputUpdate();

			// Update position of pucks
			for (var i = 0; i < myMatch.pucks.length; i += 1) {
				myMatch.pucks[i].move(deltaTime);
			}
			
			// Check collisition with all the other pucks
			for (var i = 0; i < myMatch.pucks.length; i += 1) {
				for (var j = 0; j < myMatch.pucks.length; j += 1) {
					myMatch.pucks[i].collide(myMatch.pucks[j]);
				}
			}
		},
		draw: function () {
			// Clean screen
			context.clearRect(0, 0, Settings.gameWidth, Settings.gameHeight);
			this.drawBackground();
			// Draw pucks
			for (var i = 0; i < myMatch.pucks.length; i += 1) {
				myMatch.pucks[i].draw(context);
			}
		},
		drawBackground: function () {
			//context.drawImage(background, 0, 0, Settings.fieldWidth, Settings.fieldHeight);
			context.drawImage(AssetLoader.imgs["bg"], 0, 0, Settings.fieldWidth, Settings.fieldHeight);
		}
	};
	return makeNewGame();		
});