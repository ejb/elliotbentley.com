import {scaleLinear} from "d3-scale";
import { rgb } from 'd3-color';
import { interpolateHcl} from 'd3-interpolate';

function createAnimation(element, colors, speed) {

  const canvas = document.createElement('canvas');
  canvas.width = element.offsetWidth;
  canvas.height = element.offsetHeight;
  element.innerHTML = '';
  element.appendChild(canvas);

  const { height, width } = canvas;

  const scale = 2;

  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);

  const columns = 5;
  const cellSize = width / columns / 2;
  const rows = Math.ceil(height / cellSize / 2);


  const grid = [];
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      grid.push({
        x: x,
        y: y,
        z: 0,
      })
    }
  }

  const rainbow = scaleLinear()
      .domain([-1.5,1.5])
      .interpolate(interpolateHcl)
      .range(colors.map(c => rgb(c)));

  const render = () => {
    grid.forEach(cell => {
      const color = rainbow(cell.z);
      ctx.fillStyle = color;
      ctx.fillRect(
        cell.x * cellSize, 
        cell.y * cellSize, 
        cellSize, 
        cellSize
      );
    });  
  }

  let requestId;

  const update = (ts = 0) => {
    grid.forEach((cell, i) => {

      cell.z = (
        Math.sin(ts / (1_000 / speed) + cell.x / 12 + cell.y / 12)
          +
        Math.cos(ts / (1_000 / speed) + cell.x / 12 + cell.y / 12)
      );
      
    });

    render();
    requestId = window.requestAnimationFrame(update);
  }

  update();

  return () => requestId;
}

export {createAnimation};

