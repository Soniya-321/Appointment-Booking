# Advanced Babysteps Appointment Booking System

## Overview
This is a full-stack appointment booking system for prenatal care services. Users can view a doctor's available time slots and book appointments accordingly. The application is built using **Node.js/Express** for the backend, **MongoDB** for data storage, and **React** for the frontend.

The system ensures that available appointment slots are correctly computed based on the doctor's working hours and prevents double bookings.

---

## Technologies Used
- **Backend:** Node.js, Express, MongoDB
- **Frontend:** React, Material-UI
- **State Management:** React State/Redux (optional)
- **Date Handling:** date-fns/moment.js
- **Optional:** WebSocket (for real-time updates)

---

## Features
### **Backend (Node.js + Express + MongoDB)**
#### **Data Models:**
1. **Doctor Model:**
   - `name`: Doctor's name (String)
   - `workingHours`: Daily working hours (Object) `{ start: "09:00", end: "17:00" }`
   - `specialization`: Doctor’s specialization

2. **Appointment Model:**
   - `doctorId`: Reference to a Doctor (ObjectId)
   - `date`: Appointment date and time (Date)
   - `duration`: Duration in minutes (Number)
   - `appointmentType`: Type of appointment (String)
   - `patientName`: Patient's name (String)
   - `notes`: Additional notes (String, optional)

#### **API Endpoints:**
- **Doctor Endpoints:**
  - `GET /doctors` → Retrieve list of doctors
  - `GET /doctors/:id/slots?date=YYYY-MM-DD` → Get available time slots for a doctor
- **Appointment Endpoints:**
  - `GET /appointments` → Retrieve all appointments
  - `GET /appointments/:id` → Retrieve details of a specific appointment
  - `POST /appointments` → Create an appointment (with availability validation)
  - `PUT /appointments/:id` → Update an appointment (ensuring time slot availability)
  - `DELETE /appointments/:id` → Cancel an appointment

#### **Additional Considerations:**
- **Time Slot Calculation:** Ensure appointments are scheduled at fixed intervals (e.g., 30 min)
- **Validation & Error Handling:** Handle incorrect inputs and time slot conflicts gracefully
- **(Optional) Real-Time Updates:** Use WebSocket/Socket.io to notify users of real-time slot updates

---

### **Frontend (React + Material-UI)**
#### **User Interface:**
- **Doctor Selection:** Users can view a list of doctors and select one
- **Calendar & Slot View:** Displays available slots for a selected doctor
- **Appointment Booking:** Users can book an appointment by filling in details
- **Appointment Management:** View, edit, or cancel existing appointments

#### **State Management & API Integration:**
- Handle API requests with loading states and error handling
- Maintain state for doctors, available slots, and booked appointments

#### **UI/UX Considerations:**
- Intuitive and minimal design
- Use Material-UI for faster development

---

## Installation & Setup
### **Backend Setup**
```bash
# Clone the repository
git clone <repo-url>
cd backend

# Install dependencies
npm install

# Set up environment variables (.env)
PORT=5000
MONGO_URI=mongodb+srv://soniya:soniya_123@cluster0.hfx4l.mongodb.net/appointmentDB?retryWrites=true&w=majority&appName=Cluster0

# Run the backend server
npx nodemon server.js
```

### **Frontend Setup**
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the React application
npm start
```

---

## Assumptions & Design Decisions
- **Authentication is not required** for this version.
- **Doctors have fixed working hours** (same for all weekdays).
- **Appointments have fixed durations** (e.g., 30 or 60 minutes).
- **Slot calculations consider existing bookings** to prevent conflicts.

---

## Evaluation Criteria
- **Functionality:** Correct computation of available time slots and prevention of double bookings
- **Code Quality:** Clean, modular, and maintainable
- **Problem Solving:** Efficient handling of time calculations and slot management
- **Error Handling:** Graceful error management on client and server sides
- **API Integration & UX:** Seamless interaction between frontend and backend
- **Documentation:** Clear setup instructions and code documentation

---





