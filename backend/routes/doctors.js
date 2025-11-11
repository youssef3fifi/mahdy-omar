const express = require('express');
const router = express.Router();
const storage = require('../data/storage');

// Get all doctors
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: storage.doctors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching doctors',
      error: error.message
    });
  }
});

// Get doctor by ID
router.get('/:id', (req, res) => {
  try {
    const doctor = storage.doctors.find(d => d.id === parseInt(req.params.id));
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }
    res.json({
      success: true,
      data: doctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching doctor',
      error: error.message
    });
  }
});

// Add new doctor
router.post('/', (req, res) => {
  try {
    const { name, specialty, email, phone, experience, availability, rating, image } = req.body;
    
    // Validation
    if (!name || !specialty || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, specialty, email, phone'
      });
    }

    const newDoctor = {
      id: storage.doctors.length > 0 ? Math.max(...storage.doctors.map(d => d.id)) + 1 : 1,
      name,
      specialty,
      email,
      phone,
      experience: experience || 0,
      availability: availability || 'Not specified',
      rating: rating || 0,
      image: image || 'https://via.placeholder.com/150'
    };

    storage.doctors.push(newDoctor);
    res.status(201).json({
      success: true,
      message: 'Doctor added successfully',
      data: newDoctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding doctor',
      error: error.message
    });
  }
});

// Update doctor
router.put('/:id', (req, res) => {
  try {
    const doctorIndex = storage.doctors.findIndex(d => d.id === parseInt(req.params.id));
    if (doctorIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    const updatedDoctor = {
      ...storage.doctors[doctorIndex],
      ...req.body,
      id: storage.doctors[doctorIndex].id // Preserve ID
    };

    storage.doctors[doctorIndex] = updatedDoctor;
    res.json({
      success: true,
      message: 'Doctor updated successfully',
      data: updatedDoctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating doctor',
      error: error.message
    });
  }
});

// Delete doctor
router.delete('/:id', (req, res) => {
  try {
    const doctorIndex = storage.doctors.findIndex(d => d.id === parseInt(req.params.id));
    if (doctorIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    const deletedDoctor = storage.doctors.splice(doctorIndex, 1)[0];
    res.json({
      success: true,
      message: 'Doctor deleted successfully',
      data: deletedDoctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting doctor',
      error: error.message
    });
  }
});

module.exports = router;
