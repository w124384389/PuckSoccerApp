requirejs.config({
    //baseUrl: "app",
	waitSeconds: 45,
	paths: {
		jquery: "../lib/jquery-2.1.3.min",
		lib: "../lib",
	}
});

requirejs(["game", "jquery", "navigation", "settings"], function (Game, $, Navigation, Settings) {
	
	$(function() {		
		var loaded = Navigation.setup($, Settings);
		console.log("Navigation setup" + (loaded ? " " : "NOT ") + "initialized.");
		
		loaded = Game.init(Navigation.getGameFieldCanvas());
		if (loaded) {
			console.log("Game initialized.");
			Game.start();
		} else {
			alert("Game NOT initialized.");
		}
	});
});

