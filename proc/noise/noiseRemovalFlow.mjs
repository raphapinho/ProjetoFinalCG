// noiseRemovalFlow.mjs

import { processImage as processMedian } from './medianFilter.mjs';
import { processImage as processMean } from './meanFilter.mjs';
import { processImage as processGaussian } from './gaussianFilter.mjs';

export function setupNoiseRemoval(canvas, ctx) {
    const upload = document.getElementById('upload');
    const applyBtn = document.getElementById('applyBtn');
    const filterSelect = document.getElementById('filterSelect');
    let originalImageData = null;

    upload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const img = new Image();
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            };
            img.src = URL.createObjectURL(file);
        }
    });

    applyBtn.addEventListener('click', () => {
        if (originalImageData) {
            ctx.putImageData(originalImageData, 0, 0); // Restore the original image
            const selectedFilter = filterSelect.value;

            switch (selectedFilter) {
                case 'mean':
                    processMean(canvas, ctx);
                    break;
                case 'median':
                    processMedian(canvas, ctx);
                    break;
                case 'gaussian':
                    processGaussian(canvas, ctx);
                    break;
                default:
                    break;
            }
        }
    });
}
