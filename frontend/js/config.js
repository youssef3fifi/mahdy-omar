// API Configuration for both local and AWS EC2 deployment

const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000'
  : `http://${window.location.hostname}:3000`;

console.log('API Base URL:', API_BASE_URL);
