// src/components/Calendar.js
import React, { useState, useEffect } from "react";
import AvailableSlots from "../components/AvailableSlots";
import { getAvailableSlots } from "../api";
import { format, addDays } from "date-fns";
import { Button, Typography, Box, Grid } from "@mui/material";
//import axios from "axios";

const Calendar = ({ selectedDoctor, onSlotSelect, onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
    
    console.log(selectedDoctor._id);
  const next7Days = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  useEffect(() => {
    if (!selectedDate || !selectedDoctor._id) return;

    getAvailableSlots(selectedDoctor._id, selectedDate)
      .then((response) => setAvailableSlots(response.data.availableSlots))
      .catch(() => alert("Failed to load slots"));
  }, [selectedDate, selectedDoctor]);
  
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onDateSelect(date);  // Send selected date to DoctorDetails.js
  };

  console.log(selectedDate);
  
  return (
    <Box sx={{ textAlign: "center", padding: 3, backgroundColor: "E3F2FD"}}>
      {/* Heading */}
      <Typography variant="h5" fontWeight="bold" color="#424242" marginBottom={'10px'} gutterBottom>
        Select a Date
      </Typography>

      {/* Date Selection Buttons */}
      <Grid container spacing={2} justifyContent="center">
        {next7Days.map((day) => {
          const formattedDate = format(day, "yyyy-MM-dd");
          const isSelected = selectedDate === formattedDate;
          return (
          <Grid item key={day}>
            <Button
              variant="contained"
              onClick={() => handleDateSelect(format(day, "yyyy-MM-dd"))}
              sx={{
                backgroundColor: isSelected ? "#008080" : "#fff",
                border: "#2E7D32",
                color: isSelected ? '#fff' :"#000",
                textTransform: "none",
                fontSize: "1rem",
                "&:hover": { backgroundColor: "#008080" },
              }}
            >
              {format(day, "EEE, MMM d")}
            </Button>
          </Grid>
        )})}
      </Grid>

      {/* Available Slots Section */}
      {selectedDate && (
        <Box mt={3}>
          <AvailableSlots slots={availableSlots} date={selectedDate} onSelectSlot={onSlotSelect} />
        </Box>
      )}
    </Box>
  );
};

export default Calendar;