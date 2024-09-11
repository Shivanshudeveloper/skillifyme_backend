const express = require('express');
const router = express.Router();
require('dotenv').config();
const {
  saveCertificate,
  getAllCertificates,
  getCertificateById,
  getAllCertificatesCount,
  getCertificatesCountByUserId,
} = require('../controllers/certificate');

// POST route for saving a certificate
router.post('/certificate', saveCertificate);

// GET route for fetching total count of all certificates (this should be above the /:id route)
router.get('/certificates/count', getAllCertificatesCount);

// GET route for fetching count of certificates by userUid (this should also be above the /:id route)
router.get('/certificates/user/:userUid/count', getCertificatesCountByUserId);

// GET route for fetching all certificates
router.get('/certificates', getAllCertificates);

// GET route for fetching a certificate by ID (this should be last)
router.get('/certificates/:id', getCertificateById);

module.exports = router;
