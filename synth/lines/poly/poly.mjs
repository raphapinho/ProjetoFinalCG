// Discentes 
//    Raphael Freitas Drago Pinho - 202004940023
//    Thiago Correa de Castro - 202004940005

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const points = [];

function handleCanvasClick(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  points.push([x, y]);
  
  drawCartesianPlane(ctx, canvas.width, canvas.height);
  drawPolyline(ctx, points);
}

canvas.addEventListener('click', handleCanvasClick);

function clearPoints() {
  points.length = 0;
  drawCartesianPlane(ctx, canvas.width, canvas.height); // Redesenha o plano
}

document.getElementById('clearButton').addEventListener('click', clearPoints);

function init() {
  drawCartesianPlane(ctx, canvas.width, canvas.height);
}

window.onload = init;
