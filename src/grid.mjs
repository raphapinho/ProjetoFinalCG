// grid.mjs
export function drawCartesianPlane(ctx, width, height) {
  const centerX = width / 2;
  const centerY = height / 2;
  const scale = 20; // Tamanho do quadrado

  // Limpa o canvas
  ctx.clearRect(0, 0, width, height);

  // Desenha os eixos
  ctx.beginPath();
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, height);
  ctx.moveTo(0, centerY);
  ctx.lineTo(width, centerY);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Desenha a grade
  ctx.strokeStyle = 'lightgray';
  for (let i = -centerX; i <= centerX; i += scale) {
      ctx.beginPath();
      ctx.moveTo(centerX + i, 0);
      ctx.lineTo(centerX + i, height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, centerY + i);
      ctx.lineTo(width, centerY + i);
      ctx.stroke();
  }
}
