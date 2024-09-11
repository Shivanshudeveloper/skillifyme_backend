const express = require('express');
const router = express.Router();
const videoController = require('../controllers/Video/index'); // Adjust the path as needed

// POST request to create a new video
router.post('/create', videoController.createVideo);

// GET request to get all videos
router.get('/', videoController.getAllVideos);

// GET request to get a specific video by ID
router.get('/:id', videoController.getVideoById);

// GET request to get all videos by a specific userID
router.get('/user/:userID', videoController.getVideosByUserId);

// PUT request to update a specific video by ID
router.put('/:id', videoController.updateVideoById);

// DELETE request to delete a specific video by ID
router.delete('/:id', videoController.deleteVideoById);


module.exports = router;
