import React from "react";
import ImagePreview from "./ImagePreview";
import { Grid } from "@material-ui/core";

const ImagesPreview = (props) => {
  return (
    <Grid container spacing={3}>
      {Array.from(props.images).map((image) => (
        <Grid item xs={6} sm={4} md={3}>
          <ImagePreview key={image.name} image={image} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ImagesPreview;
