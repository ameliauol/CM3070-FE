import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useLocation } from "react-router-dom";

const ProgrammeDetailPage = () => {
  const location = useLocation();
  const [programme, setProgramme] = useState(location.state?.programme);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If programme is not available in state, fetch from API
    if (!programme) {
      setLoading(true);
      // Simulating API fetch delay
      setTimeout(() => {
        // TODO: Replace with actual fetch logic
        const fetchedProgramme = fetchProgrammeFromAPI(
          location.pathname.split("/").pop()
        );
        setProgramme(fetchedProgramme);
        setLoading(false);
      }, 1000); // Adjust delay as needed
    }
  }, [programme, location.pathname]);

  const fetchProgrammeFromAPI = (programmeId) => {
    // TODO: Replace with actual fetch logic
    const programmeData = {
      id: programmeId,
      title: "Full Body Workout", // Example data, replace with actual fetched data
      isActive: true,
      summary:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod magna a dolor tempor, vel mattis ante tempor.",
      exercises: [
        {
          name: "Push-Up",
          imageUrl:
            "https://via.placeholder.com/300x200/008080/FFFFFF?text=Push-Up",
        },
        {
          name: "Squat",
          imageUrl:
            "https://via.placeholder.com/300x200/FF6347/FFFFFF?text=Squat",
        },
        {
          name: "Plank",
          imageUrl:
            "https://via.placeholder.com/300x200/4682B4/FFFFFF?text=Plank",
        },
      ],
    };
    return programmeData;
  };

  // If loading, display loading message or spinner
  if (loading) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Loading Programme...
        </Typography>
      </Container>
    );
  }

  // If programme is still not available, display not found message
  if (!programme) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Programme Not Found
        </Typography>
      </Container>
    );
  }

  // Render programme details once available
  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        {programme.isActive ? "Active Programme" : "Inactive Programme"}
      </Typography>
      <Typography variant="h4" gutterBottom>
        {programme.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {programme.summary}
      </Typography>
      <Box mt={4}>
        <Typography variant="h5" component="h2" gutterBottom>
          List of Exercises
        </Typography>
        <Grid container spacing={3}>
          {programme.exercises.map((exercise, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={exercise.imageUrl}
                  alt={exercise.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {exercise.name}
                  </Typography>
                  {/* Add more details about the exercise as needed */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ProgrammeDetailPage;
