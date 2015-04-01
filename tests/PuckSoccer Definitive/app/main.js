requirejs.config({
    baseUrl: "app",
	paths: {
		jquery: "../lib/jquery-2.1.3.min",
		lib: "../lib"
	},
	waitSeconds: 15
});

requirejs(["jquery", "game"], function ($, Game) {
	$(function() {
		console.log("Page loaded!");
		if (Game.init($)) {
			console.log("Game initialized.");
			Game.start();
		} else {
			alert("Problem initializing game.");
		}
	});
});

