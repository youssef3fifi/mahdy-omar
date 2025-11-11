const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import routes
const doctorsRouter = require('./routes/doctors');
const appointmentsRouter = require('./routes/appointments');
const patientsRouter = require('./routes/patients');

// Initialize Express app
const app = express();

// Configuration
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// CORS configuration for EC2 deployment
const corsOptions = {
  origin: '*', // Allow all origins for development. Configure with actual frontend URL in production
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
app.use('/api/doctors', doctorsRouter);
app.use('/api/appointments', appointmentsRouter);
app.use('/api/patients', patientsRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Doctor Management System API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Doctor Management System API',
    version: '1.0.0',
    endpoints: {
      doctors: '/api/doctors',
      appointments: '/api/appointments',
      patients: '/api/patients',
      health: '/api/health'
    }
  });
});

// Serve index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║     Doctor Management System - Server Running            ║
╠═══════════════════════════════════════════════════════════╣
║  Server:    http://${HOST}:${PORT}                        ║
║  API:       http://${HOST}:${PORT}/api                    ║
║  Doctors:   http://${HOST}:${PORT}/api/doctors            ║
║  Appointments: http://${HOST}:${PORT}/api/appointments    ║
║  Patients:  http://${HOST}:${PORT}/api/patients           ║
║  Health:    http://${HOST}:${PORT}/api/health             ║
╠═══════════════════════════════════════════════════════════╣
║  Environment: ${process.env.NODE_ENV || 'development'}
║  Ready for AWS EC2 deployment                             ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
