import React, { useState, useEffect, Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Rating from "@material-ui/lab/Rating";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { addReview, getReviews } from "../../actions/review";
import Review from "./Review";

const Reviews = ({ serviceId }) => {
  const [values, setValues] = useState({
    rating: 2,
    title: "",
    description: "",
    serviceId: "",
  });

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews(serviceId).then((reviews) => {
      setReviews(reviews);
      setValues({ ...values, serviceId: serviceId });
    });
  }, [serviceId]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await addReview(values);
    setValues({
      rating: 2,
      title: "",
      description: "",
      serviceId: "",
    });
  };

  return (
    <Fragment>
      <Container component={Paper} style={{ paddingBottom: 2 }}>
        <h1>Drop a review</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="form-row">
            <Rating
              name="service-rating"
              value={values.rating}
              onChange={handleChange("rating")}
            />
          </div>

          <div className="form-row">
            <TextField
              className="form-control"
              fullWidth
              required
              id="title-field"
              label="Title of your review"
              value={values.title}
              onChange={handleChange("title")}
            />
          </div>

          <div className="form-row">
            <TextField
              className="form-control"
              fullWidth
              required
              id="description-field"
              label="Description"
              value={values.description}
              multiline
              rows={4}
              onChange={handleChange("description")}
            />
          </div>

          <div className="form-row center last-row">
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Container>

      <Container component={Paper} style={{ paddingBottom: 2 }}>
        <h1>Reviews</h1>
        <div>
          {reviews.map((review) => (
            <Review key={review.id} reviewData={review} />
          ))}
        </div>
      </Container>
    </Fragment>
  );
};

export default Reviews;
