define(["settings", "vector2"], function (Settings, Vector2) {
	return (function () {
		function makeNewPuck () {
			var puck = Object.create(proto);

			puck.sprite = 'black';
			puck.position = Vector2(0, 0);
			puck.id = 0;
		}

		proto = {
			draw: function () {
				
			}	
		};

		return makeNewPuck();
	})();
});