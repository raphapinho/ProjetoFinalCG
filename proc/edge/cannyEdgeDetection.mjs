// Discentes 
//    Raphael Freitas Drago Pinho - 202004940023
//    Thiago Correa de Castro - 202004940005

function gaussianBlur(imageData) {
    const width = imageData.width;
    const height = imageData.height;
    const data = imageData.data;
    const kernel = [
        [1, 2, 1],
        [2, 4, 2],
        [1, 2, 1]
    ];
    const kernelSize = 3;
    const kernelSum = 16;
    const result = new Uint8ClampedArray(data.length);

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            let r = 0, g = 0, b = 0;

            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {
                    const idx = ((y + ky) * width + (x + kx)) * 4;
                    r += data[idx] * kernel[ky + 1][kx + 1];
                    g += data[idx + 1] * kernel[ky + 1][kx + 1];
                    b += data[idx + 2] * kernel[ky + 1][kx + 1];
                }
            }

            const idx = (y * width + x) * 4;
            result[idx] = r / kernelSum;
            result[idx + 1] = g / kernelSum;
            result[idx + 2] = b / kernelSum;
            result[idx + 3] = 255;
        }
    }

    return new ImageData(result, width, height);
}

function applyCanny(imageData) {
    const blurredData = gaussianBlur(imageData);
    const width = blurredData.width;
    const height = blurredData.height;
    const data = blurredData.data;
    const result = new Uint8ClampedArray(data.length);

    const Gx = [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1]
    ];

    const Gy = [
        [1, 2, 1],
        [0, 0, 0],
        [-1, -2, -1]
    ];

    const magnitude = new Uint8ClampedArray(width * height);
    const direction = new Float32Array(width * height);

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            let pixelX = 0;
            let pixelY = 0;

            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {
                    const idx = ((y + ky) * width + (x + kx)) * 4;
                    const grayValue = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
                    pixelX += Gx[ky + 1][kx + 1] * grayValue;
                    pixelY += Gy[ky + 1][kx + 1] * grayValue;
                }
            }

            const mag = Math.sqrt(pixelX * pixelX + pixelY * pixelY);
            const dir = Math.atan2(pixelY, pixelX) * (180 / Math.PI) + 180;

            const idx = (y * width + x);
            magnitude[idx] = mag;
            direction[idx] = dir;
        }
    }

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const idx = (y * width + x);
            const angle = direction[idx];
            let suppressed = false;

            if ((angle >= 0 && angle < 45) || (angle >= 180 && angle < 225)) {
                suppressed = (magnitude[idx] < magnitude[idx - 1]) || (magnitude[idx] < magnitude[idx + 1]);
            } else if ((angle >= 45 && angle < 135)) {
                suppressed = (magnitude[idx] < magnitude[idx - width]) || (magnitude[idx] < magnitude[idx + width]);
            } else {
                suppressed = (magnitude[idx] < magnitude[idx + width - 1]) || (magnitude[idx] < magnitude[idx - width + 1]);
            }

            if (suppressed) {
                magnitude[idx] = 0;
            }
        }
    }

    const highThreshold = 0.3 * 255;
    const lowThreshold = 0.1 * 255;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const idx = (y * width + x);
            if (magnitude[idx] >= highThreshold) {
                result[idx * 4] = result[idx * 4 + 1] = result[idx * 4 + 2] = 255;
                result[idx * 4 + 3] = 255;
            } else if (magnitude[idx] >= lowThreshold) {
                result[idx * 4] = result[idx * 4 + 1] = result[idx * 4 + 2] = 128;
                result[idx * 4 + 3] = 255;
            } else {
                result[idx * 4] = result[idx * 4 + 1] = result[idx * 4 + 2] = 0;
                result[idx * 4 + 3] = 255;
            }
        }
    }

    return new ImageData(result, width, height);
}

export function processImage(canvas, ctx) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const cannyImageData = applyCanny(imageData);
    ctx.putImageData(cannyImageData, 0, 0);
}
