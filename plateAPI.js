const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

async function detectPlateAPI(imagePath) {
    try {
        const form = new FormData();

        form.append("upload", fs.createReadStream(imagePath));

        const API_KEY = process.env.PLATE_API_KEY;

        if (!API_KEY) {
            throw new Error("PLATE_API_KEY environment variable is missing.");
        }

        const response = await axios.post(
            "https://api.platerecognizer.com/v1/plate-reader/",
            form,
            {
                headers: {
                    ...form.getHeaders(),
                    Authorization: `Token ${API_KEY}`
                }
            }
        );

        return response.data;

    } catch (error) {

        console.error(
            "Plate API Error:",
            error.response?.data || error.message
        );

        throw error;
    }
}

module.exports = detectPlateAPI;