// src/Navbar.jsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("John Doe");

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    setLoggedIn(true);
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Strength Matrix
          </Link>
        </Typography>
        <Button color="inherit" component={Link} to="/">
          HOME
        </Button>
        <Button color="inherit" component={Link} to="/learn">
          LEARN
        </Button>
        <Button color="inherit" component={Link} to="/programmes">
          PROGRAMMES
        </Button>
        <Button color="inherit" component={Link} to="/about">
          ABOUT US
        </Button>
        {loggedIn ? (
          <Box>
            <Button color="inherit" onClick={handleMenuClick}>
              {username}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button color="inherit" onClick={handleLogin}>
            LOGIN
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
