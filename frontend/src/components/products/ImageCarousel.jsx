import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./ImageCarousel.css";
import { SERVERURL } from "./constants";

const ImageCarousel = ({ images }) => {
  return (
    <Carousel showArrows={true} autoPlay>
      {images.map((image) => (
        <img
          key={image.url}
          src={`${SERVERURL}/${image.url}`}
          alt={image.url}
        />
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
