define(["navigation"], function (Navigation) {
	return (function () {
		var last, dt, now, passed = 0, accumulator = 0;

		function makeNewGame() {
			var game = Object.create(proto);
			return game;
		}

		function timeStamp() {
			return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
		}

		function animationLoop (game) {
			window.setTimeout(animationLoop, dt, game);

			now = timeStamp();
			passed = now - last;
			last = now;
			accumulator += passed;

			while (accumulator >= dt) {
				game.update(dt);
				accumulator -= dt;
			}
			
			game.draw();
		}

		function assetLoader () {
			console.log("Assets loading...");
			return true;
		}

		proto = {
			init: function ($) {
				Navigation.setup($);
				dt = 1000 / 60;  // constant dt step of 1 frame every 60 seconds
				last = timeStamp();
				// Load all the assets/resources
				return assetLoader();
			},
			start: function () {
				animationLoop(this);
			},
			update: function (deltaTime) {

				//console.log("Updating...");
			},
			draw: function () {
				//console.log("Drawing...");
			}
		};

		return makeNewGame();
	})();
});