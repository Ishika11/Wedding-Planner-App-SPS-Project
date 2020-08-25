import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Rating from "@material-ui/lab/Rating";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { addReview } from "../../actions/review";

const Reviews = ({ service_id }) => {
  const [values, setValues] = useState({
    rating: 2,
    title: "",
    description: "",
    service_id: service_id,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(values);
    const result = await addReview(values);
    console.log(result);
  };

  return (
    <Container component={Paper}>
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

        <div className="form-row center">
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default Reviews;
