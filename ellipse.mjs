export function drawEllipse(x0, y0, x1, y1, filled) {
    const points = [];
    
    const rx = Math.abs(x1 - x0);
    const ry = Math.abs(y1 - y0);
    
    let dx, dy, d1, d2, x, y;
    x = 0;
    y = ry;
  
    d1 = (ry * ry) - (rx * rx * ry) + (0.25 * rx * rx);
    dx = 2 * ry * ry * x;
    dy = 2 * rx * rx * y;
  
    while (dx < dy) {
      points.push([x0 + x, y0 + y], [x0 - x, y0 + y], [x0 + x, y0 - y], [x0 - x, y0 - y]);
  
      if (filled) {
        for (let i = -x; i <= x; i++) {
          points.push([x0 + i, y0 + y], [x0 + i, y0 - y]);
        }
      }
  
      if (d1 < 0) {
        x++;
        dx += 2 * ry * ry;
        d1 += dx + (ry * ry);
      } else {
        x++;
        y--;
        dx += 2 * ry * ry;
        dy -= 2 * rx * rx;
        d1 += dx - dy + (ry * ry);
      }
    }
  
    d2 = ((ry * ry) * ((x + 0.5) * (x + 0.5))) + ((rx * rx) * ((y - 1) * (y - 1))) - (rx * rx * ry * ry);
  
    while (y >= 0) {
      points.push([x0 + x, y0 + y], [x0 - x, y0 + y], [x0 + x, y0 - y], [x0 - x, y0 - y]);
  
      if (filled) {
        for (let i = -x; i <= x; i++) {
          points.push([x0 + i, y0 + y], [x0 + i, y0 - y]);
        }
      }
  
      if (d2 > 0) {
        y--;
        dy -= 2 * rx * rx;
        d2 += (rx * rx) - dy;
      } else {
        y--;
        x++;
        dx += 2 * ry * ry;
        dy -= 2 * rx * rx;
        d2 += dx - dy + (rx * rx);
      }
    }
    
    return points;
  }  