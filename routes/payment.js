const express = require('express');
const router = express.Router();

require('dotenv').config();

const paymentController = require('../controllers/payment');


// Create Subscription
router.post('/createcheckoutsession', paymentController.createCheckoutSession);
router.get('/checkstatus/:customerId', paymentController.checkSubscriptionStatus);
router.put('/alertseen/:customerId', paymentController.alertSeen);


module.exports = router;