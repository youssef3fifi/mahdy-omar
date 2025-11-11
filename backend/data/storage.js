// In-Memory Data Storage for Doctor Management System

let doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    email: "sarah.johnson@hospital.com",
    phone: "+1-555-0101",
    experience: 15,
    availability: "Mon-Fri, 9AM-5PM",
    rating: 4.8,
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Dermatology",
    email: "michael.chen@hospital.com",
    phone: "+1-555-0102",
    experience: 10,
    availability: "Mon-Thu, 10AM-6PM",
    rating: 4.6,
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    email: "emily.rodriguez@hospital.com",
    phone: "+1-555-0103",
    experience: 12,
    availability: "Tue-Sat, 8AM-4PM",
    rating: 4.9,
    image: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Neurology",
    email: "james.wilson@hospital.com",
    phone: "+1-555-0104",
    experience: 20,
    availability: "Mon-Wed, 9AM-3PM",
    rating: 4.7,
    image: "https://randomuser.me/api/portraits/men/52.jpg"
  },
  {
    id: 5,
    name: "Dr. Lisa Anderson",
    specialty: "Orthopedics",
    email: "lisa.anderson@hospital.com",
    phone: "+1-555-0105",
    experience: 14,
    availability: "Wed-Fri, 10AM-5PM",
    rating: 4.8,
    image: "https://randomuser.me/api/portraits/women/28.jpg"
  },
  {
    id: 6,
    name: "Dr. David Martinez",
    specialty: "General Practice",
    email: "david.martinez@hospital.com",
    phone: "+1-555-0106",
    experience: 8,
    availability: "Mon-Sat, 8AM-6PM",
    rating: 4.5,
    image: "https://randomuser.me/api/portraits/men/46.jpg"
  }
];

let patients = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1-555-1001",
    dateOfBirth: "1985-03-15",
    medicalHistory: "Hypertension, controlled with medication",
    registeredDate: "2023-01-15"
  },
  {
    id: 2,
    name: "Mary Johnson",
    email: "mary.johnson@email.com",
    phone: "+1-555-1002",
    dateOfBirth: "1990-07-22",
    medicalHistory: "Allergies to penicillin",
    registeredDate: "2023-02-20"
  },
  {
    id: 3,
    name: "Robert Brown",
    email: "robert.brown@email.com",
    phone: "+1-555-1003",
    dateOfBirth: "1978-11-08",
    medicalHistory: "Type 2 diabetes",
    registeredDate: "2023-03-10"
  },
  {
    id: 4,
    name: "Jennifer Davis",
    email: "jennifer.davis@email.com",
    phone: "+1-555-1004",
    dateOfBirth: "1995-05-30",
    medicalHistory: "Asthma",
    registeredDate: "2023-04-05"
  }
];

let appointments = [
  {
    id: 1,
    doctorId: 1,
    patientName: "John Smith",
    patientEmail: "john.smith@email.com",
    patientPhone: "+1-555-1001",
    date: "2024-01-15",
    time: "10:00 AM",
    status: "confirmed",
    notes: "Regular checkup"
  },
  {
    id: 2,
    doctorId: 3,
    patientName: "Mary Johnson",
    patientEmail: "mary.johnson@email.com",
    patientPhone: "+1-555-1002",
    date: "2024-01-16",
    time: "2:00 PM",
    status: "pending",
    notes: "Child vaccination"
  },
  {
    id: 3,
    doctorId: 4,
    patientName: "Robert Brown",
    patientEmail: "robert.brown@email.com",
    patientPhone: "+1-555-1003",
    date: "2024-01-17",
    time: "11:30 AM",
    status: "completed",
    notes: "Follow-up consultation"
  },
  {
    id: 4,
    doctorId: 2,
    patientName: "Jennifer Davis",
    patientEmail: "jennifer.davis@email.com",
    patientPhone: "+1-555-1004",
    date: "2024-01-18",
    time: "3:00 PM",
    status: "confirmed",
    notes: "Skin rash examination"
  }
];

module.exports = {
  doctors,
  patients,
  appointments
};
