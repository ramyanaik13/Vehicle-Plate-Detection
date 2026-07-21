const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    originalName: {
        type: String,
        required: true
    },
    processedName: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    blurScore: {
        type: Number
    },
    isBlur: {
        type: Boolean
    },
    plateNumber: {
        type: String,
        default: "Not Detected"
    },
    uploadDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Image", imageSchema);