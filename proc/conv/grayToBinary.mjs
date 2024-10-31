export function grayscaleToBinary(grayscaleValue, threshold = 128) {
    return grayscaleValue >= threshold ? 255 : 0;
  }
  