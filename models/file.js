const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    fileUrl: { type: String, required: true },
    fileName: { type: String, required: true },
    isFavorite: { type: Boolean, default: false }, // Field to store favorite status
    courseID: {
        type: mongoose.Schema.Types.ObjectId, // Reference to Course model
        ref: 'Course',
        required: true,
    },
}, { timestamps: true });

const File = mongoose.model('File', fileSchema);
module.exports = File;
