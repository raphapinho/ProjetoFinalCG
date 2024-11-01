// Discentes 
//    Raphael Freitas Drago Pinho - 202004940023
//    Thiago Correa de Castro - 202004940005

function applyPrewittOperator(imageData) {
    const width = imageData.width;
    const height = imageData.height;
    const data = imageData.data;
    const result = new Uint8ClampedArray(data.length);

    const Gx = [
        [-1, 0, 1],
        [-1, 0, 1],
        [-1, 0, 1]
    ];

    const Gy = [
        [1, 1, 1],
        [0, 0, 0],
        [-1, -1, -1]
    ];

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

            const magnitude = Math.sqrt(pixelX * pixelX + pixelY * pixelY);
            const value = Math.min(255, magnitude);

            const idx = (y * width + x) * 4;
            result[idx] = result[idx + 1] = result[idx + 2] = value;
            result[idx + 3] = 255;
        }
    }

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;
            if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
                result[idx + 3] = 0;
            }
        }
    }

    return new ImageData(result, width, height);
}

export function processImage(canvas, ctx) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const prewittImageData = applyPrewittOperator(imageData);
    ctx.putImageData(prewittImageData, 0, 0);
}
