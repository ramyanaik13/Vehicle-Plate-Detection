const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const uploadRoute = require("./routes/upload");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "frontend")));

// Upload API
app.use("/api/upload", uploadRoute);

// Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});


// ===============================
// MongoDB Connection
// ===============================

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
    console.log("❌ MONGODB_URI is missing in environment variables");
} else {

    mongoose.connect(mongoURI)
        .then(() => {
            console.log("✅ MongoDB Connected");
        })
        .catch((err) => {
            console.log("❌ MongoDB Connection Error:");
            console.log(err.message);
        });

}


// ===============================
// Start Server
// ===============================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});