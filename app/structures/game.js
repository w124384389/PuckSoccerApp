define(["core/engine", "structures/match", "settings", "core/asset_loader", "core/navigation"], function (Engine, Match, Settings, AssetLoader, Navigation) {
	
	var myGame, myMatch, isPlaying = false, puck = {};

	function makeNewGame() {
		if (myGame == null) {
			myGame = Object.create(proto);
		}
		return myGame;
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
			myMatch.startTurn(playerId == 0);
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
		Navigation.setTimer(myMatch.getTimer());
		// Clean the field canvas
		Navigation.getContext().clearRect(0, 0, Settings.gameWidth, Settings.gameHeight);
		// Draw the field and the pucks
		drawField();
	}

	function drawField () {
		// Draw the background field
		Navigation.getContext().drawImage(AssetLoader.imgs["field_bg"], Settings.fieldOffsetX, Settings.fieldOffsetY, Settings.fieldWidth, Settings.fieldHeight);
		
		// Draw the ball
		myMatch.pucks[10].draw(Navigation.getContext());

		// Draw the selected puck
		myMatch.drawSelectedPuck(Navigation.getContext());
		
		// Draw the pucks
		for (var i = 0; i < myMatch.pucks.length - 1; i += 1) {
			puck = myMatch.pucks[i];
			
			// Draw the selected effect below the current player pucks
			if (!myMatch.getInputPaused() &&
				(puck.id < 5 && myMatch.getCurrentPlayerId() == 0 || puck.id >= 5 && myMatch.getCurrentPlayerId() == 1)) {
				Navigation.getContext().drawImage(AssetLoader.imgs["selected"], puck.position.x - 10, puck.position.y - 10,
					puck.size.x + 20, puck.size.y + 20);
			}

			puck.draw(Navigation.getContext());
		}

		// Draw the goals
		Navigation.getContext().drawImage(AssetLoader.imgs["goals"], Settings.fieldOffsetX, Settings.fieldOffsetY, Settings.fieldWidth, Settings.fieldHeight);

		/*// Helper for the goal posts collider
		Navigation.getContext().fillStyle = "black";
		Navigation.getContext().fillRect(Settings.fieldOffsetX, Settings.getGoalY(), Settings.getGoalWidth(), Settings.getGoalHeight());*/
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