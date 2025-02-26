// src/components/AvailableSlots.js
import React from "react";
import { useState } from "react";
import { Button, Typography, Box, Grid } from "@mui/material";


const AvailableSlots = ({ slots=[], date, onSelectSlot }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot.start);
    onSelectSlot(slot);
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        padding: 3,
        backgroundColor: "#ffffff", // Clean white background for contrast
        borderRadius: 2,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Heading */}
      <Typography variant="h5" fontWeight="bold" color="#424242" gutterBottom>
        Available Time Slots
      </Typography>

      {/* Slots Grid */}
      {slots.length > 0 ? (
        <Grid container spacing={2} justifyContent="center">
          {slots.map((slot) => (
            <Grid item key={slot.start}>
              <Button
                variant="contained"
                onClick={() => handleSlotClick(slot)}
                sx={{
                  backgroundColor: selectedSlot === slot.start ? "#008080" : "#fff",
              color: selectedSlot === slot.start ? '#fff' :"#000",
                  textTransform: "none",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  padding: "8px 16px",
                  "&:hover": { backgroundColor: "#008080" },
                }}
              >
                {slot.start}
              </Button>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="#D32F2F" mt={2}>
          No available slots
        </Typography>
      )}
    </Box>
  );
};

export default AvailableSlots;