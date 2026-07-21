const sharp = require("sharp");

async function detectBlur(imagePath) {
    // Read image in grayscale
    const { data, info } = await sharp(imagePath)
        .greyscale()
        .raw()
        .toBuffer({ resolveWithObject: true });

    const width = info.width;
    const height = info.height;

    let edgeSum = 0;
    let count = 0;

    // Sobel edge detection
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {

            const p = (yy, xx) => data[yy * width + xx];

            const gx =
                -p(y - 1, x - 1) + p(y - 1, x + 1) +
                -2 * p(y, x - 1) + 2 * p(y, x + 1) +
                -p(y + 1, x - 1) + p(y + 1, x + 1);

            const gy =
                -p(y - 1, x - 1) - 2 * p(y - 1, x) - p(y - 1, x + 1) +
                 p(y + 1, x - 1) + 2 * p(y + 1, x) + p(y + 1, x + 1);

            const magnitude = Math.sqrt(gx * gx + gy * gy);

            edgeSum += magnitude;
            count++;
        }
    }

    const score = edgeSum / count;

    return {
        score: Number(score.toFixed(2)),
        isBlur: score < 25   // Adjust if needed
    };
}

module.exports = detectBlur;