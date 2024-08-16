// src/index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./src/routes/auth');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
// Add this line to the existing src/index.js file
app.use(express.static('public'));


// MongoDB connection
mongoose.connect('mongodb://localhost:27017/loginapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
