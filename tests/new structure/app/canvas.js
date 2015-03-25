define (["config"], function (config) {  
	var canvas = document.getElementById('canvas');
	canvas.width = config.gameWidth;
	canvas.height = config.gameHeight;

	return canvas;
});