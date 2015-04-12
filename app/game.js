define(["engine", "match", "settings", "asset_loader", "navigation"], function (Engine, Match, Settings, AssetLoader, Navigation) {
	var last, dt, now, passed = 0, accumulator = 0, myGame, myMatch, isPlaying = false;

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
		if (!isPlaying) {
			return;
		}

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

	function addGoal (playerId) {
		alert("Goooal! Congratz player " + (playerId+1));
		myMatch.getPlayer(playerId).score += 1;
		Navigation.setScreenText("score_"+playerId, myMatch.getPlayer(playerId).score);

		// Check if the current player get the goals to win
		if (myMatch.getPlayer(playerId).score == Settings.winGoals) {
			alert("It is over! Player " + (playerId+1) + " is the WINNER!");
			isPlaying = false;
		} else {
			myMatch.reset();
			// Reset the goal status in the 'ball' puck
			myMatch.pucks[10].goal = 0;
			myMatch.startTurn(playerId == 0 ? false : true);
		}
	}

	function update (deltaTime) {
		// Update general input
		myMatch.inputUpdate();

		

		// If any goal, then add to the corresponding player and 
		// Else, update all the collisions
		if (myMatch.pucks[10].goal != 0) {
			myMatch.endTurn(false, false);
			addGoal(myMatch.pucks[10].goal-1);
		} else {
			// Check collision withing each puck
			for (var i = 0; i < myMatch.pucks.length; i += 1) {
				for (var j = 0; j < myMatch.pucks.length; j += 1) {
					myMatch.pucks[i].collide(myMatch.pucks[j], deltaTime);
				}
			}
		}
		// Update position of pucks
		for (var i = 0; i < myMatch.pucks.length; i += 1) {
			myMatch.pucks[i].move(deltaTime);
		}
	}

	function draw () {
		// Clean the field canvas
		Navigation.getContext().clearRect(0, 0, Settings.gameWidth, Settings.gameHeight);


		// Draw the field and the pucks
		drawField();
	}

	function drawField () {
		Navigation.getContext().drawImage(AssetLoader.imgs["field_bg"], Settings.fieldOffsetX, Settings.fieldOffsetY, Settings.fieldWidth, Settings.fieldHeight);
		
		// Draw the ball
		myMatch.pucks[10].draw(Navigation.getContext());

		// Draw the selected puck
		myMatch.drawSelectedPuck(Navigation.getContext());
		
		// Draw the pucks
		for (var i = 0; i < myMatch.pucks.length - 1; i += 1) {
			myMatch.pucks[i].draw(Navigation.getContext());
		}
	}

	var proto = {
		init: function (canvas) {
			//dt = 1000 / 60;  // constant dt step of 1 frame every 60 seconds
			//last = timeStamp();
			// Creates a new match
			myMatch = Match.new();
			myMatch.init(canvas);
			Navigation.init(this);
			Engine.init(update, draw);
			return true;
		},
		start: function () {
			Engine.play();

			Navigation.changeScreen(Navigation.ScreenId.ingame);
			myMatch.start(true);

			// Reset the scores to zero
			Navigation.setScreenText("score_0", 0);
			Navigation.setScreenText("score_1", 0);

			isPlaying = true;

			//animationLoop(this);
		},
		stop: function () {
			isPlaying = false;
		}
	};
	return makeNewGame();		
});