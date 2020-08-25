import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageCarousel = ({ images }) => {
  return (
    <Carousel showArrows={true} autoPlay>
      {images.map((image) => (
        <img key={image.url} src={image.url} alt={image.url} />
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
