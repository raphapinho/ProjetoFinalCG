// circle.mjs
export function drawCircle(x0, y0, x1, y1, filled = false) {
    const points = [];
    
    // Calcula o raio com base na distância euclidiana entre (x0, y0) e (x1, y1)
    const radius = Math.round(Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2));
    
    // Algoritmo de Bresenham para desenhar o círculo
    let x = 0;
    let y = radius;
    let d = 3 - 2 * radius;
    
    const plotCirclePoints = (cx, cy, x, y) => {
      // Adiciona pontos simétricos ao círculo
      points.push([cx + x, cy + y]);
      points.push([cx - x, cy + y]);
      points.push([cx + x, cy - y]);
      points.push([cx - x, cy - y]);
      points.push([cx + y, cy + x]);
      points.push([cx - y, cy + x]);
      points.push([cx + y, cy - x]);
      points.push([cx - y, cy - x]);
    };
  
    // Adiciona os pontos da borda do círculo
    while (x <= y) {
      plotCirclePoints(x0, y0, x, y);
      if (d < 0) {
        d = d + 4 * x + 6;
      } else {
        d = d + 4 * (x - y) + 10;
        y--;
      }
      x++;
    }
    
    // Preenche o círculo, se a opção estiver ativada
    if (filled) {
      for (let yFill = -radius; yFill <= radius; yFill++) {
        for (let xFill = -radius; xFill <= radius; xFill++) {
          if (xFill ** 2 + yFill ** 2 <= radius ** 2) {
            points.push([x0 + xFill, y0 + yFill]);
          }
        }
      }
    }
  
    return points; // Retorna todos os pontos para desenhar o círculo
  }  