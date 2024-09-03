const express = require('express');
const router = express.Router();

require('dotenv').config();

// Controllers
const featuresController = require('../controllers/features');



router.get('/test', (req, res) => {
    res.send('Working');
});


// Generate new token for users
router.post('/checkmail', featuresController.checkSpamEmailList);
router.post('/websitecheck', featuresController.checkWebsite);

module.exports = router;