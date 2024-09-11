const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course/index'); // Correct controller path

// POST request to create a new course
router.post('/create', courseController.createCourse);

// GET request to get all courses
router.get('/', courseController.getAllCourses);

// GET request to get a specific course by ID
router.get('/:id', courseController.getCourseById);

// GET request to get all courses by a specific userID
router.get('/user/:userID', courseController.getCoursesByUserId);

// PUT request to update a specific course by ID
router.put('/:id', courseController.updateCourseById);

// DELETE request to delete a specific course by ID
router.delete('/:id', courseController.deleteCourseById);

module.exports = router;
