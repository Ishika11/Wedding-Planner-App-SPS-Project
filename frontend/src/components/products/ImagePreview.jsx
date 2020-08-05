import React, { useState } from "react";

const ImagePreview = (props) => {
  const [previewURL, setPreviewURL] = useState("");
  const { image } = props;

  const reader = new FileReader();
  reader.onload = () => {
    setPreviewURL(reader.result);
  };
  reader.readAsDataURL(image);

  return <img src={previewURL} alt={image.name} />;
};

export default ImagePreview;
