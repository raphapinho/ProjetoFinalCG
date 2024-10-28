// grid.mjs
import { drawLine } from './bresenham.mjs';
import { drawCircle } from './circle.mjs';


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

// grid.mjs
export function updateGrid(ctx, pixels) {
  ctx.fillStyle = 'blue';

  pixels.forEach(([x, y]) => {
    ctx.fillRect(x, y, 2, 2); // Aumenta o tamanho do pixel para 2x2 para maior visibilidade
  });
}
