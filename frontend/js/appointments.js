// Appointments page functionality

let allAppointments = [];
let allDoctors = [];

async function loadAppointmentsData() {
  try {
    showLoading();
    
    // Fetch both appointments and doctors
    const [appointmentsRes, doctorsRes] = await Promise.all([
      api.appointments.getAll(),
      api.doctors.getAll()
    ]);

    allAppointments = appointmentsRes.data;
    allDoctors = doctorsRes.data;

    // Populate doctor dropdowns
    populateDoctorDropdowns();
    
    // Pre-select doctor if passed in URL
    const urlParams = new URLSearchParams(window.location.search);
    const doctorId = urlParams.get('doctor');
    if (doctorId) {
      document.getElementById('appointment-doctor').value = doctorId;
    }

    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('appointment-date').value = today;

    // Display appointments
    displayAppointments(allAppointments);
    
    hideLoading();
  } catch (error) {
    hideLoading();
    showToast('Error loading appointments: ' + error.message, 'error');
    console.error('Appointments error:', error);
  }
}

function populateDoctorDropdowns() {
  const appointmentDoctorSelect = document.getElementById('appointment-doctor');
  const doctorFilterSelect = document.getElementById('doctor-filter');

  const doctorOptions = allDoctors.map(doctor => 
    `<option value="${doctor.id}">${doctor.name} - ${doctor.specialty}</option>`
  ).join('');

  appointmentDoctorSelect.innerHTML = '<option value="">Choose a doctor</option>' + doctorOptions;
  doctorFilterSelect.innerHTML = '<option value="">All Doctors</option>' + doctorOptions;
}

function displayAppointments(appointments) {
  const tbody = document.getElementById('appointments-tbody');
  
  if (appointments.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center">No appointments found</td></tr>';
    return;
  }

  tbody.innerHTML = appointments.map(appointment => {
    const doctor = allDoctors.find(d => d.id === appointment.doctorId);
    const doctorName = doctor ? doctor.name : 'Unknown Doctor';
    
    return `
      <tr>
        <td>${appointment.id}</td>
        <td>${doctorName}</td>
        <td>
          ${appointment.patientName}<br>
          <small>${appointment.patientEmail}</small>
        </td>
        <td>${appointment.date}</td>
        <td>${appointment.time}</td>
        <td><span class="status status-${appointment.status}">${appointment.status}</span></td>
        <td>
          <button class="btn btn-secondary btn-small" onclick="editAppointment(${appointment.id})">Edit</button>
          <button class="btn btn-danger btn-small" onclick="cancelAppointment(${appointment.id})">Cancel</button>
        </td>
      </tr>
    `;
  }).join('');
}

function filterAppointments() {
  const doctorFilter = document.getElementById('doctor-filter').value;
  const statusFilter = document.getElementById('status-filter').value;
  const dateFilter = document.getElementById('date-filter').value;

  let filtered = allAppointments;

  if (doctorFilter) {
    filtered = filtered.filter(a => a.doctorId === parseInt(doctorFilter));
  }

  if (statusFilter) {
    filtered = filtered.filter(a => a.status === statusFilter);
  }

  if (dateFilter) {
    filtered = filtered.filter(a => a.date === dateFilter);
  }

  displayAppointments(filtered);
}

async function handleAppointmentSubmit(event) {
  event.preventDefault();

  const appointmentData = {
    doctorId: parseInt(document.getElementById('appointment-doctor').value),
    patientName: document.getElementById('appointment-patient-name').value,
    patientEmail: document.getElementById('appointment-patient-email').value,
    patientPhone: document.getElementById('appointment-patient-phone').value,
    date: document.getElementById('appointment-date').value,
    time: document.getElementById('appointment-time').value,
    status: document.getElementById('appointment-status').value,
    notes: document.getElementById('appointment-notes').value
  };

  const appointmentId = document.getElementById('appointment-id').value;

  try {
    showLoading();

    if (appointmentId) {
      // Update existing appointment
      await api.appointments.update(appointmentId, appointmentData);
      showToast('Appointment updated successfully', 'success');
    } else {
      // Book new appointment
      await api.appointments.create(appointmentData);
      showToast('Appointment booked successfully', 'success');
    }

    resetAppointmentForm();
    await loadAppointmentsData();
    hideLoading();
  } catch (error) {
    hideLoading();
    showToast('Error saving appointment: ' + error.message, 'error');
    console.error('Save appointment error:', error);
  }
}

function editAppointment(appointmentId) {
  const appointment = allAppointments.find(a => a.id === appointmentId);
  if (!appointment) return;

  document.getElementById('appointment-id').value = appointment.id;
  document.getElementById('appointment-doctor').value = appointment.doctorId;
  document.getElementById('appointment-patient-name').value = appointment.patientName;
  document.getElementById('appointment-patient-email').value = appointment.patientEmail;
  document.getElementById('appointment-patient-phone').value = appointment.patientPhone;
  document.getElementById('appointment-date').value = appointment.date;
  document.getElementById('appointment-time').value = appointment.time;
  document.getElementById('appointment-status').value = appointment.status;
  document.getElementById('appointment-notes').value = appointment.notes;

  // Scroll to form
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function cancelAppointment(appointmentId) {
  if (!confirm('Are you sure you want to cancel this appointment?')) {
    return;
  }

  try {
    showLoading();
    await api.appointments.delete(appointmentId);
    showToast('Appointment cancelled successfully', 'success');
    await loadAppointmentsData();
    hideLoading();
  } catch (error) {
    hideLoading();
    showToast('Error cancelling appointment: ' + error.message, 'error');
    console.error('Cancel appointment error:', error);
  }
}

function resetAppointmentForm() {
  document.getElementById('appointment-form').reset();
  document.getElementById('appointment-id').value = '';
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('appointment-date').value = today;
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', loadAppointmentsData);
