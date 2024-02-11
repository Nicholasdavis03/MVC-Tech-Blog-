const express = require('express');
const router = express.Router();

// Login route - serve login page
router.get('/', (req, res) => {
  res.render('login'); // Render the login page (assuming you're using Handlebars)
});

// Handle login form submission
router.post('/', (req, res) => {
  const { username, password } = req.body;
  
  // Example authentication logic (replace with your actual logic)
  if (username === 'admin' && password === 'password') {
    req.session.userId = 123; // Store user ID in session upon successful login
    res.redirect('/dashboard'); // Redirect to dashboard after login
  } else {
    // If authentication fails, render login page with error message
    res.render('login', { error: 'Invalid username or password' });
  }
});

module.exports = router;
