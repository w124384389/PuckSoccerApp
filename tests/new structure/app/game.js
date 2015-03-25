define (["canvas", "config"], function (canvas, config) {
	var ctx = canvas.getContext('2d');
	ctx.font = "12px Arial";
	ctx.fillStyle = "red";
	ctx.fillRect(config.gameWidth / 2, config.gameHeight / 2, 20, 20);
	console.log(ctx);
	ctx.fillText(config.playerName, config.gameWidth / 2, config.gameHeight / 2);
});