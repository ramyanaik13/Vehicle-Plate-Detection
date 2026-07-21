const sharp = require("sharp");
const path = require("path");


async function resizeImage(imagePath){

    try{

        const outputPath = path.join(
            "uploads",
            "processed_" + path.basename(imagePath)
        );


        await sharp(imagePath)
            .resize({
                width:1000
            })
            .jpeg({
                quality:90
            })
            .toFile(outputPath);



        console.log("Image processed:", outputPath);


        return outputPath;


    }
    catch(error){

        console.log("Image processing error:",error);

        throw error;

    }

}



module.exports = resizeImage;