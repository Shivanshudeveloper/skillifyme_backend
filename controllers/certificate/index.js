const Certificate = require('../../models/Certificate'); // Adjust the path based on your project structure

// Function to save certificate link (already defined)
const saveCertificate = async (req, res) => {
  const { userEmail, certificate_url, userUid } = req.body;

  try {
    // Create and save the new certificate document
    const newCertificate = new Certificate({
      userEmail,
      certificate_url,
      userUid,
    });

    await newCertificate.save();

    return res.status(201).json({
      message: 'Certificate saved successfully!',
      data: newCertificate,
    });
  } catch (error) {
    console.error('Error saving certificate:', error);
    return res.status(500).json({
      message: 'Failed to save certificate',
      error: error.message,
    });
  }
};

// Function to get all certificates
const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find(); // Fetch all certificate documents
    return res.status(200).json({
      message: 'Certificates fetched successfully!',
      data: certificates,
    });
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return res.status(500).json({
      message: 'Failed to fetch certificates',
      error: error.message,
    });
  }
};

// Function to get a certificate by ID
const getCertificateById = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch certificate by ID (as a string)
    const certificate = await Certificate.findOne({ _id: id });

    if (!certificate) {
      return res.status(404).json({
        message: 'Certificate not found',
      });
    }

    return res.status(200).json({
      message: 'Certificate fetched successfully!',
      data: certificate,
    });
  } catch (error) {
    console.error('Error fetching certificate by ID:', error);
    return res.status(500).json({
      message: 'Failed to fetch certificate by ID',
      error: error.message,
    });
  }
};

// Function to get the total count of all certificates
const getAllCertificatesCount = async (req, res) => {
  try {
    const count = await Certificate.countDocuments(); // Count all documents
    return res.status(200).json({
      message: 'Total certificates count fetched successfully!',
      count: count,
    });
  } catch (error) {
    console.error('Error fetching certificates count:', error);
    return res.status(500).json({
      message: 'Failed to fetch certificates count',
      error: error.message,
    });
  }
};

// Function to get the count of certificates by userUid
const getCertificatesCountByUserId = async (req, res) => {
  const { userUid } = req.params;

  try {
    const count = await Certificate.countDocuments({ userUid }); // Count documents by userUid
    return res.status(200).json({
      message: `Certificates count for user ${userUid} fetched successfully!`,
      count: count,
    });
  } catch (error) {
    console.error('Error fetching certificates count by userUid:', error);
    return res.status(500).json({
      message: `Failed to fetch certificates count for user ${userUid}`,
      error: error.message,
    });
  }
};

module.exports = {
  saveCertificate,
  getAllCertificates,
  getCertificateById,
  getAllCertificatesCount,
  getCertificatesCountByUserId,
};
