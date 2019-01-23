/**
 * Setup the canvas element
 */
function setup()
{
  canvas_wrapper = document.querySelector('header.splash');
  dpr = (window.devicePixelRatio || 1);
  w = canvas_wrapper.offsetWidth;
  h = canvas_wrapper.offsetHeight;
  start = Date.now();
  circles.setup(w, h);
  size = 40;
  canvas_wrapper.innerHTML += '<canvas id="board" style="position: absolute; top: 0; left: 0;" width="' + (w*dpr) + '" height="'+(h*dpr)+'"></canvas>';  
  var canvas = document.getElementById('board');
	c = canvas.getContext('2d');

  index = 0;
  window.requestAnimationFrame(render);
}


var render = function()
{
  var y = window.scrollY;
  var height = canvas_wrapper.offsetHeight;
  var pc = (y / height);
  pc *= (2-pc);
  var time = Date.now() - start;
  circles.draw(c, pc, time, index);
  index += 1;
  window.requestAnimationFrame(render);

}

function resized()
{
  setup();
}

var squares = {
  setup: function(w, h) {
    var pattern = Math.ceil(Math.random() * 9);
    var smoothness = 1;
    points = Array.from({length: h * smoothness}, (_,y) => {
      var yMod = (y / smoothness);
      var x = (Math.sin(1 - Math.tan(Math.acos(pattern/y))) * (w * 0.5)) + (w * 0.5);
      return { x, y: yMod };
    });
    points.sort(() => Math.random() - 0.5);
  },
  draw: function(c, pc, time) {
    c.clearRect(0, 0, w, h);
    c.fillStyle = 'white';
    points.filter((p, i) => {
      return ((i/points.length) < pc);
    }).forEach(p => {
    	c.fillRect(
        p.x-1,
        p.y-1+(pc*h*0.2),
        3,
        3
      );
    });    
  }
};


var circles = {
  setup: function(w, h) {

  },
  draw: function(c, pc, time, index) {
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.clearRect(0, 0, w + 10, h + 10);
    c.translate(w/2, h/2);
    let opacity = (index / 100);
    if (pc > 0.01) {
      opacity = 1 - (pc + 0.01);
    }

    c.rotate(index/10*Math.PI/180);
    
    const bigCircles = Array.from({length: 30});
    bigCircles.forEach((_,j) => {
      const mod = (j % 2 === 0) ? 1 : 0.5;
      const distance = (w/(j+1));
      const circles = Array.from({length: 10});
      const fraction = 1 / circles.length;
      circles.forEach((_, i) => {
        const pcThroughRotation = (i+mod) / circles.length;
        const rotation = pcThroughRotation * (Math.PI * 2);
        
        const r = Math.abs(Math.cos(pcThroughRotation * Math.PI)) * 255 * pc;
        const g = Math.abs(Math.cos(pcThroughRotation * Math.PI - (Math.PI/3))) * 255 * pc;
        const b = Math.abs(Math.cos(pcThroughRotation * Math.PI - (2*Math.PI/3))) * 255 * pc;
        c.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        

        const radius = (distance / 10) * (pc + 0.1);
        c.beginPath();
        c.rotate(rotation);
        c.arc(0 + distance, 0, radius, 0, Math.PI * 2, true);
        c.rotate(-rotation);
        c.fill();
      });
      
    });
    c.translate(-w/2, -h/2);
  }
};

/**
 * Run the setup on launch and add event listener
 * to rerun the setup if the window resizes.
 */
setup();
window.addEventListener( 'resize', resized );
