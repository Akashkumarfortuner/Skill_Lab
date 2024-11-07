// app.js
const express = require('express');
const cors = require('cors'); // Import the CORS package
const app = express();
const violationRoutes = require('./routes/violations');

// Use CORS middleware
app.use(cors()); // This will allow requests from any origin (for development)

// Middleware to parse JSON
app.use(express.json());

// Base route
app.get('/', (req, res) => {
  res.send('Traffic Violation Management System is running');
});

// Violation routes (Make sure 'violations' matches the path you want to use)
app.use('/violations', violationRoutes);

// Start the server on port 3001 (or 3000 depending on your setup)
const PORT = process.env.PORT || 3001;  // Ensure the port is 3001 if you want to match Postman request
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
