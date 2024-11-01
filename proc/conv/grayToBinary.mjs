// Discentes 
//    Raphael Freitas Drago Pinho - 202004940023
//    Thiago Correa de Castro - 202004940005

export function grayscaleToBinary(grayscaleValue, threshold = 128) {
    return grayscaleValue >= threshold ? 255 : 0;
  }
  