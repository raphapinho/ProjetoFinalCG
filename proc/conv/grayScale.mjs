// Discentes 
//    Raphael Freitas Drago Pinho - 202004940023
//    Thiago Correa de Castro - 202004940005

export function rgbToGrayscale(r, g, b) {
    const grayscale = Math.round(0.3 * r + 0.59 * g + 0.11 * b);
    return { r: grayscale, g: grayscale, b: grayscale };
  }
  