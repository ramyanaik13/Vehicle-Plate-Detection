const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");


async function detectPlateAPI(imagePath) {

    const form = new FormData();

    form.append(
        "upload",
        fs.createReadStream(imagePath)
    );


    const response = await axios.post(
        "https://api.platerecognizer.com/v1/plate-reader/",
        form,
        {
            headers: {
                ...form.getHeaders(),

                Authorization:
                "Token d05d82878d02cde465db3c38040ec1a31c0f0f93"
            }
        }
    );


    return response.data;

}


module.exports = detectPlateAPI;