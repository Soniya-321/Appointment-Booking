import React, { useState } from "react";
import { bookAppointment } from "../api";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const BookingForm = ({ selectedSlot, selectedDate }) => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ patientName: "", appointmentType: "", duration: '', notes: "" });
  const [error, setError] = useState(null);

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!selectedSlot || !form.patientName || !form.appointmentType || !form.duration) {
      setError("Please fill all required fields and select a time slot.");
      return;
    }
    const formattedDateTime = dayjs(`${selectedDate}T${selectedSlot.start}`).toISOString();
    console.log(formattedDateTime);
    const appointmentData = {
      doctorId,
      date: formattedDateTime,
      duration: form.duration,
      patientName: form.patientName,
      appointmentType: form.appointmentType,
      notes: form.notes,
    };
    console.log(appointmentData);
    try {
      const response = await bookAppointment(appointmentData);

      console.log("Appointment booked:", response.data);
      alert("Appointment Booked Successfully");
      navigate("/appointments");
    } catch (error) {
      console.error("Booking failed:", error);
      setError("Booking failed. Please try again.");
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <TextField 
        label="Patient Name" style={{margin: "5px"}}
        fullWidth 
        onChange={(e) => setForm({ ...form, patientName: e.target.value })} 
      />
      
      <FormControl fullWidth style={{margin: "5px"}}>
        <InputLabel>Appointment Type</InputLabel>
        <Select
          value={form.appointmentType}
          onChange={(e) => setForm({ ...form, appointmentType: e.target.value })}
        >
          <MenuItem value="Routine Check-Up">Routine Check-Up</MenuItem>
          <MenuItem value="Ultrasound">Ultrasound</MenuItem>
          <MenuItem value="Dental Consultation">Dental Consultation</MenuItem>
          <MenuItem value="General Consultation">General Consultation</MenuItem>
        </Select>
      </FormControl>
      
      <TextField 
        label="Notes" style={{margin: "5px"}} 
        fullWidth 
        multiline 
        onChange={(e) => setForm({ ...form, notes: e.target.value })} 
      />
      <TextField 
        label="Duration" style={{margin: "5px"}}
        fullWidth 
        onChange={(e) => setForm({ ...form, duration: e.target.value })} 
      />
      
      <Button type="submit" variant="contained" style={{margin: "5px"}}>Book Appointment</Button>
    </form>
  );
};

export default BookingForm;
