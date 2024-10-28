class Bezier {
  constructor(...args) {
    if (args.length === 6) {
      // Quadratic 2D: p1, p2, p3
      this.points = [
        { x: args[0], y: args[1] },
        { x: args[2], y: args[3] },
        { x: args[4], y: args[5] }
      ];
      this.is3D = false;
    } else if (args.length === 9) {
      // Quadratic 3D: p1, p2, p3
      this.points = [
        { x: args[0], y: args[1], z: args[2] },
        { x: args[3], y: args[4], z: args[5] },
        { x: args[6], y: args[7], z: args[8] }
      ];
      this.is3D = true;
    } else if (args.length === 8) {
      // Cubic 2D: p1, p2, p3, p4
      this.points = [
        { x: args[0], y: args[1] },
        { x: args[2], y: args[3] },
        { x: args[4], y: args[5] },
        { x: args[6], y: args[7] }
      ];
      this.is3D = false;
    } else if (args.length === 12) {
      // Cubic 3D: p1, p2, p3, p4
      this.points = [
        { x: args[0], y: args[1], z: args[2] },
        { x: args[3], y: args[4], z: args[5] },
        { x: args[6], y: args[7], z: args[8] },
        { x: args[9], y: args[10], z: args[11] }
      ];
      this.is3D = true;
    } else if (args.length === 3 || args.length === 4) {
      // Quadratic or Cubic from points
      this.points = args;
      this.is3D = args[0].z !== undefined;
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
      points.push(this.get(i / steps));
    }
    return points;
  }

  getLUT(steps = 100) {
    return this.getCurvePoints(steps);
  }

  length() {
    const lut = this.getCurvePoints(100);
    return lut.slice(1).reduce((len, point, i) => {
      const dx = point.x - lut[i].x;
      const dy = point.y - lut[i].y;
      const dz = this.is3D ? point.z - lut[i].z : 0;
      return len + Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);
    }, 0);
  }

  get(t) {
    return this.points.length === 3 ? this._quadratic(t) : this._cubic(t);
  }

  _quadratic(t) {
    const [p1, p2, p3] = this.points;
    const x = (1 - t) ** 2 * p1.x + 2 * (1 - t) * t * p2.x + t ** 2 * p3.x;
    const y = (1 - t) ** 2 * p1.y + 2 * (1 - t) * t * p2.y + t ** 2 * p3.y;

    return this.is3D
      ? { x, y, z: (1 - t) ** 2 * p1.z + 2 * (1 - t) * t * p2.z + t ** 2 * p3.z }
      : { x, y };
  }

  _cubic(t) {
    const [p1, p2, p3, p4] = this.points;
    const x =
      (1 - t) ** 3 * p1.x +
      3 * (1 - t) ** 2 * t * p2.x +
      3 * (1 - t) * t ** 2 * p3.x +
      t ** 3 * p4.x;
    const y =
      (1 - t) ** 3 * p1.y +
      3 * (1 - t) ** 2 * t * p2.y +
      3 * (1 - t) * t ** 2 * p3.y +
      t ** 3 * p4.y;

    return this.is3D
      ? {
        x,
        y,
        z:
          (1 - t) ** 3 * p1.z +
          3 * (1 - t) ** 2 * t * p2.z +
          3 * (1 - t) * t ** 2 * p3.z +
          t ** 3 * p4.z
      }
      : { x, y };
  }
}

// Exemplo de uso
const bezier2D = new Bezier(0, 0, 1, 2, 2, 0); // Quadrática 2D
const bezier3D = new Bezier(0, 0, 1, 2, 2, 0, 0, 1, 1); // Quadrática 3D
const bezierCubic = new Bezier(0, 0, 1, 2, 2, 0, 3, 1); // Cúbica 2D

export default Bezier;
