import React, { Fragment } from "react";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageCarousel = ({ images }) => {
  return (
    <Fragment>
      <Carousel showArrows={true}>
        {images.map((image) => (
          <img
            key={image.url}
            src={`http://localhost:4000/${image.url}`}
            alt={image.url}
          />
        ))}
      </Carousel>
    </Fragment>
  );
};

export default ImageCarousel;
