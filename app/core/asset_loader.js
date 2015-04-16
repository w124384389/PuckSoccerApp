/* global Audio */
/* global Image */
define(function() {
var proto, myLoader, assetsLoaded, numImgs, numAudios, audio, img;

function makeNewAssetLoader() {
	if (myLoader == null) {
		myLoader = Object.create(proto);
		myLoader.init();
	}
	return myLoader;
}

function assetLoaded(dic, name) {
	// don't count assets that have already loaded
	if (myLoader[ dic ][ name ].status !== "loading") {
		return;
	}
	myLoader[ dic ][ name ].status = "loaded";
	console.log("Loaded " + name);
	assetsLoaded += 1;
	// finished callback
	if (assetsLoaded === myLoader.totalAssets) {
		console.log("foi");
	}
}

proto = {
	imgs: {
		"field_bg": "app/img/field_bg.jpg",
		"goals": "app/img/goals.png",
		// "goal_post"		: "app/img/goal_post.png",
		"selected": "app/img/selected.png",
		"p1": "app/img/sprites/brazil.png",
		"p2": "app/img/sprites/china.png",
		"ball": "app/img/sprites/puck_ball.png",
		"menu_bg": "app/img/menu_bg.jpg",
		"selected": "app/img/selected.png",
		"dir_circle": "app/img/direction_circle.png",
		"profile0": "app/img/profiles/profile0.jpg"
	},
	audios: {
		"puck_whoosh": "app/audio/puck_whoosh.ogg",
		"puck_hit": "app/audio/puck_hit.ogg",
		"ball_hit": "app/audio/ball_hit.ogg",
		"goal": "app/audio/goal.ogg",
		"match_start": "app/audio/match_start.ogg",
		"match_end": "app/audio/match_end.ogg",
		"crowd": "app/audio/crowd.ogg",
		"main_theme": "app/audio/main_theme.ogg"
	},
	totalAssest: numImgs + numAudios,
	init: function () {
		assetsLoaded = 0;
		numImgs = Object.keys(this.imgs).length;
		numAudios = Object.keys(this.audios).length;

		var _this = this, src;
		// load images
		for (img in this.imgs) {
			if (this.imgs.hasOwnProperty(img)) {
				// console.log("Loading " + img);
				src = this.imgs[ img ];
				// create a closure for event binding
				(function (_this, img) {
					_this.imgs[ img ] = new Image();
					_this.imgs[ img ].status = "loading";
					_this.imgs[ img ].name = img;
					_this.imgs[ img ].onload = function () {
						assetLoaded.call(_this, "imgs", img);
					};
					_this.imgs[ img ].src = src;
				})(_this, img);
			}
		}

		// load audios
		for (audio in this.audios) {
			if (this.audios.hasOwnProperty(audio)) {
				// console.log("Loading " + audio);
				src = this.audios[ audio ];
				// create a closure for event binding
				(function (_this, audio) {
					_this.audios[ audio ] = new Audio();
					_this.audios[ audio ].status = "loading";
					_this.audios[ audio ].name = audio;
					_this.audios[ audio ].addEventListener("canplaythrough", function () {
						assetLoaded.call(_this, "audios", audio);
					});
					_this.audios[ audio ].src = src;
				})(_this, audio);
			}
		}
	}
};
return makeNewAssetLoader();
});
