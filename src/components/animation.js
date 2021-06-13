
import {interpolateRgb} from "d3-interpolate";

const random = {
  direction(opts = {}) {
    let n = Math.round((Math.random() -0.5) * 3);
    if (n === -0) { n = 0 };
    if (opts.zero === false & n === 0) {
      return random.direction(opts);
    }
    return n;
  },
  calcDirection(n, [min, max]) {
    const newN = n + random.direction();
    if (newN > max) {
      return max;
    } else if (newN < min) {
      return min;
    }
    return newN;
  },
  number([min, max] = [0, 1000000]) {
    return min + (Math.random() * (max - min));
  },
  integer(extent) {
    return Math.round(random.number(extent));
  },
  item(arr) {
    return arr[random.integer([0, arr.length-1])];
  },
  order(sourceArray) {
    const arr = [...sourceArray];
    for(let i = arr.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * i)
      const temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
    return arr;
  },
  selection(arr, length) {
    return random.order(arr).slice(0, length);
  },
}

function createAnimation(element, colors, speed) {

  const canvas = document.createElement('canvas');
  canvas.width = element.offsetWidth;
  canvas.height = element.offsetHeight;
  element.innerHTML = '';
  element.appendChild(canvas);

  const { height, width } = canvas;

  const scale = window.devicePixelRatio;
  canvas.width = Math.floor(width * scale);
  canvas.height = Math.floor(height * scale);

  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);

  const columns = 12;
  const cellSize = width / columns;
  const rows = Math.ceil(height / cellSize);


  const grid = [];
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      grid.push({
        x: x,
        y: y,
        age: 0,
        oldColor: '#333333',
        newColor: '#333333',
      })
    }
  }

  const render = () => {
    grid.forEach(cell => {
      ctx.fillStyle = cell.color;
      ctx.fillRect(
        cell.x * cellSize, 
        cell.y * cellSize, 
        cellSize, 
        cellSize
      );
    });  
  }

  const update = (timestamp = 1) => {
    grid.forEach((cell, i) => {

      cell.age += timestamp;
      if (cell.color !== cell.newColor) {
        cell.progress += 0.05;
      }
      if (cell.progress >= 1) {
        cell.progress = 1;
        cell.oldColor = cell.newColor;
      }
      cell.color = interpolateRgb(cell.oldColor, cell.newColor)(cell.progress);

      const rnd = random.integer([0, 1000]);
      const rnd2 = random.integer([0, 1000]);
      const rnd3 = random.integer([0, 1000]);

      if (rnd === 0) {
        grid[i] = Object.assign(cell, {
          newColor: random.item(colors),
          age: 0,
          progress: 0,
        });
      }
      const dir = {
        x: 0,
        y: 0,
      };
      if (rnd2 < 100) { 
        dir.y = -1
      } else if (rnd2 >= 100 && rnd2 < 200) { 
        dir.y = 1;
      }
      if (rnd3 < 100) { 
        dir.x = -1
      } else if (rnd3 >= 100 && rnd3 < 200) { 
        dir.x = 1;
      }

      const neighbour = grid.find(c => (
        (c.x + dir.x === cell.x) &&
        (c.y + dir.y === cell.y)
      ));
      if (
        neighbour &&
        neighbour.newColor !== cell.newColor &&
        neighbour.age < cell.age &&
        neighbour.age > speed * 500_000 &&
        cell.age > speed * 500_000
      ) {
        grid[i] = Object.assign(cell, {
          newColor: neighbour.newColor,
          age: 0,
          progress: 0,
        });

      }
    });

    render();
    window.requestAnimationFrame(update);
  }

  update();
}

export {createAnimation};

