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
			$(".play").click(function() {
				//$('#main').hide();
				console.log("f");
			});*/

			///*
			var b = newButton("New Game");
			b.insertAfter(el);//*/
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
		},
		ingameMenu: function () {
			context.drawImage(AssetLoader.imgs["menu_bg"], 0, 0, Settings.gameWidth, Settings.gameHeight);
		},
		getContext: function () {
			return fieldContext;
		}
	};

	return makeNewInterface();
});