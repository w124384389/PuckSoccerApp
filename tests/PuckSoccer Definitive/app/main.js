requirejs.config({
    baseUrl: "app",
	waitSeconds: 45,
	paths: {
		jquery: "../lib/jquery-2.1.3.min",
		lib: "../lib",
		image : "../src/image" //alias to plugin
	}
});

requirejs(["game", "jquery", "navigation", "settings", "image!img/background.jpg"], function (Game, $, Navigation, Settings, backgnd) {
	$(function() {
		console.log(backgnd);
		var loaded = Navigation.setup($, Settings);
		console.log("Navigation setup" + (loaded ? " " : "NOT ") + "initialized.");
		
		loaded = Game.init(Navigation.get2DContext());
		//Navigation.get2DContext().drawImage(backgnd, 10, 10);
		if (loaded) {
			console.log("Game initialized.");
			Game.start();
		} else {
			alert("Game NOT initialized.");
		}
	});
});

