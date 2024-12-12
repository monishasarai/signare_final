const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth'); 
const signatureRoutes = require('./routes/signature');

const app = express();

// Enable CORS for requests from frontend
app.use(cors({
  origin: 'http://localhost:3000', // Allow frontend on port 3000
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// Middleware to parse JSON and handle larger payloads
app.use(express.json({ limit: '10mb' })); // Increase JSON payload size limit
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/yourdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Define the root route for basic testing
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// API routes
app.use('/api/auth', authRoutes); // Mount auth routes on /api/auth
app.use('/api/signature', signatureRoutes); // Mount signature routes on /api/signature

// 404 Error Handling for Undefined Routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});
const path = require('path');

// Serve static files (images, etc.) from the 'deep_learning' folder
app.use('/backend/deep_learning', express.static(path.join(__dirname, 'deep_learning')));

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
