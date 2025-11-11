const express = require('express');
const router = express.Router();
const storage = require('../data/storage');

// Get all patients
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: storage.patients
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching patients',
      error: error.message
    });
  }
});

// Get patient by ID
router.get('/:id', (req, res) => {
  try {
    const patient = storage.patients.find(p => p.id === parseInt(req.params.id));
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }
    res.json({
      success: true,
      data: patient
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching patient',
      error: error.message
    });
  }
});

// Register new patient
router.post('/', (req, res) => {
  try {
    const { name, email, phone, dateOfBirth, medicalHistory } = req.body;
    
    // Validation
    if (!name || !email || !phone || !dateOfBirth) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, phone, dateOfBirth'
      });
    }

    const newPatient = {
      id: storage.patients.length > 0 ? Math.max(...storage.patients.map(p => p.id)) + 1 : 1,
      name,
      email,
      phone,
      dateOfBirth,
      medicalHistory: medicalHistory || 'None',
      registeredDate: new Date().toISOString().split('T')[0]
    };

    storage.patients.push(newPatient);
    res.status(201).json({
      success: true,
      message: 'Patient registered successfully',
      data: newPatient
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error registering patient',
      error: error.message
    });
  }
});

// Update patient
router.put('/:id', (req, res) => {
  try {
    const patientIndex = storage.patients.findIndex(p => p.id === parseInt(req.params.id));
    if (patientIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    const updatedPatient = {
      ...storage.patients[patientIndex],
      ...req.body,
      id: storage.patients[patientIndex].id, // Preserve ID
      registeredDate: storage.patients[patientIndex].registeredDate // Preserve registration date
    };

    storage.patients[patientIndex] = updatedPatient;
    res.json({
      success: true,
      message: 'Patient updated successfully',
      data: updatedPatient
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating patient',
      error: error.message
    });
  }
});

module.exports = router;
