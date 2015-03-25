function createCanvas(w, h){
   var c = document.createElement("canvas");
   c.setAttribute('width', w);
   c.setAttribute('height', h);
   return c;
}

function setupFrameLoop(){
   // shim layer with setTimeout fallback
   window.requestAnimFrame = (function(){
      return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.oRequestAnimationFrame ||
         window.msRequestAnimationFrame ||
         function( callback ){
            window.setTimeout(callback, 1000 / 60);
         };
   })();
}

(function(){
   var canv = document.body.appendChild(createCanvas(800, 480));
   var c = canv.getContext('2d'),
   gravity = 0,
   dampening = 0.92,
   pullStrength = 0.01,
   circles = [],
   numCircles = 10,
   repulsion = 0.2,
   mouseDown = false,
   mouseX, mouseY;

   setupFrameLoop();

   var background = new Image();
   //background.src = "https://mdn.mozillademos.org/files/5397/rhino.jpg";
   background.src = "backGame.jpg";
   
   function initializeCircles(){
      // Initialize the array of circle objects
      for(var i = 0; i < numCircles; i++){
         circles.push({
            x: Math.random() * canv.width,
            y: Math.random() * canv.height,
            // (vx, vy) = Velocity vector
            vx: 0,
            vy: 0,
            radius: 20
         });
      }
   }

   // This function is called 60 times each second
   function executeFrame(){
      // Clean screen
      c.clearRect(0, 0, canv.width, canv.height);
      // Draw the background before everything
      c.drawImage(background,0,0, canv.width, canv.height);

      var i, j, circle;
      for(i = 0; i < numCircles; i++){
         circle = circles[i];

         // Handle velocity, gravity, and dampening
         incrementSimulation(circle);

         // Bounce off the 4 walls
         bounce(circle);

         // Collision for all pairs
         for(j = i+1; j < numCircles; j++){
            collide(circle, circles[j]);
         }

         // Draw each circle
         c.beginPath();
         c.arc(circle.x, circle.y, circle.radius,
         0, 2*Math.PI);
         c.closePath();
         //c.fillStyle = 'black';
         c.fill();
      }

      // Increment mouse interaction (pulling)
      executeInteraction();

      // Schedule the next frame
      requestAnimFrame(executeFrame);
   }

   function incrementSimulation(circle){
      // Increment location by velocity
      circle.x += circle.vx;
      circle.y += circle.vy;

      // Increment Gravity
      circle.vy += gravity;

      // Slow it down
      circle.vy *= dampening;
      circle.vx *= dampening;
   }

   function bounce(circle){
      // bottom
      if(circle.y + circle.radius > canv.height){
         circle.y = canv.height - circle.radius;
         circle.vy = -Math.abs(circle.vy);
      }
      // right
      if(circle.x + circle.radius > canv.width){
         circle.x = canv.width - circle.radius;
         circle.vx = -Math.abs(circle.vx);
      }
      // top
      if(circle.y - circle.radius < 0){
         circle.y = circle.radius;
         circle.vy = Math.abs(circle.vy);
      }
      // left
      if(circle.x - circle.radius < 0){
         circle.x = circle.radius;
         circle.vx = Math.abs(circle.vx);
      }
   }

   // Collides two circles `a` and `b`.
   function collide(a, b){
      // (dx, dy) distance in x and y
      var dx = b.x - a.x,
      dy = b.y - a.y,
      // d = distance from `a` to `b`
      d = Math.sqrt(dx*dx + dy*dy),
      // (ux, uy) = unit vector
      // in the a -> b direction
      ux = dx / d,
      uy = dy / d;

      // If the balls are on top of one another,
      if(d < a.radius + b.radius){
         // then execute a repulsive force to
         // push them apart, which resembles collision.
         a.vx -= ux * repulsion;
         a.vy -= uy * repulsion;
         b.vx += ux * repulsion;
         b.vy += uy * repulsion;
      }
   }

   canv.addEventListener('mousedown', function(e){
      mouseDown = true;
      mouseX = e.pageX;
      mouseY = e.pageY;
   });

   canv.addEventListener('mouseup', function(e){
      mouseDown = false;
   });
   canv.addEventListener('mousemove', function(e){
      mouseX = e.pageX;
      mouseY = e.pageY;
   });

   // Pulls circles toward the mouse when it is down.
   function executeInteraction(){
      var dx, dy, i, circle;
      if(mouseDown){
         for(i = 0; i < numCircles; i++){
            circle = circles[i];
            dx = mouseX - circle.x;
            dy = mouseY - circle.y;
            circle.vx += dx * pullStrength;
            circle.vy += dy * pullStrength;
         }
      }
   }

   initializeCircles();

   // Start animation
   executeFrame();

})();

