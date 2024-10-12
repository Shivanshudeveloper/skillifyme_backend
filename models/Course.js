const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Course title is required']
    },
    subtitle : {
        type : String, 
        required : [true, "Course Sub-title is required"]
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
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    createdAt: {
        type: Date,
        default: Date.now 
    },
    level : {
        type : String,
        required : [true, "Level is required"]
    }
});

const Course = mongoose.model('Course', courseSchema); // Capitalized model name
module.exports = Course;
