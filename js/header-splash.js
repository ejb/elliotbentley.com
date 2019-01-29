
class HeaderAnimation {
  constructor(element) {
    this.element = element;
    this.setup();
  }
  setup() {
    // set up (or reset) canvas element
    this.element.innerHTML = '';
    this.width = this.element.offsetWidth;
    this.height = this.element.offsetHeight;
    this.startTime = Date.now();
    const canvas = document.createElement('canvas');
    canvas.setAttribute('style', 'position: absolute; top: 0; left: 0;');
    canvas.width = this.width;
    canvas.height = this.height;
    this.element.appendChild(canvas);
  	this.context = canvas.getContext('2d');
    this.index = 0;
    window.cancelAnimationFrame(this.requestId);
    this.requestId = window.requestAnimationFrame(this.render.bind(this));
  }
  render() {
    // runs on a loop, calculating the y position,
    // time passed so far
    // and passes it to drawCircles
    const y = window.scrollY;
    const height = this.element.offsetHeight;
    let pc = Math.abs(y / height);
    pc *= (2-pc);
    if (pc <= 0) {
      pc = 0;
    }
    if (pc >= 1) {
      pc = 1;
    }
    const time = Date.now() - this.startTime;
    this.drawCircles(this.context, pc, time, this.index);
    this.index += 1;
    this.requestId = window.requestAnimationFrame(this.render.bind(this));
    
  }
  drawCircles(c, pc, time, index) {
    // loops through circles, places them in current location
    // and uses trigonometry to work out the require colour
    // (who knew GCSE maths would come in handy one day?)
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.clearRect(0, 0, this.width + 10, this.height + 10);
    c.translate(this.width/2, this.height/2);
    let opacity = (index / 100);
    if (pc > 0.01) {
      opacity = 1 - (pc + 0.01);
    }

    c.rotate(index/10*Math.PI/180);
    
    const bigCircles = Array.from({length: 30});
    bigCircles.forEach((_,j) => {
      const mod = (j % 2 === 0) ? 1 : 0.5;
      const distance = this.width / (j+1);
      const circles = Array.from({length: 10});
      const fraction = 1 / circles.length;
      circles.forEach((_, i) => {
        const pcThroughRotation = (i+mod) / circles.length;
        const rotation = pcThroughRotation * (Math.PI * 2);
        
        const r = Math.abs(Math.cos(pcThroughRotation * Math.PI)) * 255 * pc;
        const g = Math.abs(Math.cos(pcThroughRotation * Math.PI - (Math.PI/3))) * 255 * pc;
        const b = Math.abs(Math.cos(pcThroughRotation * Math.PI - (2*Math.PI/3))) * 255 * pc;
        c.fillStyle = `rgba(${r.toFixed(0)}, ${g.toFixed(0)}, ${b.toFixed(0)}, ${opacity})`;
        

        const radius = (distance / 10) * (pc + 0.1);
        c.beginPath();
        c.rotate(rotation);
        c.arc(0 + distance, 0, radius, 0, Math.PI * 2, true);
        c.rotate(-rotation);
        c.fill();
      });
      
    });
    c.translate(-this.width/2, -this.height/2);
  }
}

document.addEventListener("DOMContentLoaded", function(event) { 
  const element = document.querySelector('header.splash');
  const animation = new HeaderAnimation(element);
  let windowWidth = window.innerWidth;
  window.addEventListener('resize', debounce(function() {
    if (windowWidth !== window.innerWidth) {
      animation.setup();
    }
    windowWidth = window.innerWidth;
  }, 250));
});

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};