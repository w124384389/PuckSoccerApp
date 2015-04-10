define(["match", "settings", "asset_loader", "navigation"], function (Match, Settings, AssetLoader, Navigation) {
	var last, dt, now, passed = 0, accumulator = 0, myGame, myMatch;

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
			dt = 1000 / 60;  // constant dt step of 1 frame every 60 seconds
			last = timeStamp();
			// Creates a new match
			myMatch = Match.new();
			myMatch.init(canvas);
			Navigation.init(this);
			return true;
		},
		start: function () {
			Navigation.ingameMenu();
			myMatch.start(true);
			animationLoop(this);
		},
		update: function (deltaTime) {
			// Update general input
			myMatch.inputUpdate();

			// Update position of pucks
			for (var i = 0; i < myMatch.pucks.length; i += 1) {
				myMatch.pucks[i].move(deltaTime);
			}

			// If any goal, then add to the corresponding player and 
			// Else, update all the collisions
			if (myMatch.pucks[10].goal != 0) {
				myMatch.endTurn(false, false);
				this.addGoal(myMatch.pucks[10].goal-1);
			} else {
				// Check collision withing each puck
				for (var i = 0; i < myMatch.pucks.length; i += 1) {
					for (var j = 0; j < myMatch.pucks.length; j += 1) {
						myMatch.pucks[i].collide(myMatch.pucks[j]);
					}
				}
			}
		},
		draw: function () {
			// Draw the field and the pucks
			this.drawField();
		},
		drawField: function () {
			// Clean the field canvas
			Navigation.getContext().clearRect(Settings.fieldOffsetX, Settings.fieldOffsetY, Settings.fieldWidth, Settings.fieldHeight);
			
			Navigation.getContext().drawImage(AssetLoader.imgs["field_bg"], 0, 0, Settings.fieldWidth, Settings.fieldHeight);
			
			// Draw the selected puck
			myMatch.drawSelectedPuck(Navigation.getContext());

			for (var i = 0; i < myMatch.pucks.length; i += 1) {
				myMatch.pucks[i].draw(Navigation.getContext());
			}
		},
		addGoal: function (playerId) {
			alert("Goooal! Congratz player " + (playerId+1));
			myMatch.getPlayer(playerId).score += 1;
			console.log(myMatch.getPlayer(playerId).score);
			myMatch.reset();
			myMatch.pucks[10].goal = 0;
			myMatch.startTurn(playerId == 0 ? false : true);
		}
	};
	return makeNewGame();		
});