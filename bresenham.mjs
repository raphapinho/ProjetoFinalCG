export function drawLine(x0, y0, x1, y1) {
  const pixels = [];
  let dx = Math.abs(x1 - x0);
  let dy = Math.abs(y1 - y0);
  let sx = x0 < x1 ? 1 : -1;
  let sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    pixels.push([x0, y0]);  // Adiciona o ponto atual à lista de pixels

    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;

    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }
  return pixels;
}