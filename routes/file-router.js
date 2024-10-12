const express = require('express');
const router = express.Router();
const {
    createFile,
    getAllFiles,
    getFileById,
    markAsFavorite,
    updateFileById,
    deleteFileById,
    getFilesByCourseId
} = require('../controllers/file/file'); 

// CRUD routes for file management
router.post('/file', createFile);             // Create file route
router.get('/getfiles', getAllFiles);         // Get all files
router.get('/getfiles/:id', getFileById);     // Get file by ID
router.put('/favoritefile/:id', markAsFavorite); // Mark file as favorite
router.put('/updatefile/:id', updateFileById); // Update file by ID
router.delete('/deletefile/:id', deleteFileById); // Delete file by ID
router.get('/course/:courseID', getFilesByCourseId); // Fetch files for a course

module.exports = router;
