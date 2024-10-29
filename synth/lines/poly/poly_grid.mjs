// poly_grid.mjs
import { drawLine } from './bresenham.mjs';

// Função para desenhar o plano cartesiano com grid
export function drawCartesianPlane(ctx, width, height) {
  const centerX = width / 2;
  const centerY = height / 2;
  const scale = 20;

  ctx.clearRect(0, 0, width, height);
  
  // Desenha eixos X e Y
  ctx.beginPath();
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, height);
  ctx.moveTo(0, centerY);
  ctx.lineTo(width, centerY);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Desenha a escala nos eixos X e Y
  ctx.font = '12px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let i = -centerX; i <= centerX; i += scale) {
    const xPos = centerX + i;
    const yPos = centerY + i;

    ctx.beginPath();
    ctx.moveTo(xPos, centerY - 5);
    ctx.lineTo(xPos, centerY + 5);
    ctx.stroke();
    if (i !== 0) ctx.fillText(i / scale, xPos, centerY + 15);

    ctx.beginPath();
    ctx.moveTo(centerX - 5, yPos);
    ctx.lineTo(centerX + 5, yPos);
    ctx.stroke();
    if (i !== 0) ctx.fillText(-i / scale, centerX - 15, yPos);
  }
}

// Função para desenhar uma polilinha
export function drawPolyline(ctx, points) {
  if (points.length < 2) return; // Necessita de pelo menos dois pontos para desenhar uma linha
  
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 2;
  ctx.beginPath();
  
  // Move para o primeiro ponto
  ctx.moveTo(points[0][0], points[0][1]);
  
  // Desenha linhas para todos os pontos subsequentes
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i][0], points[i][1]);
  }
  
  ctx.stroke();
}

// Função para atualizar os pontos da polilinha
export function updatePolyline(ctx, pixels) {
  ctx.fillStyle = 'blue';

  pixels.forEach(([x, y]) => {
    ctx.fillRect(x, y, 2, 2);
  });
}