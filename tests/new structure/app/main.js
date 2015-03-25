requirejs.config({
    baseUrl: "app",
	paths: {
		"jquery": "../lib/jquery",
		"lib": "../lib"
	},
	waitSeconds: 15
});

requirejs(["game"], function (Game) {
	console.log("initiated");
});

