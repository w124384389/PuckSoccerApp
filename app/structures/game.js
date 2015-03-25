define(function () {
	var Game, context, canvas, window, el, background,
		mouseDown = false,
		mouseX, mouseY;

	function makeNewGame(wdw) {
		var game = Object.create(proto2);
		game.match = {};
		
		window = wdw;
		canvas = window.document.body.appendChild(createCanvas(Settings.SCREEN_WIDTH, Settings.SCREEN_HEIGHT));
		context = canvas.getContext('2d');
		return game;
	}

	function createCanvas(w, h){
		var c = window.document.createElement("canvas");
		c.setAttribute('width', w);
		c.setAttribute('height', h);
		return c;
	}

	function setupFrameLoop (){
		// shim layer with setTimeout fallback
		window.requestAnimFrame = (function(){
			return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function( callback ){
				window.setTimeout(callback, Settings.BASE_FRAME_RATE / Settings.BASE_MILI);
			};
		})();
	}

	function executeFrame(){
		// Clean screen
		context.clearRect(0, 0, canvas.width, canvas.height);
		// Draw the background before everything
		context.drawImage(background, 0, 0, canvas.width, canvas.height);
		
		//match.update(context);
		
		// Schedule the next frame
		requestAnimFrame(executeFrame);
	}

	proto2 = {
		init: function() {
			//el = $($("#main ul"));
						
			setupFrameLoop();
			// Load the resource for the background
			background = new Image();
			//background.src = "https://mdn.mozillademos.org/files/5397/rhino.jpg";
			background.src = "./app/img/800_500/backGame.jpg";

			console.log("Game initialized.");
		},
		playMatch: function() {
			// Start animation
			executeFrame();
		}
	}

	Game = {
		new: makeNewGame
	};

	return Object.defineProperty(Game, "prototype", {
		value: proto2,
		writable: false
	});
});