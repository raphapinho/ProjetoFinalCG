// Discentes 
//    Raphael Freitas Drago Pinho - 202004940023
//    Thiago Correa de Castro - 202004940005

function createGaussianKernel(size, sigma) {
    const kernel = new Array(size).fill(0).map(() => new Array(size).fill(0));
    const mean = size / 2;
    let sum = 0;

    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            const exponent = -((Math.pow(x - mean, 2) + Math.pow(y - mean, 2)) / (2 * Math.pow(sigma, 2)));
            kernel[x][y] = (1 / (2 * Math.PI * Math.pow(sigma, 2))) * Math.exp(exponent);
            sum += kernel[x][y];
        }
    }

    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            kernel[x][y] /= sum;
        }
    }
    return kernel;
}

function applyGaussianFilter(imageData) {
    const width = imageData.width;
    const height = imageData.height;
    const data = imageData.data;
    const result = new Uint8ClampedArray(data.length);
    const kernelSize = 5;
    const sigma = 1.0;
    const kernel = createGaussianKernel(kernelSize, sigma);
    const halfKernel = Math.floor(kernelSize / 2);
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let r = 0, g = 0, b = 0;

            for (let ky = -halfKernel; ky <= halfKernel; ky++) {
                for (let kx = -halfKernel; kx <= halfKernel; kx++) {
                    const nx = x + kx;
                    const ny = y + ky;
                    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                        const idx = (ny * width + nx) * 4;
                        r += data[idx] * kernel[ky + halfKernel][kx + halfKernel];
                        g += data[idx + 1] * kernel[ky + halfKernel][kx + halfKernel];
                        b += data[idx + 2] * kernel[ky + halfKernel][kx + halfKernel];
                    }
                }
            }

            const idx = (y * width + x) * 4;
            result[idx] = r;
            result[idx + 1] = g;
            result[idx + 2] = b;
            result[idx + 3] = 255;
        }
    }

    return new ImageData(result, width, height);
}

export function processImage(canvas, ctx) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const filteredImageData = applyGaussianFilter(imageData);
    ctx.putImageData(filteredImageData, 0, 0);
}
