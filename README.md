# Doctor Management System

A professional full-stack Doctor Management System built with Node.js, Express, and vanilla JavaScript. Designed for easy deployment on AWS EC2 with HTTP IP configuration support.

## 🌟 Features

- **Doctor Management**: Add, edit, view, and delete doctor profiles
- **Appointment Booking**: Schedule and manage patient appointments
- **Patient Registration**: Register and manage patient records
- **Real-time Statistics**: Dashboard with system statistics
- **Search & Filter**: Find doctors by specialty, search patients and appointments
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Professional UI**: Clean, modern medical-themed interface
- **AWS EC2 Ready**: Configured for easy deployment on AWS EC2

## 🏗️ Technology Stack

### Backend
- Node.js & Express.js
- In-memory data storage (JavaScript Arrays)
- RESTful API architecture
- CORS enabled for cross-origin requests

### Frontend
- HTML5, CSS3, JavaScript (Vanilla JS)
- Responsive design
- Modern UI/UX
- No framework dependencies

## 📁 Project Structure

```
mahdy-omar/
├── backend/
│   ├── server.js           # Main Express server
│   ├── routes/
│   │   ├── doctors.js      # Doctors API endpoints
│   │   ├── appointments.js # Appointments API endpoints
│   │   └── patients.js     # Patients API endpoints
│   └── data/
│       └── storage.js      # In-memory data storage
├── frontend/
│   ├── index.html          # Dashboard page
│   ├── doctors.html        # Doctors management page
│   ├── appointments.html   # Appointments page
│   ├── patients.html       # Patients page
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   └── js/
│       ├── config.js       # API configuration
│       ├── api.js          # API utility functions
│       ├── dashboard.js    # Dashboard logic
│       ├── doctors.js      # Doctors page logic
│       ├── appointments.js # Appointments logic
│       └── patients.js     # Patients logic
├── deployment/
│   ├── README.md           # AWS deployment guide
│   └── setup.sh            # Automated setup script
├── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 14.x or higher
- npm 6.x or higher

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/youssef3fifi/mahdy-omar.git
   cd mahdy-omar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Access the application**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## 📡 API Endpoints

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `POST /api/doctors` - Add new doctor
- `PUT /api/doctors/:id` - Update doctor
- `DELETE /api/doctors/:id` - Delete doctor

### Appointments
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `POST /api/appointments` - Book appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Patients
- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get patient by ID
- `POST /api/patients` - Register patient
- `PUT /api/patients/:id` - Update patient

### Health Check
- `GET /api/health` - API health check

## 🌐 AWS EC2 Deployment

### Quick Setup (Using Script)

1. Launch an Ubuntu EC2 instance
2. Configure security groups (ports 22, 80, 3000)
3. Connect to your instance via SSH
4. Run the setup script:
   ```bash
   curl -O https://raw.githubusercontent.com/youssef3fifi/mahdy-omar/main/deployment/setup.sh
   chmod +x setup.sh
   ./setup.sh
   ```

### Manual Setup

See the detailed [AWS Deployment Guide](deployment/README.md) for step-by-step instructions.

## 📱 Pages

### Dashboard (`index.html`)
- System statistics overview
- Total doctors, appointments, and patients count
- Featured doctors section
- Quick action buttons

### Doctors Page (`doctors.html`)
- View all doctors in grid layout
- Search and filter by specialty
- Add, edit, and delete doctors
- Book appointments directly from doctor cards

### Appointments Page (`appointments.html`)
- Book new appointments
- View all appointments in table format
- Filter by doctor, status, and date
- Edit and cancel appointments

### Patients Page (`patients.html`)
- Register new patients
- View patient list
- Search patients
- View patient details and appointment history

## 🎨 Sample Data

The application comes pre-loaded with:
- 6 sample doctors across different specialties
- 4 sample patients
- 4 sample appointments

**Note**: Data is stored in memory and will reset on server restart.

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
NODE_ENV=production
HOST=0.0.0.0
```

### API Configuration

The frontend automatically detects whether it's running locally or on EC2:
- Local: `http://localhost:3000`
- EC2: `http://{EC2-IP}:3000`

## 🛡️ Security Considerations

For production deployment:
- Use HTTPS with SSL certificate
- Implement authentication and authorization
- Restrict CORS to specific domains
- Use a real database instead of in-memory storage
- Implement rate limiting
- Regular security updates

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Authors

Developed for healthcare management and AWS deployment demonstration.

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Note**: This is a demonstration project using in-memory storage. For production use, implement a proper database solution and security measures.