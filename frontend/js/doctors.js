// Doctors page functionality

let allDoctors = [];

async function loadDoctors() {
  try {
    showLoading();
    const response = await api.doctors.getAll();
    allDoctors = response.data;
    displayDoctors(allDoctors);
    hideLoading();
  } catch (error) {
    hideLoading();
    showToast('Error loading doctors: ' + error.message, 'error');
    console.error('Doctors error:', error);
  }
}

function displayDoctors(doctors) {
  const container = document.getElementById('doctors-grid');
  
  if (doctors.length === 0) {
    container.innerHTML = '<p class="text-center">No doctors found</p>';
    return;
  }

  container.innerHTML = doctors.map(doctor => `
    <div class="doctor-card" id="doctor-${doctor.id}">
      <img src="${doctor.image}" alt="${doctor.name}">
      <div class="doctor-card-content">
        <h3>${doctor.name}</h3>
        <div class="specialty">${doctor.specialty}</div>
        <div class="doctor-info">
          <div>⭐ Rating: <span class="rating">${doctor.rating}</span>/5</div>
          <div>📧 ${doctor.email}</div>
          <div>📞 ${doctor.phone}</div>
          <div>🎓 ${doctor.experience} years experience</div>
          <div>🕐 ${doctor.availability}</div>
        </div>
        <div class="doctor-actions">
          <a href="appointments.html?doctor=${doctor.id}" class="btn btn-primary btn-small">Book Appointment</a>
          <button class="btn btn-secondary btn-small" onclick="openEditDoctorModal(${doctor.id})">Edit</button>
          <button class="btn btn-danger btn-small" onclick="deleteDoctor(${doctor.id})">Delete</button>
        </div>
      </div>
    </div>
  `).join('');
}

function filterDoctors() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const specialtyFilter = document.getElementById('specialty-filter').value;

  let filtered = allDoctors;

  if (searchTerm) {
    filtered = filtered.filter(doctor => 
      doctor.name.toLowerCase().includes(searchTerm)
    );
  }

  if (specialtyFilter) {
    filtered = filtered.filter(doctor => 
      doctor.specialty === specialtyFilter
    );
  }

  displayDoctors(filtered);
}

function openAddDoctorModal() {
  document.getElementById('modal-title').textContent = 'Add Doctor';
  document.getElementById('doctor-form').reset();
  document.getElementById('doctor-id').value = '';
  document.getElementById('doctor-modal').classList.add('show');
}

function openEditDoctorModal(doctorId) {
  const doctor = allDoctors.find(d => d.id === doctorId);
  if (!doctor) return;

  document.getElementById('modal-title').textContent = 'Edit Doctor';
  document.getElementById('doctor-id').value = doctor.id;
  document.getElementById('doctor-name').value = doctor.name;
  document.getElementById('doctor-specialty').value = doctor.specialty;
  document.getElementById('doctor-email').value = doctor.email;
  document.getElementById('doctor-phone').value = doctor.phone;
  document.getElementById('doctor-experience').value = doctor.experience;
  document.getElementById('doctor-rating').value = doctor.rating;
  document.getElementById('doctor-availability').value = doctor.availability;
  document.getElementById('doctor-image').value = doctor.image;
  
  document.getElementById('doctor-modal').classList.add('show');
}

function closeDoctorModal() {
  document.getElementById('doctor-modal').classList.remove('show');
}

async function handleDoctorSubmit(event) {
  event.preventDefault();

  const doctorData = {
    name: document.getElementById('doctor-name').value,
    specialty: document.getElementById('doctor-specialty').value,
    email: document.getElementById('doctor-email').value,
    phone: document.getElementById('doctor-phone').value,
    experience: parseInt(document.getElementById('doctor-experience').value) || 0,
    rating: parseFloat(document.getElementById('doctor-rating').value) || 0,
    availability: document.getElementById('doctor-availability').value || 'Not specified',
    image: document.getElementById('doctor-image').value || 'https://via.placeholder.com/150'
  };

  const doctorId = document.getElementById('doctor-id').value;

  try {
    showLoading();

    if (doctorId) {
      // Update existing doctor
      await api.doctors.update(doctorId, doctorData);
      showToast('Doctor updated successfully', 'success');
    } else {
      // Add new doctor
      await api.doctors.create(doctorData);
      showToast('Doctor added successfully', 'success');
    }

    closeDoctorModal();
    await loadDoctors();
    hideLoading();
  } catch (error) {
    hideLoading();
    showToast('Error saving doctor: ' + error.message, 'error');
    console.error('Save doctor error:', error);
  }
}

async function deleteDoctor(doctorId) {
  if (!confirm('Are you sure you want to delete this doctor?')) {
    return;
  }

  try {
    showLoading();
    await api.doctors.delete(doctorId);
    showToast('Doctor deleted successfully', 'success');
    await loadDoctors();
    hideLoading();
  } catch (error) {
    hideLoading();
    showToast('Error deleting doctor: ' + error.message, 'error');
    console.error('Delete doctor error:', error);
  }
}

// Load doctors when page loads
document.addEventListener('DOMContentLoaded', loadDoctors);
