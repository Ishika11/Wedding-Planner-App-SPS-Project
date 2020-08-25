import React, { Fragment } from "react";
import Rating from "@material-ui/lab/Rating";

const Review = ({ reviewData }) => {
  const createdAt = new Date(reviewData.createdAt);
  return (
    <Fragment>
      <div style={{ display: "inline-flex", marginBottom: -10 }}>
        <Rating value={reviewData.rating} readOnly style={{ margin: "auto" }} />
        <h2 style={{ marginLeft: 3 }}>{reviewData.title}</h2>
      </div>
      <p style={{ fontSize: 20 }}>{reviewData.description}</p>
      <p style={{ fontSize: 15, color: "grey" }}>{`${
        reviewData.creator_email
      } on ${createdAt.toString()}`}</p>
    </Fragment>
  );
};

export default Review;
