const express = require('express');
const router = express.Router();
const storage = require('../data/storage');

// Get all appointments
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: storage.appointments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching appointments',
      error: error.message
    });
  }
});

// Get appointment by ID
router.get('/:id', (req, res) => {
  try {
    const appointment = storage.appointments.find(a => a.id === parseInt(req.params.id));
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }
    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching appointment',
      error: error.message
    });
  }
});

// Book new appointment
router.post('/', (req, res) => {
  try {
    const { doctorId, patientName, patientEmail, patientPhone, date, time, status, notes } = req.body;
    
    // Validation
    if (!doctorId || !patientName || !patientEmail || !patientPhone || !date || !time) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: doctorId, patientName, patientEmail, patientPhone, date, time'
      });
    }

    // Check if doctor exists
    const doctor = storage.doctors.find(d => d.id === parseInt(doctorId));
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    const newAppointment = {
      id: storage.appointments.length > 0 ? Math.max(...storage.appointments.map(a => a.id)) + 1 : 1,
      doctorId: parseInt(doctorId),
      patientName,
      patientEmail,
      patientPhone,
      date,
      time,
      status: status || 'pending',
      notes: notes || ''
    };

    storage.appointments.push(newAppointment);
    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: newAppointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error booking appointment',
      error: error.message
    });
  }
});

// Update appointment
router.put('/:id', (req, res) => {
  try {
    const appointmentIndex = storage.appointments.findIndex(a => a.id === parseInt(req.params.id));
    if (appointmentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    const updatedAppointment = {
      ...storage.appointments[appointmentIndex],
      ...req.body,
      id: storage.appointments[appointmentIndex].id // Preserve ID
    };

    storage.appointments[appointmentIndex] = updatedAppointment;
    res.json({
      success: true,
      message: 'Appointment updated successfully',
      data: updatedAppointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating appointment',
      error: error.message
    });
  }
});

// Cancel/Delete appointment
router.delete('/:id', (req, res) => {
  try {
    const appointmentIndex = storage.appointments.findIndex(a => a.id === parseInt(req.params.id));
    if (appointmentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    const deletedAppointment = storage.appointments.splice(appointmentIndex, 1)[0];
    res.json({
      success: true,
      message: 'Appointment cancelled successfully',
      data: deletedAppointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error cancelling appointment',
      error: error.message
    });
  }
});

module.exports = router;
