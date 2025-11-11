// Dashboard page functionality

async function loadDashboardData() {
  try {
    showLoading();

    // Fetch all data in parallel
    const [doctorsRes, appointmentsRes, patientsRes] = await Promise.all([
      api.doctors.getAll(),
      api.appointments.getAll(),
      api.patients.getAll()
    ]);

    // Update statistics
    document.getElementById('total-doctors').textContent = doctorsRes.data.length;
    document.getElementById('total-appointments').textContent = appointmentsRes.data.length;
    document.getElementById('total-patients').textContent = patientsRes.data.length;
    
    // Count pending appointments
    const pendingCount = appointmentsRes.data.filter(a => a.status === 'pending').length;
    document.getElementById('pending-appointments').textContent = pendingCount;

    // Display featured doctors (first 3)
    displayFeaturedDoctors(doctorsRes.data.slice(0, 3));

    hideLoading();
  } catch (error) {
    hideLoading();
    showToast('Error loading dashboard data: ' + error.message, 'error');
    console.error('Dashboard error:', error);
  }
}

function displayFeaturedDoctors(doctors) {
  const container = document.getElementById('featured-doctors');
  
  if (doctors.length === 0) {
    container.innerHTML = '<p>No doctors available</p>';
    return;
  }

  container.innerHTML = doctors.map(doctor => `
    <div class="doctor-card">
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
          <a href="doctors.html#doctor-${doctor.id}" class="btn btn-secondary btn-small">View Profile</a>
        </div>
      </div>
    </div>
  `).join('');
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', loadDashboardData);
