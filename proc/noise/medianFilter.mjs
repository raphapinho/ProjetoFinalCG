// medianFilter.mjs

function applyMedianFilter(imageData) {
    const width = imageData.width;
    const height = imageData.height;
    const data = imageData.data;
    const result = new Uint8ClampedArray(data.length);

    const kernelSize = 3;
    const halfKernel = Math.floor(kernelSize / 2);
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const rValues = [];
            const gValues = [];
            const bValues = [];

            // Apply median filter
            for (let ky = -halfKernel; ky <= halfKernel; ky++) {
                for (let kx = -halfKernel; kx <= halfKernel; kx++) {
                    const nx = x + kx;
                    const ny = y + ky;
                    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                        const idx = (ny * width + nx) * 4;
                        rValues.push(data[idx]);
                        gValues.push(data[idx + 1]);
                        bValues.push(data[idx + 2]);
                    }
                }
            }

            const idx = (y * width + x) * 4;
            result[idx] = median(rValues);
            result[idx + 1] = median(gValues);
            result[idx + 2] = median(bValues);
            result[idx + 3] = 255; // Alpha
        }
    }

    return new ImageData(result, width, height);
}

function median(values) {
    values.sort((a, b) => a - b);
    const mid = Math.floor(values.length / 2);
    return values.length % 2 === 0 ? (values[mid - 1] + values[mid]) / 2 : values[mid];
}

export function processImage(canvas, ctx) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const filteredImageData = applyMedianFilter(imageData);
    ctx.putImageData(filteredImageData, 0, 0);
}
