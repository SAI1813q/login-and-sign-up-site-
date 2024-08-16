// src/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret_key'; // Replace with a more secure key


// Register route
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).send('User registered');
  } catch (err) {
    res.status(400).send('Error registering user');
  }
});

// src/routes/auth.js

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send('Invalid credentials');
    }
    
    // Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Send user info and token
    res.json({
      token,
      user: {
        username: user.username,
        email: user.email, // Include any other user information as needed
        // Add more user fields as necessary
      }
    });
  } catch (err) {
    res.status(400).send('Error logging in');
  }
});


module.exports = router;
