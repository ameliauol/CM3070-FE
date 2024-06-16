// src/components/PopularExercises.jsx
import React from "react";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";

// TODO: Fetch from API when populated and integrated
const exercises = [
  {
    title: "Push-ups",
    description:
      "An exercise involving raising and lowering the body using the arms.",
    imageUrl: "https://via.placeholder.com/300x200/009688/FFFFFF?text=Push-ups",
  },
  {
    title: "Squats",
    description:
      "A strength exercise in which the trainee lowers their hips from a standing position and then stands back up.",
    imageUrl: "https://via.placeholder.com/300x200/FF5722/FFFFFF?text=Squats",
  },
  {
    title: "Pull-ups",
    description:
      "An upper-body strength exercise that involves raising the body with the arms while hanging from a bar.",
    imageUrl: "https://via.placeholder.com/300x200/3F51B5/FFFFFF?text=Pull-ups",
  },
];

const PopularExercises = () => {
  return (
    <Grid container spacing={3}>
      {exercises.map((exercise, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ height: "100%" }}>
            <CardMedia
              component="img"
              height="200"
              image={exercise.imageUrl}
              alt={exercise.title}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {exercise.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {exercise.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PopularExercises;
