import React, { useEffect, useState } from "react";
import { getUserAppointments, cancelAppointment } from "../api";
import {List, ListItem, Typography, Button, Box } from "@mui/material";
import { AccessTime, Event, Person, LocalHospital, Category, Timer } from "@mui/icons-material"; // Icons for better UI
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import LoadingScreen from "../pages/LoadingScreen";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getUserAppointments()
      .then((res) => setAppointments(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleCancel = async (id) => {
    await cancelAppointment(id);
    setAppointments(appointments.filter((a) => a._id !== id));
  };

  if (loading)
    return (
      <LoadingScreen/>
    );

  return (
    <>
    {/* Heading */}
    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1, mt:3, ml: 3, color: "#004D40", textAlign: "left" }}>
      Upcoming Appointments
    </Typography>

    {/* Appointments List */}
    <List>
      {appointments.map((appointment) => (
        <ListItem
        key={appointment._id}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          borderBottom: "1px solid #ddd",
          padding: 2,
          margin: 2,
          borderRadius: 2,
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
          width: "100%",
        }}
      >
        {/* Appointment Details with Icons */}
        <Box sx={{ width: "100%", display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }, gap: 1 }}>
        <Typography variant="body1" sx={{ display: "flex", alignItems: "center", gap: 1, color: "#333" }}>
            <LocalHospital sx={{ color: "#D32F2F" }} /> <strong>Doctor:</strong> {appointment.doctorId?.name || "Unknown Doctor"}
          </Typography>
  
          <Typography variant="body1" sx={{ display: "flex", alignItems: "center", gap: 1, color: "#333" }}>
            <Person sx={{ color: "#F57C00" }} /> <strong>Patient:</strong> {appointment.patientName || "Unknown Patient"}
          </Typography>
          
          <Typography variant="body1" sx={{ display: "flex", alignItems: "center", gap: 1, color: "#333" }}>
            <Event sx={{ color: "#1565C0" }} /> <strong>Date:</strong> {dayjs(appointment.date).format("YYYY-MM-DD")}
          </Typography>
  
          <Typography variant="body1" sx={{ display: "flex", alignItems: "center", gap: 1, color: "#333" }}>
            <AccessTime sx={{ color: "#2E7D32" }} /> <strong>Time:</strong> {dayjs(appointment.date).format("HH:mm")}
          </Typography>
  
          
  
          <Typography variant="body1" sx={{ display: "flex", alignItems: "center", gap: 1, color: "#333" }}>
            <Category sx={{ color: "#0288D1" }} /> <strong>Type:</strong> {appointment.appointmentType}
          </Typography>
  
          <Typography variant="body1" sx={{ display: "flex", alignItems: "center", gap: 1, color: "#333" }}>
            <Timer sx={{ color: "#7B1FA2" }} /> <strong>Duration:</strong> {appointment.duration} mins
          </Typography>
        </Box>
  
        {/* Buttons - Positioned Responsively */}
        <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
          <Button
            onClick={() => navigate(`/appointments/${appointment._id}`)}
            variant="contained"
            sx={{ backgroundColor: "#1565C0", "&:hover": { backgroundColor: "#0D47A1" } }}
          >
            Edit
          </Button>
  
          <Button
            onClick={() => handleCancel(appointment._id)}
            variant="contained"
            sx={{ backgroundColor: "#D32F2F", "&:hover": { backgroundColor: "#B71C1C" } }}
          >
            Cancel
          </Button>
        </Box>
      </ListItem>
      ))}
    </List>
    </>
  );
};

export default Appointments;
