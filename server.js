const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const uploadRoute = require("./routes/upload");

const app = express();


app.use(cors());
app.use(express.json());


// Serve frontend
app.use(express.static(path.join(__dirname, "frontend")));


// API route
app.use("/api/upload", uploadRoute);


// Open UI
app.get("/", (req,res)=>{
    res.sendFile(
        path.join(__dirname,"frontend","index.html")
    );
});



// MongoDB connection

mongoose.connect("mongodb://127.0.0.1:27017/vehicleDB")
.then(()=>{
    console.log("MongoDB connected");
})
.catch(err=>{
    console.log(err);
});



app.listen(3000,()=>{
    console.log("Server running on http://localhost:3000");
});