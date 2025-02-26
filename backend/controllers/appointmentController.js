const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const moment = require("moment");

// 🚀 GET all appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("doctorId", "name");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
};

// 🚀 GET a specific appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate("doctorId", "name");
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointment", error });
  }
};

// 🚀 POST Create a new appointment with slot validation
const createAppointment = async (req, res) => {
  try {
    const { doctorId, date, duration, appointmentType, patientName, notes } = req.body;

    // Validate doctor existence
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // Convert date to moment format
    const appointmentStart = moment.utc(date, "YYYY-MM-DD HH:mm");
    const appointmentEnd = moment.utc(appointmentStart).add(duration, "minutes");

    // Check if the requested slot is available
    const overlappingAppointment = await Appointment.findOne({
      doctorId,
      date: { $gte: appointmentStart.toDate(), $lt: appointmentEnd.toDate() }
    });

    if (overlappingAppointment) {
      return res.status(400).json({ message: "Time slot already booked. Choose another slot." });
    }

    // Create and save the appointment
    const newAppointment = new Appointment({
      doctorId,
      date: appointmentStart.toDate(),
      duration,
      appointmentType,
      patientName,
      notes,
    });

    await newAppointment.save();
    // Emit real-time update to all clients
    const io = req.app.get("io");
    io.emit("appointmentUpdated", { doctorId });

    res.status(201).json({ message: "Appointment booked successfully", newAppointment });
  } catch (error) {
    res.status(500).json({ message: "Error booking appointment", error });
  }
};

// 🚀 PUT Update an appointment with slot validation
const updateAppointment = async (req, res) => {
  try {
    const { date, duration } = req.body;
    const appointmentId = req.params.id;

    // Find the existing appointment
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    const doctorId = appointment.doctorId;

    // Convert new date to moment format
    const newStart = moment.utc(date, "YYYY-MM-DD HH:mm");
    const newEnd = moment.utc(newStart).add(duration, "minutes");

    // Check if the new slot is available (excluding the current appointment)
    const overlappingAppointment = await Appointment.findOne({
      doctorId,
      _id: { $ne: appointmentId }, // Exclude current appointment
      date: { $gte: newStart.toDate(), $lt: newEnd.toDate() }
    });

    if (overlappingAppointment) {
      return res.status(400).json({ message: "New time slot is already booked. Choose another slot." });
    }

    // Update the appointment
    appointment.date = newStart.toDate();
    appointment.duration = duration;
    await appointment.save();

    // Emit real-time update
    const io = req.app.get("io");
    io.emit("appointmentUpdated", { doctorId });

    res.json({ message: "Appointment updated successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: "Error updating appointment", error });
  }
};

// 🚀 DELETE Cancel an appointment
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    // Emit real-time update
    const io = req.app.get("io");
    io.emit("appointmentUpdated", { doctorId: appointment.doctorId });


    res.json({ message: "Appointment canceled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting appointment", error });
  }
};

module.exports = { 
  getAppointments, 
  getAppointmentById, 
  createAppointment, 
  updateAppointment, 
  deleteAppointment 
};
