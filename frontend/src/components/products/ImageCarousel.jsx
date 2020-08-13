import React, { Fragment } from "react";
import Carousel from "react-responsive-carousel";

const ImageCarousel = ({ images }) => {
  return (
    <Fragment>
      <div>
        {images.map((image) => (
          <img
            key={image.url}
            src={`http://localhost:4000/${image.url}`}
            alt={image.url}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default ImageCarousel;
