define (function () {

	var myLoader, assetsLoaded, numImgs;

	function makeNewAssetLoader () {
		if (myLoader == null) {
			myLoader = Object.create(proto);
			myLoader.init();
		}
		return myLoader;
	}

	function assetLoaded(dic, name) {
		// don't count assets that have already loaded
		if (myLoader[dic][name].status !== "loading" ) {
			return;
		}
		myLoader[dic][name].status = "loaded";
		assetsLoaded += 1;
		// finished callback
		if (assetsLoaded == myLoader.totalAssets) {
			console.log("foi");
		}
	}

	var proto = {
		"imgs": {
			"bg"			: "app/img/background.jpg",
			"p1"			: "app/img/puck_blue.png",
			"p2"			: "app/img/puck_red.png",
			"ball"			: "app/img/puck_ball.png",
			"menu_bg"		: "app/img/menu_bg.png",
		},
		"totalAssest": numImgs,
		init: function () {
			assetsLoaded = 0;
			numImgs = Object.keys(this.imgs).length;

			var _this = this, src;
			// load images
			for (var img in this.imgs) {
				if (this.imgs.hasOwnProperty(img)) {
					console.log("Loading " + img);
					src = this.imgs[img];
					// create a closure for event binding
					(function (_this, img) {
						_this.imgs[img] = new Image();
						_this.imgs[img].status = "loading";
						_this.imgs[img].name = img;
						_this.imgs[img].onload = function () {
							assetLoaded.call(_this, "imgs", img)
						};
						_this.imgs[img].src = src;
					})(_this, img);
				}
			}
		}
	};
	return makeNewAssetLoader();
});