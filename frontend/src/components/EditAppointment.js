import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserAppointments, updateAppointment } from "../api";
import { TextField, Button, Typography } from "@mui/material";
import dayjs from "dayjs";
import LoadingScreen from "../pages/LoadingScreen";
import Navbar from "../pages/Navbar";

const EditAppointment = () => {
  const { id } = useParams(); // Extract appointment ID from URL
  const navigate = useNavigate(); // Hook for navigation
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState({});

  // Fetch the appointment details
  useEffect(() => {
    getUserAppointments().then((res) => {
      const foundAppointment = res.data.find((a) => a._id === id);
      if (foundAppointment) {
        setAppointment(foundAppointment);
        setEditData({
          date: dayjs(foundAppointment.date).format("YYYY-MM-DDTHH:mm"),
          doctorName: foundAppointment.doctorId?.name || "",
          patientName: foundAppointment.patientName || "",
          appointmentType: foundAppointment.appointmentType || "",
          duration: foundAppointment.duration || "",
        });
      }
      setLoading(false);
    });
  }, [id]);

  const handleSaveEdit = async () => {
    const updatedAppointment = {
      ...appointment,
      date: editData.date,
      doctorId: { ...appointment.doctorId, name: editData.doctorName },
      patientName: editData.patientName,
      appointmentType: editData.appointmentType,
      duration: Number(editData.duration),
    };

    await updateAppointment(id, updatedAppointment);
    navigate("/appointments"); // Redirect back after saving
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  

  return (
    <>
    <Navbar/>
    {loading ? <LoadingScreen/> : 
    <div style={{ maxWidth: 400, margin: "auto", padding: "20px", textAlign: "center" }}>
      <Typography style={{color: "#004D40", fontWeight: "bold"}} variant="h5" gutterBottom>Edit Appointment</Typography>
      <TextField
        label="Date & Time"
        type="datetime-local"
        name="date"
        value={editData.date}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Doctor Name"
        name="doctorName"
        value={editData.doctorName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Patient Name"
        name="patientName"
        value={editData.patientName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Type"
        name="appointmentType"
        value={editData.appointmentType}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Duration (mins)"
        name="duration"
        type="number"
        value={editData.duration}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleSaveEdit} variant="contained" color="primary" sx={{ mr: 1, mt: 2 }}>
        Save
      </Button>
      <Button onClick={() => navigate("/appointments")} variant="outlined" sx={{ mt: 2 }}>
        Cancel
      </Button>
    </div>}
    </>
  );
};

export default EditAppointment;
