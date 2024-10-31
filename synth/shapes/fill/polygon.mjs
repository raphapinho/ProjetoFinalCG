// polygon_grid.mjs
import { drawCartesianPlane } from '../../../src/grid.mjs';

let points = [];
let numPoints = 0; // Mover a variável para o escopo global

export function drawPolygon(ctx, width, height) {
  points = []; // Reinicia os pontos a cada novo desenho
  drawCartesianPlane(ctx, width, height);

  ctx.canvas.addEventListener('click', (event) => {
    if (points.length < numPoints) {
      const rect = ctx.canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      points.push({ x, y });
      drawPoint(ctx, x, y);

      // Se o número de pontos atinge o máximo, desenha o polígono
      if (points.length === numPoints) {
        drawPolygonShape(ctx, points);
      }
    }
  });
}

function drawPoint(ctx, x, y) {
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fill();
}

function drawPolygonShape(ctx, points) {
  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)'; // Cor do polígono
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }

  ctx.closePath(); // Fecha o polígono
  ctx.fill(); // Preenche o polígono
  ctx.strokeStyle = 'black';
  ctx.stroke(); // Desenha a borda do polígono
}

// Função para iniciar o processo de desenho do polígono
export function startPolygonDrawing(ctx, width, height) {
  numPoints = parseInt(prompt("Quantos pontos deseja para o polígono?"), 10);

  if (isNaN(numPoints) || numPoints < 3) {
    alert("Por favor, insira um número válido de pontos (mínimo 3).");
    return;
  }

  drawPolygon(ctx, width, height);
}
