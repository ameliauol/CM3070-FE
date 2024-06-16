import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";

const programmesData = [
  {
    id: 1,
    title: "Full Body Workout",
    description:
      "Target all major muscle groups with this comprehensive workout.",
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
  },
  {
    id: 2,
    title: "Cardio Blast",
    description:
      "Improve cardiovascular health and burn calories with intense cardio exercises.",
    isActive: false,
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod magna a dolor tempor, vel mattis ante tempor.",
    exercises: [
      {
        name: "Jumping Jacks",
        imageUrl:
          "https://via.placeholder.com/300x200/FF6347/FFFFFF?text=Jumping+Jacks",
      },
      {
        name: "Running",
        imageUrl:
          "https://via.placeholder.com/300x200/4682B4/FFFFFF?text=Running",
      },
    ],
  },
];

const ProgrammesPage = () => {
  const [programmes, setProgrammes] = useState(programmesData);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProgrammes = programmes.filter((programme) =>
    programme.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProgrammeClick = (programme) => {
    navigate(`/programme/${programme.id}`, { state: programme });
  };

  return (
    <Container sx={{ my: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Programmes
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
        {filteredProgrammes.map((programme) => (
          <Grid item xs={12} key={programme.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <CardActionArea
                component={Link}
                to={`/programme/${programme.id}`}
                onClick={() => handleProgrammeClick(programme)}
                sx={{ height: "100%" }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={programme.exercises[0].imageUrl} {/* Use first exercise image for simplicity */}
                  alt={programme.title}
                />
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {programme.title}
                  </Typography>
                  <Typography variant="body1" component="p">
                    {programme.description}
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

export default ProgrammesPage;
