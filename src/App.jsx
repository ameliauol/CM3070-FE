import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Box,
} from "@mui/material";

function App() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My MUI App
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container className="app-container">
        <Typography variant="h4" className="app-title">
          Welcome to My MUI App!
        </Typography>
        <Grid container spacing={3} className="app-grid">
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} className="app-paper">
              <Typography variant="h6">Content Block 1</Typography>
              <Typography variant="body1">
                This is a sample content block for larger screens.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} className="app-paper">
              <Typography variant="h6">Content Block 2</Typography>
              <Typography variant="body1">
                Another block of content goes here.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} className="app-paper">
              <Typography variant="h6">Content Block 3</Typography>
              <Typography variant="body1">
                More content can be added here.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
