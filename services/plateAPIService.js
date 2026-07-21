const detectPlateAPI = require("../plateAPI");

async function detectPlate(imagePath) {
    try {
        console.log("Reading Vehicle Number Plate...");

        const result = await detectPlateAPI(imagePath);

        console.log(JSON.stringify(result, null, 2));

        if (!result.results || result.results.length === 0) {
            return {
                plateNumber: null,
                score: 0
            };
        }

        return {
            plateNumber: result.results[0].plate.toUpperCase(),
            score: result.results[0].score
        };

    } catch (err) {

        console.error("Plate API Error:", err.response?.data || err.message);

        return {
            plateNumber: null,
            score: 0
        };
    }
}

module.exports = detectPlate;