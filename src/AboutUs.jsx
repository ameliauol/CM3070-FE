// src/AboutUs.jsx
import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

const aboutSections = [
  {
    title: "Our Mission",
    description:
      "Our mission is to provide the best fitness programs to empower individuals to achieve their health goals.",
    imageUrl: "https://via.placeholder.com/300x300/008080/FFFFFF?text=Mission",
  },
  {
    title: "Our Vision",
    description:
      "We envision a world where everyone has access to effective and enjoyable fitness solutions.",
    imageUrl: "https://via.placeholder.com/300x300/FF6347/FFFFFF?text=Vision",
  },
  {
    title: "Our Team",
    description:
      "Our team is composed of dedicated professionals passionate about health and fitness.",
    imageUrl: "https://via.placeholder.com/300x300/4682B4/FFFFFF?text=Team",
  },
];

const AboutUs = () => {
  return (
    <Container sx={{ my: 4 }}>
      {aboutSections.map((section, index) => (
        <Grid
          container
          spacing={4}
          key={index}
          alignItems="center"
          sx={{
            mb: 4,
            flexDirection: {
              xs: "column",
              md: index % 2 === 0 ? "row" : "row-reverse",
            },
          }}
        >
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src={section.imageUrl}
              alt={section.title}
              sx={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h2" gutterBottom>
              {section.title}
            </Typography>
            <Typography variant="body1">{section.description}</Typography>
          </Grid>
        </Grid>
      ))}
    </Container>
  );
};

export default AboutUs;
