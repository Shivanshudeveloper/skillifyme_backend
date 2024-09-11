const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Video title is required']
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
        type: String,
        required: [true, 'Course ID is required']
    },
    courseTitle: {
        type: String,
        required: [true, 'Course title is required']
    },
    userID: {
        type: String, // or ObjectId if you're linking to a User model
        required: [true, 'User ID is required']
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically sets the timestamp
    }
});

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;
