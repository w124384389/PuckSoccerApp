/* global $ */
/* global document */
define([ "core/asset_loader", "settings" ], function (AssetLoader, Settings) {
	var i, proto, ScreenId, myNavigation, canvas, el, canvasGameField, fieldContext, context,
		lastScreen = ScreenId.Main, currentScreen = ScreenId.Main;
	ScreenId = {
		main: 0,
		credits: 1,
		addPlayers: 2,
		ingame: 3
	};

	function makeNewInterface() {
		if (myNavigation == null) {
			myNavigation = Object.create(proto);
			myNavigation.ScreenId = ScreenId;
		}
		return myNavigation;
	}

	function newButton(str) {
		return $("<input>").attr("type", "button").attr("value", str);
	}

	proto = {
		setup: function ($, Settings) {
			canvas = document.getElementById("canvas");
			canvas.width = Settings.gameWidth;
			canvas.height = Settings.gameHeight;

			el = $("canvas");
			context = canvas.getContext("2d");
			$("#menu").attr("class", "");
			$("#canvas").attr("class", "");

			// Set the background in the
			this.changeScreen(ScreenId.main);

			return true;
		},
		init: function (Game) {
			// Defines all the buttons of the game, according to its behavior
			var that = this;
			$("#play_btn").click(function() {
				$(".profile0").attr("src", $(AssetLoader.imgs[ "profile0" ]).attr("src"));
				$(".profile1").attr("src", $(AssetLoader.imgs[ "profile0" ]).attr("src"));
				that.changeScreen(ScreenId.addPlayers);
			});
			$("#start_btn").click(function() {
				$("#name0").html($(".name0").val());
				$("#name1").html($(".name1").val());
				Game.start();
			});
			$("#credits_btn").click(function() {
				that.changeScreen(ScreenId.credits);
			});
			$(".back_main_btn").click(function() {
				that.changeScreen(ScreenId.main);
			});
			$("#score_0").click(function() {
				console.log("score 0");
			});
		},
		getGameFieldCanvas: function () {
			return canvas;
		},
		changeScreen: function (nextScreen) {
			for (i = 0; i < Object.getOwnPropertyNames(ScreenId).length; i += 1) {
				$("#" + Object.getOwnPropertyNames(ScreenId)[ i ]).hide();
			}
			$("#" + Object.getOwnPropertyNames(ScreenId)[ nextScreen ]).show();
		},
		getContext: function () {
			return context;
		},
		setScreenText: function (type, value) {
			console.log(type);
			$("#" + type).text(value);
		},
		setTimer: function (value) {
			$("#timer0").html(value);
		}
	};

	return makeNewInterface();
});
