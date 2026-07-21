const detectPlateAPI = require("./plateAPI");


async function test(){

    try {

        const result = await detectPlateAPI(
            "uploads/image_1.jpeg"
        );

        console.log(
            JSON.stringify(result,null,2)
        );

    }
    catch(error){

        console.log(error.response?.data || error.message);

    }

}


test();