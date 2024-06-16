import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Container } from "@mui/material";
import NavBar from "./components/NavBar";
import ImageSlider from "./components/ImageSlider";
import PopularExercises from "./components/PopularExercises";
import Footer from "./components/Footer";
import AboutUsPage from "./AboutUsPage";
import LearnPage from "./LearnPage";
import ExerciseDetailPage from "./ExerciseDetailPage";
import ProgrammesPage from "./ProgrammesPage";
import ProgrammeDetailPage from "./ProgrammeDetailPage";

function App() {
  return (
    <Box
      sx={{
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
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/learn/:name" element={<ExerciseDetailPage />} />
          <Route path="/programmes" element={<ProgrammesPage />} />
          <Route path="/programme/:id" element={<ProgrammeDetailPage />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
