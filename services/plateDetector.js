const detectPlateAPI = require("../plateAPI");

async function detectPlate(imagePath) {

    try {

        console.log("Reading Vehicle Number Plate...");

        const result = await detectPlateAPI(imagePath);

        console.log(
            JSON.stringify(result, null, 2)
        );

        if (
            !result.results ||
            result.results.length === 0
        ) {

            console.log("No plate detected.");

            return {
                plateNumber: null,
                score: 0
            };

        }

        const plate =
            result.results[0].plate.toUpperCase();

        const score =
            result.results[0].score;

        console.log(
            "Detected Plate:",
            plate
        );

        return {

            plateNumber: plate,

            score: score

        };

    }

    catch (err) {

        console.log(
            "Plate API Error:",
            err.response?.data || err.message
        );

        return {

            plateNumber: null,

            score: 0

        };

    }

}

module.exports = detectPlate;