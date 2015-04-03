define(function () {
	var myNavigation, canvas, el;

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
			el = $("#main canvas");
			//console.log($);
			var b = newButton("New Game");
			b.insertAfter(el);
			return true;
		},
		get2DContext: function () {
			return canvas.getContext("2d");
		}
	};

	return makeNewInterface();

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
	};*/
});