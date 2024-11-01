// Discentes 
//    Raphael Freitas Drago Pinho - 202004940023
//    Thiago Correa de Castro - 202004940005

class Bezier {
  constructor(...args) {
    if (args.length === 6) {
      // Quadratic 2D: p1, p2, p3
      this.points = [{ x: args[0], y: args[1] }, { x: args[2], y: args[3] }, { x: args[4], y: args[5] }];
      this.is3D = false;
    } else if (args.length === 9) {
      // Quadratic 3D: p1, p2, p3
      this.points = [{ x: args[0], y: args[1], z: args[2] }, { x: args[3], y: args[4], z: args[5] }, { x: args[6], y: args[7], z: args[8] }];
      this.is3D = true;
    } else if (args.length === 8) {
      // Cubic 2D: p1, p2, p3, p4
      this.points = [{ x: args[0], y: args[1] }, { x: args[2], y: args[3] }, { x: args[4], y: args[5] }, { x: args[6], y: args[7] }];
      this.is3D = false;
    } else if (args.length === 12) {
      // Cubic 3D: p1, p2, p3, p4
      this.points = [{ x: args[0], y: args[1], z: args[2] }, { x: args[3], y: args[4], z: args[5] }, { x: args[6], y: args[7], z: args[8] }, { x: args[9], y: args[10], z: args[11] }];
      this.is3D = true;
    } else if (args.length === 3) {
      // Quadratic from points
      this.points = args;
      this.is3D = args[0].z !== undefined; // Determine 2D or 3D
    } else if (args.length === 4) {
      // Cubic from points
      this.points = args;
      this.is3D = args[0].z !== undefined; // Determine 2D or 3D
    } else {
      throw new Error("Invalid number of arguments");
    }
  }

  static quadraticFromPoints(p1, p2, p3, t = 0.5) {
    return new Bezier(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
  }
  
  static cubicFromPoints(p1, p2, p3, p4, t = 0.5, d1) {
    return new Bezier(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
  }
  
  getCurvePoints(steps = 100) {
    const points = [];
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const point = this.get(t);
        points.push(point);
    }
    return points;
  }

  getLUT(steps = 100) {
    const lut = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      lut.push(this.get(t));
    }
    return lut;
  }

  length() {
    const steps = 100;
    const lut = this.getLUT(steps);
    let length = 0;

    for (let i = 1; i < lut.length; i++) {
      const dx = lut[i].x - lut[i - 1].x;
      const dy = lut[i].y - lut[i - 1].y;
      length += Math.sqrt(dx * dx + dy * dy);
    }
    return length;
  }

  get(t) {
    if (this.points.length === 3) {
      return this._quadratic(t);
    } else if (this.points.length === 4) {
      return this._cubic(t);
    }
  }

  _quadratic(t) {
    const [p1, p2, p3] = this.points;
    const x = (1 - t) ** 2 * p1.x + 2 * (1 - t) * t * p2.x + t ** 2 * p3.x;
    const y = (1 - t) ** 2 * p1.y + 2 * (1 - t) * t * p2.y + t ** 2 * p3.y;

    return this.is3D ? { x, y, z: (1 - t) ** 2 * p1.z + 2 * (1 - t) * t * p2.z + t ** 2 * p3.z } : { x, y };
  }

  _cubic(t) {
    const [p1, p2, p3, p4] = this.points;
    const x = (1 - t) ** 3 * p1.x + 3 * (1 - t) ** 2 * t * p2.x + 3 * (1 - t) * t ** 2 * p3.x + t ** 3 * p4.x;
    const y = (1 - t) ** 3 * p1.y + 3 * (1 - t) ** 2 * t * p2.y + 3 * (1 - t) * t ** 2 * p3.y + t ** 3 * p4.y;

    return this.is3D ? { x, y, z: (1 - t) ** 3 * p1.z + 3 * (1 - t) ** 2 * t * p2.z + 3 * (1 - t) * t ** 2 * p3.z + t ** 3 * p4.z } : { x, y };
  }

  // Métodos adicionais para calcular derivadas, normais, etc., podem ser implementados conforme necessário
}

// Exemplo de uso
const bezier2D = new Bezier(0, 0, 1, 2, 2, 0); // Quadrática 2D
const bezier3D = new Bezier(0, 0, 1, 2, 2, 0, 0, 1, 1); // Quadrática 3D
const bezierCubic = new Bezier(0, 0, 1, 2, 2, 0, 3, 1); // Cúbica 2D

export default Bezier;