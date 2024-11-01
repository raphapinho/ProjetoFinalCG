// Discentes 
//    Raphael Freitas Drago Pinho - 202004940023
//    Thiago Correa de Castro - 202004940005

import { rgbToGrayscale } from './grayScale.mjs';
import { grayscaleToBinary } from './grayToBinary.mjs';
import { binaryToGrayscale } from './binaryToGray.mjs';
import { grayscaleToRGB } from './grayToRGB.mjs';

let rgbMap = [];
let grayMap = [];

export function initializeFlow(upload, canvas, ctx) {
  upload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        rgbMap = Array.from(imageData.data.slice(0, imageData.data.length)); // Armazena o mapa RGB
      };
      img.src = URL.createObjectURL(file);
    }
  });

  document.getElementById('toGrayBtn').addEventListener('click', () => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    grayMap = []; // Limpa o mapa de tons de cinza ao converter novamente

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const gray = rgbToGrayscale(r, g, b).r;

      data[i] = data[i + 1] = data[i + 2] = gray; // Setar como tons de cinza
      grayMap.push(gray); // Armazena os tons de cinza
    }

    ctx.putImageData(imageData, 0, 0);
  });

  document.getElementById('toBinaryBtn').addEventListener('click', () => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const gray = data[i]; // Assumindo que R = G = B para tons de cinza
      const binary = grayscaleToBinary(gray);
      data[i] = data[i + 1] = data[i + 2] = binary; // Setar como binário
    }

    ctx.putImageData(imageData, 0, 0);
  });

  document.getElementById('toGrayFromBinaryBtn').addEventListener('click', () => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const binary = data[i]; // Assumindo que o valor binário está em R
      // O valor binário deve ser mapeado para tons de cinza
      const gray = binary === 0 ? 0 : 255; // Convertendo binário para tons de cinza (0 ou 255)
      data[i] = data[i + 1] = data[i + 2] = gray; // Setar como tons de cinza
    }

    ctx.putImageData(imageData, 0, 0);
  });

  document.getElementById('toRGBBtn').addEventListener('click', () => {
    if (rgbMap.length === 0) {
      alert("O mapa RGB não está disponível. Carregue uma imagem RGB primeiro.");
      return;
    }
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const gray = data[i]; // Assumindo que R = G = B para tons de cinza
      const rgb = grayscaleToRGB(gray);
      
      data[i] = rgbMap[i];     // R
      data[i + 1] = rgbMap[i + 1]; // G
      data[i + 2] = rgbMap[i + 2]; // B
    }

    ctx.putImageData(imageData, 0, 0);
  });
}
