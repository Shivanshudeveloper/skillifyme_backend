// routes/user-router.js
const express = require('express');
const userController = require('../controllers/user/index');
const router = express.Router();

// Create a new user
router.post('/users/create', userController.createUser);

// Get all users
router.get('/users', userController.getUsers);

// Get a user by ID
router.get('/users/:id', userController.getUserById);

// Update a user by ID
router.put('/users/:id', userController.updateUser);

// Delete a user by ID
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
