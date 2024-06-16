// src/App.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My MUI App
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h4" gutterBottom>
          Welcome to My MUI App!
        </Typography>
        <Button variant="contained" color="primary">
          Get Started
        </Button>
      </Container>
    </div>
  );
}

export default App;
