import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import ImagesPreview from "./ImagesPreview";
import { Grid, Container } from "@material-ui/core";
import "./CreateForm.css";

const categories = ["Entertainment", "Caterer", "Venue", "Clothes", "Gifts"];
const locations = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Kolkata",
  "Chandigarh",
  "Goa",
];

const CreateProduct = () => {
  let fileInputElement;

  const [values, setValues] = useState({
    category: "",
    name: "",
    estimateUnit: "",
    priceEstimate: "",
    description: "",
    contactNumber: "",
    locations: [],
  });

  const [images, setImages] = useState([]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleFilesChange = (event) => {
    setImages([...event.target.files]);
  };

  return (
    <Container>
      <Card>
        <Grid container>
          <Container>
            <CardContent>
              <h1>Describe your Service</h1>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  console.log(values);
                }}
              >
                <div className="form-row">
                  <FormControl fullWidth className="form-control">
                    <InputLabel id="category-label">
                      Service Category
                    </InputLabel>
                    <Select
                      labelId="category-label"
                      id="category"
                      value={values.category}
                      onChange={handleChange("category")}
                      label="Category"
                    >
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div className="form-row">
                  <TextField
                    className="form-control"
                    fullWidth
                    required
                    id="name-field"
                    label="Name your Service"
                    value={values.name}
                    onChange={handleChange("name")}
                  />
                </div>

                <div className="form-row">
                  <TextField
                    className="form-control"
                    fullWidth
                    required
                    id="estimate-unit-field"
                    label="Unit of measurement"
                    value={values.estimateUnit}
                    onChange={handleChange("estimateUnit")}
                  />
                </div>

                <div className="form-row">
                  <FormControl fullWidth className="form-control">
                    <InputLabel htmlFor="standard-adornment-amount">
                      Cost per unit
                    </InputLabel>
                    <Input
                      id="price-estimate-field"
                      value={values.priceEstimate}
                      onChange={handleChange("priceEstimate")}
                      startAdornment={
                        <InputAdornment position="start">₹</InputAdornment>
                      }
                    />
                  </FormControl>
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

                <div className="form-row">
                  <TextField
                    className="form-control"
                    fullWidth
                    required
                    id="contact-field"
                    label="Contact number"
                    value={values.contactNumber}
                    onChange={handleChange("contactNumber")}
                  />
                </div>

                <div className="form-row">
                  <FormControl fullWidth className="form-control">
                    <InputLabel id="location-label">
                      Service Locations
                    </InputLabel>
                    <Select
                      labelId="location-label"
                      id="mutiple-location"
                      multiple
                      value={values.locations}
                      onChange={handleChange("locations")}
                      input={<Input id="select-multiple-locations" />}
                      renderValue={(selected) => (
                        <div className="chips">
                          {selected.map((value) => (
                            <Chip key={value} label={value} className="chip" />
                          ))}
                        </div>
                      )}
                    >
                      {locations.map((locationName) => (
                        <MenuItem key={locationName} value={locationName}>
                          {locationName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <ImagesPreview images={images} />

                <div className="form-row">
                  <FormControl fullWidth>
                    <input
                      type="file"
                      accept="image/*"
                      ref={(fileInput) => (fileInputElement = fileInput)}
                      multiple
                      hidden
                      onChange={handleFilesChange}
                    />
                  </FormControl>
                </div>

                <div className="form-row center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => fileInputElement.click()}
                  >
                    Add Images
                  </Button>
                </div>

                <div className="form-row center">
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </form>
            </CardContent>
          </Container>
        </Grid>
      </Card>
    </Container>
  );
};

export default CreateProduct;
