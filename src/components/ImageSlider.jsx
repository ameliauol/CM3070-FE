// src/components/ImageSlider.jsx
import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// TODO: Create array of proper image URLs
const images = [
  "https://via.placeholder.com/1200x500/0000FF/808080?text=Image1",
  "https://via.placeholder.com/1200x500/FF0000/FFFFFF?text=Image2",
  "https://via.placeholder.com/1200x500/FFFF00/000000?text=Image3",
];

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: "500px",
        overflow: "hidden",
      }}
    >
      <Slider {...settings}>
        {images.map((url, index) => (
          <Box
            key={index}
            sx={{
              backgroundImage: `url(${url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "500px",
            }}
          />
        ))}
      </Slider>
    </Box>
  );
};

export default ImageSlider;
