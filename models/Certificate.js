const mongoose = require('mongoose');

const certificate = new mongoose.Schema({
    userEmail: {
    type: String,
    required: true,
    default: "Untitled", 
  },
  certificate_url: {
    type: String,
    required: true,
  },
  userUid: {
    type: String,
    required: true,
    default: "Untitled", 
  },
});

const Certificate = mongoose.model('certificate', certificate);
module.exports = Certificate;
