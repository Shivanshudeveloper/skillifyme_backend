const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Video title is required']
    },
    subtitle: {
        type: String,
        required: [true, 'Video Sub-title is required']
    },
    description: {
        type: String,
        required: [true, 'Video description is required']
    },
    videoURL: {
        type: String,
        required: [true, 'Video URL is required']
    },
    courseID: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'Course',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
});

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;
