// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   companyName: {
//     type: String,
//     required: false,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   organizationId: {
//     type: String,
//     required: true,
//   },
//   plan: {
//     type: String,
//     required: true,
//     default: 'basic', 
//   },
//   apiKey: {
//     type: String,
//     required: false,
//   },
//   accountStatus: {
//     type: Number,
//     required: false,
//     default: 1, 
//   },
//   customerId: {
//     type: String,
//     required: false
//   },
//   subscriptionId: {
//     type: String,
//     required: false
//   },
//   trialEnd: {
//     type: String,
//     required: false
//   },
//   subscriptionStatus: {
//     type: String,
//     required: false
//   },
//   alertSeen: {
//     type: Boolean,
//     required: false,
//     default: false
//   },
//   avatar: {
//     type: String,
//     required: false,
//   },
//   termsAndCondition: {
//     type: Boolean,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const User = mongoose.model('users', userSchema);
// module.exports = User;




// models/user-model.js
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  countryCode: { type: String },
  phone: { type: String },
  title: { type: String },
  bio: { type: String },
  avatarUrl: { type: String, default: '/assets/avatar.png' },
}, { timestamps: true });

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
