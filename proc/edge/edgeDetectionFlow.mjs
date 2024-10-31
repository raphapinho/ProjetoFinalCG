import { processImage as sobelProcess } from './sobelEdgeDetection.mjs';
import { processImage as prewittProcess } from './prewittEdgeDetection.mjs';
import { processImage as cannyProcess } from './cannyEdgeDetection.mjs';

let originalImageData = null;

export function loadImage(canvas, ctx, file) {
    const img = new Image();
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    };
    img.src = URL.createObjectURL(file);
}

export function applyAlgorithm(canvas, ctx, algorithm) {
    if (originalImageData) {
        ctx.putImageData(originalImageData, 0, 0); // Restore original image
    }
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    switch (algorithm) {
        case 'sobel':
            sobelProcess(canvas, ctx);
            break;
        case 'prewitt':
            prewittProcess(canvas, ctx);
            break;
        case 'canny':
            cannyProcess(canvas, ctx);
            break;
        default:
            console.error('Algoritmo desconhecido:', algorithm);
    }
}
