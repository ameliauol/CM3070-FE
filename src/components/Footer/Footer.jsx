import React from "react";
import { Box, Container, Grid, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#333", color: "#fff", py: 4, mt: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              Email: info@strengthmatrix.com
            </Typography>
            <Typography variant="body2">Phone: +65 1234 5678</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener"
                color="inherit"
              >
                Facebook
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener"
                color="inherit"
              >
                Twitter
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener"
                color="inherit"
              >
                Instagram
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body2" color="inherit">
            © 2024 Strength Matrix. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
