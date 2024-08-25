import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";

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
  const location = useLocation();
  const [exercise, setExercise] = useState({
    name: "",
    videoUrl: "",
    instructions: [],
    currentWeight: null,
    goalWeight: null,
  });

  const pastWeights = [
    { date: "2023-01-15", weight: 50 },
    { date: "2023-02-01", weight: 55 },
    { date: "2023-02-15", weight: 60 },
  ];

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const exerciseFromLocation = location.state?.exercise;
        if (exerciseFromLocation) {
          setExercise(exerciseFromLocation);
        } else {
          const foundExercise = exercises.find(
            (ex) => ex.name.toLowerCase() === name.toLowerCase()
          );
          if (foundExercise) {
            setExercise(foundExercise);
          } else {
            // Exercise not found handling
            console.log("Exercise not found");
          }
        }
      } catch (error) {
        console.error("Error fetching exercise:", error);
        // Handle error state or fallback
      }
    };

    fetchExercise();
  }, [name, location.state]);

  if (!exercise) {
    return (
      <Container>
        <Typography variant="h4" component="h2" sx={{ mt: 4 }}>
          Exercise not found
        </Typography>
      </Container>
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
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: "8px" }}
        ></iframe>
      </Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Instructions
      </Typography>
      {exercise.instructions && (
        <ol>
          {exercise.instructions.map((currInstr, index) => (
            <li key={index} style={{ marginBottom: "8px" }}>
              <Typography variant="body1">{currInstr}</Typography>
            </li>
          ))}
        </ol>
      )}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Past Lift Weights
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Weight (lbs)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pastWeights.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {item.date}
                      </TableCell>
                      <TableCell align="right">{item.weight}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Goal and Current Weight
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Current Weight (lbs)"
                  secondary={exercise.currentWeight || "N/A"}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Goal Weight (lbs)"
                  secondary={exercise.goalWeight || "N/A"}
                />
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExerciseDetailPage;
