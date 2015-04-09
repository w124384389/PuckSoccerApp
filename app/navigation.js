define(function () {
	var myNavigation, canvas, el, canvasGameField;

	function makeNewInterface() {
		if (myNavigation == null) {
			myNavigation = Object.create(proto);
		}
		return myNavigation;
	}

	function newButton (str) {
		return $('<input>').attr('type', 'button').attr('value', str);
	}

	var proto = {
		setup: function ($, Settings) {
			canvas = document.getElementById("canvas");
			canvas.width = Settings.gameWidth;
			canvas.height = Settings.gameHeight;

			canvasGameField = document.getElementById("game_field");
			canvasGameField.width = Settings.fieldWidth;
			canvasGameField.height = Settings.fieldHeight;

			el = $("canvas");

			// Setup button clicks
			console.log($(".play").click());
			/*
			$(".play").click(function() {
				//$('#main').hide();
				console.log("f");
			});*/

			this.mainMenu();

			/*
			var b = newButton("New Game");
			b.insertAfter(el);*/
			return true;
		},
		getGameFieldCanvas: function () {
			return canvasGameField;
		},
		mainMenu: function () {
			//$('#ingame').hide();
			//$('#main').show();
			$('#main').hide();
			//$('#game_field').hide();
		}
	};

	return makeNewInterface();
});