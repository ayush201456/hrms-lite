const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// API routes
const employeeRoutes = require('./routes/employees');
const attendanceRoutes = require('./routes/attendance');
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);

// New author endpoint
app.get('/api/author', (req, res) => {
  res.json({
    author: 'Ayush_gp',
    project: 'HRMS Lite',
    description: 'A lightweight HRMS for employee and attendance management.'
  });
});

// Serve React build (production)
app.use(express.static(path.join(__dirname, 'client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Developed by Ayush_gp'); // Author credit in console
});

// Developed by Ayush Gupta