import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Rating from "@material-ui/lab/Rating";
import TextField from "@material-ui/core/TextField";

const Reviews = () => {
  const [values, setValues] = useState({
    rating: 2,
    title: "",
    description: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Container component={Paper}>
      <h1>Drop a review</h1>
      <form>
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
      </form>
    </Container>
  );
};

export default Reviews;
