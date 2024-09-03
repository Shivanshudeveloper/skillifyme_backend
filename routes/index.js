const express = require('express');
const router = express.Router();

require('dotenv').config();


// Auth
const validateController = require('../auth').validateToken;
const validateApiKeyController = require('../auth').authenticateApiKey;

// Controllers
const tokensController = require('../controllers/tokens');


const userController = require('../controllers/users');


router.get('/test', (req, res) => {
    res.send('Working');
});



// Generate new token for users
router.get('/getnewtoken', tokensController.generateUserToken);

// Users
router.get('/checkuser', validateApiKeyController, userController.checkUser);
router.post('/registeruser', userController.addRegisteredUser);
router.get('/getuser/:email', userController.getUserDetials);





module.exports = router;