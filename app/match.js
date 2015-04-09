define(["puck", "vector2", "settings", "player", "formation"], function (Puck, Vector2, Settings, Player, Formation) {
	
	var players = [], mouseDown = false, mouseUp = false, mouseX, mouseY, canv, puckSelected = -1;

	function makeNewMatch() {
		var match = Object.create(proto);
		return match;
	}
	
	var proto = {
		"pucks": [],
		init: function(canvas) {
			Formation.init(Settings.fieldWidth/2.0, Settings.fieldHeight);
			var i;
			// Load pucks for Player1
			for (i = 0; i < 5; i += 1) {
				this.pucks.push(Puck.new(i));
				//this.pucks[i].velocity.x = 2.5;
				this.pucks[i].position = Formation.getFormation("202-a", true)[i];
			}
			// Load pucks for Player2
			for (i = 5; i < 10; i += 1) {
				this.pucks.push(Puck.new(i));
				//this.pucks[i].velocity.x = 2.5;
				this.pucks[i].position = Formation.getFormation("202-a", false)[i-5];
			}
			// Creates the ball
			this.pucks.push(Puck.new(-1));
			this.pucks[10].position = Vector2.new(Settings.fieldWidth/2 - this.pucks[10].getCenterX(), Settings.fieldHeight/2 - this.pucks[10].getCenterY());

			// Create Players
			players.push(Player.new());
			players.push(Player.new());

			// Create input state
			canvas.addEventListener("mousedown", function (e) {
				mouseDown = true;
				mouseUp = false;
				mouseX = e.pageX;
				mouseY = e.pageY;
			});
			canvas.addEventListener("mouseup", function (e) {
				mouseDown = false;
				mouseUp = true;
			});
			canvas.addEventListener("mousemove", function (e) {
				mouseX = e.pageX;
				mouseY = e.pageY;
			});

			console.log("Current match initialized.");
		},
		inputUpdate: function (deltaTime) {
			if (mouseDown) {
				var i;
				puckSelected = -1;
				for (i = 0; i < 10; i += 1) {
					// Check if hit one puck
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
		getPlayer: function (id) {
			return players[id];
		}
	};

	return {
		new: makeNewMatch
	};
});