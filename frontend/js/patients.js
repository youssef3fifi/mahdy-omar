// Patients page functionality

let allPatients = [];
let allAppointments = [];

async function loadPatientsData() {
  try {
    showLoading();
    
    // Fetch both patients and appointments
    const [patientsRes, appointmentsRes] = await Promise.all([
      api.patients.getAll(),
      api.appointments.getAll()
    ]);

    allPatients = patientsRes.data;
    allAppointments = appointmentsRes.data;

    displayPatients(allPatients);
    
    hideLoading();
  } catch (error) {
    hideLoading();
    showToast('Error loading patients: ' + error.message, 'error');
    console.error('Patients error:', error);
  }
}

function displayPatients(patients) {
  const tbody = document.getElementById('patients-tbody');
  
  if (patients.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center">No patients found</td></tr>';
    return;
  }

  tbody.innerHTML = patients.map(patient => `
    <tr>
      <td>${patient.id}</td>
      <td>${patient.name}</td>
      <td>
        ${patient.email}<br>
        <small>${patient.phone}</small>
      </td>
      <td>${patient.dateOfBirth}</td>
      <td><small>${patient.medicalHistory}</small></td>
      <td>${patient.registeredDate}</td>
      <td>
        <button class="btn btn-secondary btn-small" onclick="viewPatient(${patient.id})">View</button>
        <button class="btn btn-primary btn-small" onclick="editPatient(${patient.id})">Edit</button>
      </td>
    </tr>
  `).join('');
}

function filterPatients() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();

  if (!searchTerm) {
    displayPatients(allPatients);
    return;
  }

  const filtered = allPatients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm) ||
    patient.email.toLowerCase().includes(searchTerm)
  );

  displayPatients(filtered);
}

async function handlePatientSubmit(event) {
  event.preventDefault();

  const patientData = {
    name: document.getElementById('patient-name').value,
    email: document.getElementById('patient-email').value,
    phone: document.getElementById('patient-phone').value,
    dateOfBirth: document.getElementById('patient-dob').value,
    medicalHistory: document.getElementById('patient-medical-history').value || 'None'
  };

  const patientId = document.getElementById('patient-id').value;

  try {
    showLoading();

    if (patientId) {
      // Update existing patient
      await api.patients.update(patientId, patientData);
      showToast('Patient updated successfully', 'success');
    } else {
      // Register new patient
      await api.patients.create(patientData);
      showToast('Patient registered successfully', 'success');
    }

    resetPatientForm();
    await loadPatientsData();
    hideLoading();
  } catch (error) {
    hideLoading();
    showToast('Error saving patient: ' + error.message, 'error');
    console.error('Save patient error:', error);
  }
}

function editPatient(patientId) {
  const patient = allPatients.find(p => p.id === patientId);
  if (!patient) return;

  document.getElementById('patient-id').value = patient.id;
  document.getElementById('patient-name').value = patient.name;
  document.getElementById('patient-email').value = patient.email;
  document.getElementById('patient-phone').value = patient.phone;
  document.getElementById('patient-dob').value = patient.dateOfBirth;
  document.getElementById('patient-medical-history').value = patient.medicalHistory;

  // Scroll to form
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function viewPatient(patientId) {
  const patient = allPatients.find(p => p.id === patientId);
  if (!patient) return;

  // Get patient appointments
  const patientAppointments = allAppointments.filter(a => 
    a.patientEmail === patient.email
  );

  const appointmentsHtml = patientAppointments.length > 0
    ? `
      <h3>Appointment History</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          ${patientAppointments.map(a => `
            <tr>
              <td>${a.date}</td>
              <td>${a.time}</td>
              <td><span class="status status-${a.status}">${a.status}</span></td>
              <td>${a.notes || '-'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `
    : '<p>No appointments found for this patient.</p>';

  document.getElementById('patient-details').innerHTML = `
    <div class="form-group">
      <strong>Name:</strong> ${patient.name}
    </div>
    <div class="form-group">
      <strong>Email:</strong> ${patient.email}
    </div>
    <div class="form-group">
      <strong>Phone:</strong> ${patient.phone}
    </div>
    <div class="form-group">
      <strong>Date of Birth:</strong> ${patient.dateOfBirth}
    </div>
    <div class="form-group">
      <strong>Medical History:</strong> ${patient.medicalHistory}
    </div>
    <div class="form-group">
      <strong>Registered Date:</strong> ${patient.registeredDate}
    </div>
    <hr>
    ${appointmentsHtml}
  `;

  document.getElementById('patient-modal').classList.add('show');
}

function closePatientModal() {
  document.getElementById('patient-modal').classList.remove('show');
}

function resetPatientForm() {
  document.getElementById('patient-form').reset();
  document.getElementById('patient-id').value = '';
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', loadPatientsData);
