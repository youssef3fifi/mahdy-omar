// API utility functions for making HTTP requests

const api = {
  // Generic fetch wrapper with error handling
  async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Doctors API
  doctors: {
    getAll: () => api.request('/api/doctors'),
    getById: (id) => api.request(`/api/doctors/${id}`),
    create: (data) => api.request('/api/doctors', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    update: (id, data) => api.request(`/api/doctors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    delete: (id) => api.request(`/api/doctors/${id}`, {
      method: 'DELETE'
    })
  },

  // Appointments API
  appointments: {
    getAll: () => api.request('/api/appointments'),
    getById: (id) => api.request(`/api/appointments/${id}`),
    create: (data) => api.request('/api/appointments', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    update: (id, data) => api.request(`/api/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    delete: (id) => api.request(`/api/appointments/${id}`, {
      method: 'DELETE'
    })
  },

  // Patients API
  patients: {
    getAll: () => api.request('/api/patients'),
    getById: (id) => api.request(`/api/patients/${id}`),
    create: (data) => api.request('/api/patients', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    update: (id, data) => api.request(`/api/patients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }
};

// Toast notification helper
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Loading overlay helper
function showLoading() {
  const overlay = document.createElement('div');
  overlay.id = 'loading-overlay';
  overlay.innerHTML = '<div class="spinner"></div>';
  document.body.appendChild(overlay);
}

function hideLoading() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    overlay.remove();
  }
}
