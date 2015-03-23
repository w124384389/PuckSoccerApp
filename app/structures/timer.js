function makeNewTimer() {
	var timer = Object.create(proto);
	
	timer.current = 0;
	timer.active = false;

	return timer;
}

proto = {
	delay: function(f, milli) {
		var args = arguments;
		setTimeout(function() {
			f.apply(this, args);
		}, milli);
		return;
  	},
  	throttle: function(f, interval) {
		var available = true;
		// function "wait" used in setTimeout
		function wait() { available = true; };
		if (available) {
			available = false;
			setTimeout(wait, interval);
			f.apply(this, arguments);
		}
  	},
  	
}