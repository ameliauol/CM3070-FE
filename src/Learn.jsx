import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const exercises = [
  {
    name: "Push-Up",
    imageUrl: "https://via.placeholder.com/300x300/008080/FFFFFF?text=Push-Up",
  },
  {
    name: "Squat",
    imageUrl: "https://via.placeholder.com/300x300/FF6347/FFFFFF?text=Squat",
  },
  {
    name: "Plank",
    imageUrl: "https://via.placeholder.com/300x300/4682B4/FFFFFF?text=Plank",
  },
  {
    name: "Burpee",
    imageUrl: "https://via.placeholder.com/300x300/FFA07A/FFFFFF?text=Burpee",
  },
  {
    name: "Lunge",
    imageUrl: "https://via.placeholder.com/300x300/7B68EE/FFFFFF?text=Lunge",
  },
];

const Learn = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container sx={{ my: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h3" component="h1" gutterBottom>
          Exercises
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: "300px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Grid container spacing={4}>
        {filteredExercises.map((exercise, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card sx={{ borderRadius: "16px", boxShadow: 3 }}>
              <CardActionArea
                component={Link}
                to={`/learn/${exercise.name.toLowerCase()}`}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={exercise.imageUrl}
                  alt={exercise.name}
                  sx={{
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                  }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {exercise.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Learn;
