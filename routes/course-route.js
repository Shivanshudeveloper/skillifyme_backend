const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course/index'); // Correct controller path

router.post('/create', courseController.createCourse);
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.get('/user/:userID', courseController.getCoursesByUserId);
router.put('/:id', courseController.updateCourseById);
router.delete('/:id', courseController.deleteCourseById);

module.exports = router;
