const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

// Set up session middleware
app.use(session({
  secret: 'your_secret_key_here',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 } // Session expires after 1 hour of inactivity
}));

// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to check if user is logged in
function requireLogin(req, res, next) {
  if (req.session && req.session.userId) {
    // User is logged in, proceed to the next middleware
    next();
  } else {
    // User is not logged in, redirect to login page
    res.redirect('/login');
  }
}

// Middleware to update session expiration time on user activity
function extendSession(req, res, next) {
  req.session._garbage = Date();
  req.session.touch();
  next();
}

// Apply middleware to extend session on user activity for specific routes
app.use(['/add-post', '/update-post', '/delete-post'], extendSession);

// Login route - serve login page
app.get('/login', (req, res) => {
  res.render('login'); // Render the login page (assuming you're using Handlebars)
});

// Handle login form submission
app.post('/login', (req, res) => {
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

// Logout route - handle user logout
app.get('/logout', (req, res) => {
  req.session.destroy(); // Destroy session
  res.redirect('/login'); // Redirect to login page after logout
});

// Dashboard route - example route that requires authentication
app.get('/dashboard', requireLogin, (req, res) => {
  // Render the dashboard page (assuming you're using Handlebars)
  res.render('dashboard');
});

// Example route that requires authentication
app.get('/add-post', requireLogin, (req, res) => {
  // Render the add post page (assuming you're using Handlebars)
  res.render('add-post');
});

// More routes can be added here as needed...

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
