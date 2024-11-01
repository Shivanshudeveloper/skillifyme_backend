const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    fileUrl: { type: String, required: true },
    fileName: { type: String, required: true },
    isFavorite: { type: Boolean, default: false }, 
    courseID: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'Course',
        required: true,
    },
}, { timestamps: true });

const File = mongoose.model('File', fileSchema);
module.exports = File;
