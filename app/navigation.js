define(["asset_loader", "settings"], function (AssetLoader, Settings) {
	
	var ScreenId = {
		main: 0,
		credits: 1,
		addPlayers: 2,
		ingame: 3
	};

	var myNavigation, canvas, el, canvasGameField, fieldContext, context,
		lastScreen = ScreenId.Main, currentScreen = ScreenId.Main;

	function makeNewInterface() {
		if (myNavigation == null) {
			myNavigation = Object.create(proto);
			myNavigation.ScreenId = ScreenId;
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
			context = canvas.getContext("2d");
			fieldContext = canvasGameField.getContext("2d");
			this.changeScreen(ScreenId.main);

			return true;
		},
		init: function (Game) {
			// Defines all the buttons of the game, according to its behavior
			var that = this;
			$("#play").click(function() {
				Game.start();
			});
			$("#credit").click(function() {
				that.changeScreen(ScreenId.credits);
			});
			$("#back_main").click(function() {
				that.changeScreen(ScreenId.main);
			});
		},
		getGameFieldCanvas: function () {
			return canvasGameField;
		},
		changeScreen: function (nextScreen) {
			for (var i = 0; i < Object.getOwnPropertyNames(ScreenId).length; i += 1) {
				$("#" + Object.getOwnPropertyNames(ScreenId)[i]).hide();
			}
			$("#" + Object.getOwnPropertyNames(ScreenId)[nextScreen]).show();
		},
		getContext: function () {
			return fieldContext;
		},
		setScreenText: function (type, value) {
			console.log(type);
			$("#"+type).text(value);
		}
	};

	return makeNewInterface();
});