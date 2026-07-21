const express = require("express");
const multer = require("multer");
const path = require("path");

const resizeImage = require("../services/imageProcessor");
const detectBlur = require("../services/blurDetector");
const detectPlate = require("../services/plateAPIService");

const Image = require("../models/Image");


const router = express.Router();


// Multer storage

const storage = multer.diskStorage({

    destination:(req,file,cb)=>{

        cb(null,"uploads/");

    },


    filename:(req,file,cb)=>{

        cb(null,Date.now()+path.extname(file.originalname));

    }

});


const upload = multer({
    storage:storage
});





// Upload Route

router.post("/", upload.single("image"), async(req,res)=>{


    try{


        console.log("Upload route reached");


        if(!req.file){

            return res.status(400).json({

                message:"No image uploaded"

            });

        }



        console.log("File:",req.file.filename);



        const imagePath = req.file.path;



        // Step 1: Image processing

        console.log("Step 1: Processing image...");

        const processedImage = await resizeImage(imagePath);



        // Step 2: Blur detection

        console.log("Step 2: Checking blur...");

        const blurResult = await detectBlur(processedImage);



        console.log(blurResult);



        // Step 3: Plate detection

        console.log("Step 3: Detecting plate...");


        const plateResult = await detectPlate(processedImage);



        console.log("Plate Result:",plateResult);




        // Step 4: Save MongoDB

        console.log("Step 4: Saving to MongoDB...");



        const newImage = new Image({

            originalName:req.file.originalname,

            processedName:path.basename(processedImage),

            size:req.file.size,

            blurScore:blurResult.score,

            isBlur:blurResult.isBlur,

            plateNumber:plateResult.plateNumber


        });



        await newImage.save();



        console.log("✅ Saved successfully");





        // Send response to frontend

        res.json({

            message:"Image processed successfully",

            plateNumber:plateResult.plateNumber,

            score:plateResult.score,

            blurScore:blurResult.score,

            isBlur:blurResult.isBlur

        });



    }

    catch(error){


        console.log("Upload Error:",error);


        res.status(500).json({

            message:"Server error",

            error:error.message

        });


    }


});



module.exports = router;