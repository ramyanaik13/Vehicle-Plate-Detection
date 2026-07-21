const sharp = require("sharp");

async function detectBrightness(imagePath) {
    const { data, info } = await sharp(imagePath)
        .greyscale()
        .raw()
        .toBuffer({ resolveWithObject: true });

    let total = 0;

    for (let i = 0; i < data.length; i++) {
        total += data[i];
    }

    const brightness = total / data.length;

    return {
        brightness: brightness.toFixed(2),
        isDark: brightness < 80
    };
}

module.exports = detectBrightness;