// meanFilter.mjs

function applyMeanFilter(imageData) {
    const width = imageData.width;
    const height = imageData.height;
    const data = imageData.data;
    const result = new Uint8ClampedArray(data.length);

    const kernelSize = 3;
    const halfKernel = Math.floor(kernelSize / 2);
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let r = 0, g = 0, b = 0, count = 0;

            // Apply mean filter
            for (let ky = -halfKernel; ky <= halfKernel; ky++) {
                for (let kx = -halfKernel; kx <= halfKernel; kx++) {
                    const nx = x + kx;
                    const ny = y + ky;
                    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                        const idx = (ny * width + nx) * 4;
                        r += data[idx];
                        g += data[idx + 1];
                        b += data[idx + 2];
                        count++;
                    }
                }
            }

            const idx = (y * width + x) * 4;
            result[idx] = r / count;
            result[idx + 1] = g / count;
            result[idx + 2] = b / count;
            result[idx + 3] = 255; // Alpha
        }
    }

    return new ImageData(result, width, height);
}

export function processImage(canvas, ctx) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const filteredImageData = applyMeanFilter(imageData);
    ctx.putImageData(filteredImageData, 0, 0);
}
