import { AppBar, Toolbar, Typography, Box, Button, IconButton, Menu, MenuItem, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:768px)");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (path) => {
    setAnchorEl(null);
    if (path) navigate(path);
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Doctors", path: "/doctors" },
    { label: "Appointments", path: "/appointments" },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#ffffff",
        color: "#333",
        boxShadow: "none",
        borderBottom: "1px solid #ddd",
        py: 1,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo / Brand Name */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#1976D2",
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "0.8px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          BabySteps+
        </Typography>

        {/* Mobile Menu */}
        {isMobile ? (
          <>
            <IconButton edge="end" color="inherit" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => handleMenuClose(null)}
              sx={{ "& .MuiMenu-paper": { backgroundColor: "#f8f9fa" } }}
            >
              {navItems.map((item) => (
                <MenuItem
                  key={item.label}
                  onClick={() => handleMenuClose(item.path)}
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "1rem",
                    color: location.pathname === item.path ? "#1976D2" : "#333",
                    fontWeight: location.pathname === item.path ? "bold" : "normal",
                    "&:hover": { backgroundColor: "#e3f2fd", color: "#1976D2" },
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          /* Desktop Navigation */
          <Box sx={{ display: "flex", gap: 3 }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                sx={{
                  color: location.pathname === item.path ? "#1976D2" : "#333",
                  fontSize: "1rem",
                  fontWeight: "500",
                  fontFamily: "'Poppins', sans-serif",
                  textTransform: "none",
                  letterSpacing: "0.5px",
                  transition: "color 0.3s ease",
                  position: "relative",
                  "&:hover": { color: "#1976D2" },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    bottom: "-3px",
                    width: location.pathname === item.path ? "100%" : "0",
                    height: "2px",
                    backgroundColor: "#1976D2",
                    transition: "width 0.3s ease",
                  },
                  "&:hover::after": { width: "100%" },
                }}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
