import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
  return (
    <Box
      sx={{
        maxwidth: "100vw",height: "83vh",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, // Column on small screens, row on medium+
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 4, sm: 6, md: 10 }, // Adjust padding for different screens
        py: { xs: 3, md: 5 },
        backgroundColor: "#F8FAFF",
        textAlign: { xs: "center", md: "left" }, // Center text on small screens
      }}
    >
      {/* Left Side Text */}
      <Box sx={{ maxWidth: { xs: "100%", md: "60%" } }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#2C3E50",
            fontSize: { xs: "1.8rem", sm: "2rem", md: "2.5rem" }, // Responsive font size
          }}
        >
          Comprehensive Care For A Healthier Tomorrow
        </Typography>

        <Typography sx={{ color: "#555", mt: 2, mb: 3, fontSize: { xs: "0.9rem", md: "1rem" } }}>
          Providing compassionate care with advanced medical technology, our clinic offers a range of services, from routine check-ups to specialized treatments.
        </Typography>

        <Box sx={{ display: "flex", gap: 2, justifyContent: { xs: "center", md: "flex-start" } }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1976D2",
              color: "white",
              textTransform: "none",
              fontSize: { xs: "0.8rem", md: "1rem" },
            }} onClick={() => navigate("/appointments")}
          >
            Book an Appointment
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#1976D2",
              color: "#1976D2",
              textTransform: "none",
              fontSize: { xs: "0.8rem", md: "1rem" },
            }} onClick={() => navigate("/doctors")}
          >
            Find a Doctor
          </Button>
        </Box>

        <Box sx={{ display: "flex", gap: 5, mt: 4, justifyContent: { xs: "center", md: "flex-start" } }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1976D2" }}>
              12000+
            </Typography>
            <Typography sx={{ color: "#777", fontSize: { xs: "0.9rem", md: "1rem" } }}>Happy Patients</Typography>
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1976D2" }}>
              200+
            </Typography>
            <Typography sx={{ color: "#777", fontSize: { xs: "0.9rem", md: "1rem" } }}>Expert Doctors</Typography>
          </Box>
        </Box>
      </Box>

      {/* Right Side Image */}
      <Box
        component="img"
        src="https://res.cloudinary.com/dzsrw1tcr/image/upload/v1740499504/th-removebg-preview_dmjwlo.png"
        alt="Doctor"
        sx={{
          width: { xs: "50%", sm: "40%", md: "40%" }, // Smaller image on small screens
          mt: { xs: 4, md: 0 }, // Add margin-top for spacing on small screens
          borderRadius: "10px",
        }}
      />
    </Box>
  );
};

export default HomePage;
