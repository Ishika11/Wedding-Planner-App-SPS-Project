import React from "react";
import ImagePreview from "./ImagePreview";

const ImagesPreview = (props) => {
  return (
    <div>
      {Array.from(props.images).map((image) => (
        <ImagePreview key={image.name} image={image} />
      ))}
    </div>
  );
};

export default ImagesPreview;
