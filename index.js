const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('./auth');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/jwt_auth')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Failed to connect to MongoDB", err));


// Routes
app.use('/auth', authRoutes);

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
