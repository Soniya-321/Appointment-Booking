// src/components/DoctorDetails.js
import React, { useState , useEffect} from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDoctors } from "../api";
import Calender from "../components/Calender";
import BookingForm from "../components/BookingForm";
import { Box, Typography, Paper } from "@mui/material";
import Navbar from "./Navbar";

const DoctorDetails = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  
  const { doctorId } = useParams(); // Get doctorId from URL
  const location = useLocation();
  const [selectedDoctor, setSelectedDoctor] = useState(location.state?.doctor || null);

  useEffect(() => {
    // If doctor data is not available in state, fetch it
    if (!selectedDoctor) {
      getDoctors()
        .then((res) => {
          const doctor = res.data.find((doc) => doc._id === doctorId);
          setSelectedDoctor(doctor);
        })
        .catch(() => alert("Failed to load doctor details"));
    }
  }, [doctorId, selectedDoctor]);

  
  
  if (!selectedDoctor)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Full screen height
          width: "100%",   // Full screen width
        }}
      >
        <p>Loading doctor details...</p>
      </Box>
    );


  return (
    <>
    <Navbar />
    <Box
  sx={{
    maxWidth: "800px",
    margin: "auto",
    marginTop: "5px",
    padding: "20px",
    borderRadius: "10px",
    
    textAlign: "center",
  }}
>
  <Typography mt={0} mb={3} textAlign='left' variant="h5" fontWeight={550} >Book Appointment</Typography>
  {/* Doctor Name */}
  <Typography
    variant="h6"
    textAlign={"left"}
    sx={{ marginBottom: 2, color: "#000" }}
  >
    {selectedDoctor.name}
  </Typography>

  {/* Calendar Component */}
  <Paper
    elevation={3}
    sx={{
      padding: "15px",
      marginBottom: 3,
      borderRadius: "10px",
      backgroundColor: "#ffffff",
    }}
  >
    <Calender
      selectedDoctor={selectedDoctor}
      onSlotSelect={setSelectedSlot}
      onDateSelect={setSelectedDate}
    />
  </Paper>

  {/* Booking Form (Shows only if a slot is selected) */}
  {selectedSlot && (
    <Paper
      elevation={3}
      sx={{
        padding: "15px",
        borderRadius: "10px",
        backgroundColor: "#ffffff",
      }}
    >
      <BookingForm
        selectedSlot={selectedSlot}
        doctorId={selectedDoctor.id}
        selectedDate={selectedDate}
      />
    </Paper>
  )}
</Box>
</>
  );
};

export default DoctorDetails;