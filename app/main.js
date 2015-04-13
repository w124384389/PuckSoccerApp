requirejs.config({
    //baseUrl: "app",
	waitSeconds: 45,
	paths: {
		jquery: "../lib/jquery-2.1.3.min",
		lib: "../lib",
	}
});

requirejs(["structures/game", "jquery", "core/navigation", "settings"], function (Game, $, Navigation, Settings) {
	
	$(function() {		
		var loaded = Navigation.setup($, Settings);
		console.log("Navigation setup" + (loaded ? " " : "NOT ") + "initialized.");
		
		loaded = Game.init(Navigation.getGameFieldCanvas());
		// TODO: add this as a onclick function for the "Play" button
		/*if (loaded) {
			alert("Game initialized.");
			Game.start();
		} else {
			alert("Game NOT initialized.");
		}*/
	});
});

