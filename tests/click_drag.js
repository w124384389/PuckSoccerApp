function createCanvas(w, h){
   var c = document.createElement("canvas");
   c.setAttribute('width', w);
   c.setAttribute('height', h);
   return c;
}

function init() {

}

(function(){
	// System variables
	var canv = document.body.appendChild(createCanvas(800, 500)),
	c = canv.getContext('2d');

	// Game variables
	var gravity = 0,
	dampening = 0.92,
	pullStrength = 0.01,
	circles = [],
	numCircles = 10,
	repulsion = 0.2,
	mouseDown = false,
	mouseX, mouseY;

	// Game initialization and looping
	init();
	update();
	finish();
})();