const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Course title is required']
    },
    subtitle: {
        type: String,
        required: [true, 'Course subtitle is required']
    },
    description: {
        type: String,
        required: [true, 'Course description is required']
    },
    courseID: {
        type: String,
        required: [true, 'Course ID is required'],
        unique: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    videos: [{
        type: mongoose.Schema.Types.ObjectId, // Linking with Video Model
        ref: 'Video'
    }],
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    level: {
        type: String,
        required: [true, 'Level is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
