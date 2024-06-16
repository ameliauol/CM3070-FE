import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Container } from "@mui/material";
import NavBar from "./components/NavBar";
import ImageSlider from "./components/ImageSlider";
import PopularExercises from "./components/PopularExercises";
import Footer from "./components/Footer";
import AboutUs from "./AboutUs";
import Learn from "./Learn";
import ExerciseDetail from "./ExerciseDetail";
import "./styles/app.css";

function App() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <NavBar />
      <Box sx={{ flexGrow: 1 }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ImageSlider />
                <Container sx={{ mt: 4 }}>
                  <PopularExercises />
                </Container>
              </>
            }
          />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:name" element={<ExerciseDetail />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
