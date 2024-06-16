import React from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";

const exercises = [
  {
    name: "Push-Up",
    videoUrl: "https://www.youtube.com/embed/IODxDxX7oi4",
    instructions: [
      "Start in a plank position with your arms straight and hands shoulder-width apart.",
      "Lower your body until your chest nearly touches the floor.",
      "Push yourself back up to the starting position.",
      "Repeat for the desired number of repetitions.",
    ],
  },
  {
    name: "Squat",
    videoUrl: "https://www.youtube.com/embed/aclHkVaku9U",
    instructions: [
      "Stand with your feet shoulder-width apart.",
      "Lower your body as if you are sitting back into a chair.",
      "Keep your chest up and your knees over your toes.",
      "Push through your heels to return to the starting position.",
    ],
  },
  {
    name: "Plank",
    videoUrl: "https://www.youtube.com/embed/B296mZDhrP4",
    instructions: [
      "Start in a push-up position with your body in a straight line.",
      "Hold this position, keeping your core tight and hips level.",
      "Maintain the position for the desired amount of time.",
    ],
  },
  {
    name: "Burpee",
    videoUrl: "https://www.youtube.com/embed/4f4uEjY4X6Q",
    instructions: [
      "Start in a standing position.",
      "Drop into a squat position with your hands on the ground.",
      "Kick your feet back into a plank position.",
      "Perform a push-up, then return your feet to the squat position.",
      "Explosively jump up from the squat position.",
    ],
  },
  {
    name: "Lunge",
    videoUrl: "https://www.youtube.com/embed/QOVaHwm-Q6U",
    instructions: [
      "Stand tall with feet hip-width apart.",
      "Take a big step forward with your right leg and lower your body until your right thigh is parallel to the floor.",
      "Push through your right heel to return to the starting position.",
      "Repeat with your left leg.",
    ],
  },
];

const ExerciseDetailPage = () => {
  const { name } = useParams();
  const exercise = exercises.find(
    (ex) => ex.name.toLowerCase() === name.toLowerCase()
  );

  if (!exercise) {
    return (
      <Typography variant="h4" component="h2" sx={{ mt: 4 }}>
        Exercise not found
      </Typography>
    );
  }

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        {exercise.name}
      </Typography>
      <Box sx={{ my: 4 }}>
        <iframe
          width="100%"
          height="500"
          src={exercise.videoUrl}
          title={exercise.name}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: "8px" }}
        ></iframe>
      </Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Instructions
      </Typography>
      <ol>
        {exercise.instructions.map((instruction, index) => (
          <li key={index} style={{ marginBottom: "8px" }}>
            <Typography variant="body1">{instruction}</Typography>
          </li>
        ))}
      </ol>
    </Container>
  );
};

export default ExerciseDetailPage;
