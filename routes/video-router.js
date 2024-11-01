const express = require('express');
const router = express.Router();
const videoController = require('../controllers/Video/index');

router.post('/create', videoController.createVideo); 
router.get('/', videoController.getAllVideos);
router.get('/:id', videoController.getVideoById);
router.get('/user/:userID', videoController.getVideosByUserId);
router.put('/:id', videoController.updateVideoById);
router.delete('/:id', videoController.deleteVideoById);
router.get('/course/:courseID', videoController.getVideosByCourseId); // Fetch files for a course

module.exports = router;
