define(["settings"], function (Settings) {
	return (function () {
		var canvas, el;

		function makeNewInterface() {
			return Object.create(proto);
		}

		function newButton (str) {
			return $('<input>').attr('type', 'button').attr('value', str);
		}

		proto = {
			setup: function($) {
				canvas = document.getElementById("canvas");
				canvas.width = Settings.gameWidth;
				canvas.height = Settings.gameHeight;
				el = $("#main canvas");
				console.log($);
				var b = newButton("New Game");
				b.insertAfter(el);
			}
		};

		/*

		function newButton: function (str) {
			return $('<input>').attr('type', 'button').attr('value', str);
		}

		proto = {
			setup: function ($) {
				console.log("foi");
				canvas = document.getElementById("canvas");
				canvas.width = Settings.gameWidth;
				canvas.height = Settings.gameHeight;
				el = $("#main canvas");
				console.log(el);
				var b = newButton("New Game");
				b.insertAfter(el);
				console.log(b);
			}
		};

		return makeNewInterface();*/
		return makeNewInterface();
	})();
});