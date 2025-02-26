import React, { useEffect, useState } from "react";
import { getDoctors } from "../api";
import { Link } from "react-router-dom";
import { 
  List, ListItem, Grid, Typography, 
  Box, TextField, InputAdornment, Avatar, IconButton 
} from "@mui/material";
import { FaSearch, FaSort ,FaUserMd, FaBriefcaseMedical, FaClock} from "react-icons/fa";
import Navbar from "../pages/Navbar";
import LoadingScreen from "../pages/LoadingScreen";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    getDoctors()
      .then((res) => {
        setDoctors(res.data);
        setFilteredDoctors(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  // Handle Search
  useEffect(() => {
    const results = doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) 
    );
    setFilteredDoctors(results);
  }, [searchQuery, doctors]);

  // Handle Sorting
  const handleSort = () => {
    const sortedDoctors = [...filteredDoctors].sort((a, b) => 
      sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setFilteredDoctors(sortedDoctors);
    setSortAsc(!sortAsc);
  };

 


  return (
    <>
    <Navbar />
    {loading ?  <LoadingScreen/> : <Box sx={{ padding: 3 }}>
      {/* Title */}
      <Typography 
        variant="h5" 
        fontWeight="bold" 
        sx={{ textAlign: "left", marginBottom: 3, color: "#000", textTransform: "none"}}
      >
        Available Doctors
      </Typography>

      {/* Search Bar */}
      <TextField
        variant="outlined"
        placeholder="Search doctors..."
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: 2 , maxWidth: '400px' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FaSearch style={{ color: "#888" }} />
            </InputAdornment>
          ),
        }}
      />

      {/* Results Count & Sort Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <Typography variant="body1" sx={{ color: "#555" }}>
          {filteredDoctors.length} results found
        </Typography>
        <IconButton onClick={handleSort}>
          <FaSort style={{ color: "#1976D2" }} />
        </IconButton>
      </Box>

      {/* Doctor List */}
      <List>
  {filteredDoctors.map((doctor) => (
    <ListItem 
      button 
      component={Link} 
      to={`/doctor/${doctor._id}`} 
      key={doctor._id} 
      state={{ doctor }} 
      sx={{ 
        padding: 2, 
        borderBottom: "1px solid #ddd", 
        "&:hover": { backgroundColor: "#f9f9f9" } 
      }}
    >
      <Grid 
  item 
  xs={12} 
  sm={10} 
  display="flex" 
  flexDirection={{ xs: "column", sm: "row" }} 
  alignItems={{xs: "center", sm: "flex-start"}}  
  gap={2} // Adjust spacing between Avatar and text
>
  {/* Doctor Image */}
  <Avatar 
    src="https://png.pngtree.com/png-vector/20191130/ourmid/pngtree-doctor-icon-circle-png-image_2055257.jpg" 
    alt={doctor.name} 
    sx={{ width: 56, height: 56 }}
    textAlign={{ xs: "center", sm: "left" }}
    alignSelf="flex-start"
  />

  {/* Doctor Details */}
  <Box textAlign={{ xs: "center", sm: "center" }}>
    <Typography variant="h6" fontWeight="bold" sx={{ color: "#1E3A8A", display: "flex", alignItems: "center" }}>
      <FaUserMd style={{ marginRight: 8, color: "#1E3A8A" }} />
      {doctor.name}
    </Typography>

    <Typography variant="body2" sx={{ color: "#2E7D32", display: "flex", alignItems: "center" }}>
      <FaBriefcaseMedical style={{ marginRight: 8, color: "#2E7D32" }} />
      {doctor.specialization}
    </Typography>

    <Typography variant="body2" sx={{ color: "#E65100", display: "flex", alignItems: "center" }}>
      <FaClock style={{ marginRight: 8, color: "#E65100" }} />
      {doctor.workingHours.start} - {doctor.workingHours.end}
    </Typography>
  </Box>
</Grid>

    </ListItem>
  ))}
</List>



    </Box>}
    
    </>
  );
};

export default DoctorList;
