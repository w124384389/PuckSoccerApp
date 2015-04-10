define(["puck", "vector2", "settings", "player", "formation", "ball", "asset_loader"], function (Puck, Vector2, Settings, Player, Formation, Ball, AssetLoader) {
	
	var players = [], mouseDown = false, mouseUp = false, mouseX, mouseY, canv,
		playerOneTurn = true, turnTimer,
		minIndex = 0, maxIndex = 10,
		puckSelected = -1, selectedPos = Vector2.new(), selectedSize = 0;

	function makeNewMatch () {
		var match = Object.create(proto);
		match.distanceSelected = Vector2.new();
		return match;
	}
	
	var proto = {
		"pucks": [],
		start: function (playerOne) {
			this.startTurn(playerOne);
		},
		endTurn: function (changePlayer, loop) {
			puckSelected = -1;
			mouseDown = false;
			mouseUp = true;
			clearInterval(turnTimer);
			//console.log("player " + (playerOneTurn?"one":"two") + " end turn");
			if (loop){
				this.startTurn(changePlayer ? !playerOneTurn : playerOneTurn);
			}
		},
		startTurn: function (playerOne) {
			var i = 0, that = this;
			playerOneTurn = playerOne;
			turnTimer = setInterval((function() {
				return function () {
					// Check if the turn time is over for the current playing player
					if (i >= Settings.turnCooldown) {
						that.endTurn(true, true);
					}
					console.log("player " + (playerOneTurn?"one":"two") + " is playing");
					i += 1;
				}
			}()), 1000);
		},
		init: function(canvas) {
			Formation.init(Settings.fieldWidth/2.0, Settings.fieldHeight);
			var i, that = this;
			// Creates pucks for Player1
			for (i = 0; i < 5; i += 1) {
				this.pucks.push(Puck.new(i));
			}
			// Creates pucks for Player2
			for (i = 5; i < 10; i += 1) {
				this.pucks.push(Puck.new(i));
			}
			// Creates the ball
			this.pucks.push(Ball.new(11));

			// Create Players
			players.push(Player.new("211-a"));
			players.push(Player.new("202-a"));

			// Positions the game elements
			this.reset();

			// Create input state
			canvas.addEventListener("mousedown", function (e) {
				mouseDown = true;
				mouseUp = false;
				mouseX = e.pageX - Settings.fieldOffsetX;
				mouseY = e.pageY - Settings.fieldOffsetY;
			});
			canvas.addEventListener("mouseup", function (e) {
				mouseDown = false;
				mouseUp = true;
			});
			canvas.addEventListener("mousemove", function (e) {
				mouseX = e.pageX - Settings.fieldOffsetX;
				mouseY = e.pageY - Settings.fieldOffsetY;
				// Get the distance vector if selected puck
				if (puckSelected != -1) {
					that.distanceSelected.x = that.pucks[puckSelected].getCenterX() - mouseX;
					that.distanceSelected.y = that.pucks[puckSelected].getCenterY() - mouseY;
				}
			});

			console.log("Current match initialized.");
		},
		inputUpdate: function (deltaTime) {
			if (mouseDown) {
				puckSelected = -1;
				
				// Check which player is playing
				if (!Settings.godMode) {
					minIndex = playerOneTurn ? 0 : 5;
					maxIndex = playerOneTurn ? 5 : 10;
				}

				for (i = minIndex; i < maxIndex; i += 1) {
					// Check if the corresponding player hit one puck
					if (Vector2.new(this.pucks[i].getCenterX() - mouseX, this.pucks[i].getCenterY() - mouseY).magnitude() < this.pucks[i].radius + this.pucks[10].radius) {
						puckSelected = i;
						mouseDown = false;
						this.distanceSelected.x = this.pucks[puckSelected].getCenterX() - mouseX;
						this.distanceSelected.y = this.pucks[puckSelected].getCenterY() - mouseY;
						// Draw the 
						break;
					}
				}
			} else if (mouseUp && puckSelected != -1) {
				this.pucks[puckSelected].velocity =
					Vector2.new(this.pucks[puckSelected].getCenterX() - mouseX, this.pucks[puckSelected].getCenterY() - mouseY).
					multiplyMe(Settings.pullStrength);
				puckSelected = -1;
				this.endTurn(true, true);
			}
		},
		getSelectedPuck: function () {
			return puckSelected != -1 ? this.pucks[puckSelected] : null;
		},
		reset: function () {
			// Positions Player1 pucks
			for (i = 0; i < 5; i += 1) {
				this.pucks[i].velocity = Vector2.new();
				this.pucks[i].position = Formation.getFormation(this.getPlayer(0).formation, true)[i];
			}
			// Positions Player2 pucks
			for (i = 5; i < 10; i += 1) {
				this.pucks[i].velocity = Vector2.new();
				this.pucks[i].position = Formation.getFormation(this.getPlayer(1).formation, false)[i-5];
			}
			// Positions the ball
			this.pucks[10].velocity = Vector2.new();
			this.pucks[10].position = Vector2.new(Settings.fieldWidth/2 - this.pucks[10].radius, Settings.fieldHeight/2 - this.pucks[10].radius);

		},
		getPlayer: function (id) {
			return players[id];
		},
		drawSelectedPuck: function (context) {
			if (this.getSelectedPuck() != null) {
				selectedSize = (this.getSelectedPuck().radius + 30) * this.distanceSelected.magnitude()/this.getSelectedPuck().radius;
				selectedPos.x = this.getSelectedPuck().getCenterX() - selectedSize/2;
				selectedPos.y = this.getSelectedPuck().getCenterY() - selectedSize/2;
				context.drawImage(AssetLoader.imgs["dir_circle"], selectedPos.x, selectedPos.y, selectedSize, selectedSize);
			}
		}
	};

	return {
		new: makeNewMatch
	};
});