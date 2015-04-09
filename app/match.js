define(["puck", "vector2", "settings", "player", "formation", "ball"], function (Puck, Vector2, Settings, Player, Formation, Ball) {
	
	var players = [], mouseDown = false, mouseUp = false, mouseX, mouseY, canv, puckSelected = -1, playerOneTurn = true,
		minIndex = 0, maxIndex = 10;

	function makeNewMatch() {
		var match = Object.create(proto);
		return match;
	}
	
	var proto = {
		"pucks": [],
		init: function(canvas) {
			Formation.init(Settings.fieldWidth/2.0, Settings.fieldHeight);
			var i;
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
						break;
					}
				}
			} else if (puckSelected != -1 && mouseUp) {
				this.pucks[puckSelected].velocity =
					Vector2.new(this.pucks[puckSelected].getCenterX() - mouseX, this.pucks[puckSelected].getCenterY() - mouseY).
					multiplyMe(Settings.pullStrength);
				puckSelected = -1;
			}
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
		}
	};

	return {
		new: makeNewMatch
	};
});