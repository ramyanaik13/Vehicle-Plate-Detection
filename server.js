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

mongoose.connect("mongodb+srv://vinayakramya80_db_user:ramya12@cluster0.qwtkmfx.mongodb.net/?appName=Cluster0")
.then(() => {
  console.log("✅ MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});



app.listen(3000,()=>{
    console.log("Server running on http://localhost:3000");
});