const Course = require('../../models/Course'); // Ensure the correct path

const createCourse = async (req, res) => {
    try {
        const { title, subtitle, description, courseID, userID, price, level } = req.body;

        if (!title || !subtitle || !description || !courseID || !userID || !price || !level) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newCourse = new Course({
            title,
            subtitle,
            description,
            courseID,
            userID,
            price,
            level,
            createdAt: new Date()
        });

        const savedCourse = await newCourse.save();
        res.status(201).json({ message: 'Course created successfully', newCourse: savedCourse });
    } catch (error) {
        res.status(500).json({ message: 'Error creating course', error });
    }
};

// Get course by ID, including linked videos
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('videos'); // Populate videos

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching course', error });
    }
};

// Get all courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses', error });
    }
};


// Get courses by userID
const getCoursesByUserId = async (req, res) => {
    try {
        const courses = await Course.find({ userID: req.params.userID });

        if (!courses.length) {
            return res.status(404).json({ message: 'No courses found for this user' });
        }

        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses for user', error });
    }
};

// Update a course by ID
const updateCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Find the course by ID and update it with the new data
        const updatedCourse = await Course.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({
            message: 'Course updated successfully',
            updatedCourse
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating course', error });
    }
};

// Delete a course by ID
const deleteCourseById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the course by ID and delete it
        const deletedCourse = await Course.findByIdAndDelete(id);

        if (!deletedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({
            message: 'Course deleted successfully',
            deletedCourse
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting course', error });
    }
};



module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    getCoursesByUserId,
    updateCourseById,
    deleteCourseById,
};

