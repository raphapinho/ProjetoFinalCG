// Discentes 
//    Raphael Freitas Drago Pinho - 202004940023
//    Thiago Correa de Castro - 202004940005

export function drawCircle(x0, y0, x1, y1, filled = false) {
    const points = [];
    
    const radius = Math.round(Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2));
    
    let x = 0;
    let y = radius;
    let d = 3 - 2 * radius;
    
    const plotCirclePoints = (cx, cy, x, y) => {
      points.push([cx + x, cy + y]);
      points.push([cx - x, cy + y]);
      points.push([cx + x, cy - y]);
      points.push([cx - x, cy - y]);
      points.push([cx + y, cy + x]);
      points.push([cx - y, cy + x]);
      points.push([cx + y, cy - x]);
      points.push([cx - y, cy - x]);
    };
  
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
    
    if (filled) {
      for (let yFill = -radius; yFill <= radius; yFill++) {
        for (let xFill = -radius; xFill <= radius; xFill++) {
          if (xFill ** 2 + yFill ** 2 <= radius ** 2) {
            points.push([x0 + xFill, y0 + yFill]);
          }
        }
      }
    }
  
    return points;
  }  