define(["asset_loader", "settings"], function (AssetLoader, Settings) {
	var myNavigation, canvas, el, canvasGameField, fieldContext, context;

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
			context = canvas.getContext("2d");
			fieldContext = canvasGameField.getContext("2d");

			// Setup button clicks
			//console.log($(".play").click());

			/*
			var b = newButton("New Game");
			b.insertAfter(el);//*/
			return true;
		},
		init: function (Game) {
			var that = this;
			$("#play").click(function() {
				Game.start();
			});
			$("#credit").click(function() {
				that.creditsMenu();
			});
			this.mainMenu();
		},
		getGameFieldCanvas: function () {
			return canvasGameField;
		},
		mainMenu: function () {
			$('#credits').hide();
			$('#ingame').hide();
			$('#addPlayers').hide();
			$('#main').show();
		},
		creditsMenu: function () {
			$('#ingame').hide();
			$('#main').hide();
			$('#addPlayers').hide();
			$('#credits').show();
		},
		addPlayersMenu: function () {
			$('#credits').hide();
			$('#ingame').hide();
			$('#main').hide();
			$('#addPlayers').show();
		},
		ingameMenu: function () {
			$('#credits').hide();
			$('#main').hide();
			$('#addPlayers').hide();
			$('#ingame').show();
			context.drawImage(AssetLoader.imgs["menu_bg"], 0, 0, Settings.gameWidth, Settings.gameHeight);
		},
		getContext: function () {
			return fieldContext;
		}
	};

	return makeNewInterface();
});