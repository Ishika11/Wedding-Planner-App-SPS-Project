import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import ImagesPreview from "./ImagesPreview";

const useStyles = makeStyles((theme) => ({
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const categories = ["Entertainment", "Caterer", "Venue", "Clothes", "Gifts"];
const locations = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Kolkata",
  "Chandigarh",
  "Goa",
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CreateProduct = () => {
  const classes = useStyles();
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
    <Card>
      <CardContent>
        <h1>Describe your Service</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            console.log(values);
          }}
        >
          <div>
            Select Category
            <FormControl className={classes.formControl}>
              <InputLabel id="category-label">Category</InputLabel>
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

          <div>
            Decide a name
            <TextField
              required
              id="name-field"
              label="Name"
              value={values.name}
              onChange={handleChange("name")}
            />
          </div>

          <div>
            Provide a unit of mesurement for cost estimate
            <TextField
              required
              id="estimate-unit-field"
              label="Estimate Unit"
              value={values.estimateUnit}
              onChange={handleChange("estimateUnit")}
            />
          </div>

          <div>
            Provide a cost estimate per unit in Rupees
            <FormControl className={classes.margin}>
              <InputLabel htmlFor="standard-adornment-amount">
                Amount
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

          <div>
            Provide a description
            <TextField
              required
              id="description-field"
              label="Description"
              value={values.description}
              multiline
              onChange={handleChange("description")}
            />
          </div>

          <div>
            Contact number
            <TextField
              required
              id="contact-field"
              label="Contact"
              value={values.contactNumber}
              onChange={handleChange("contactNumber")}
            />
          </div>

          <div>
            Select locations to provide service
            <FormControl className={classes.formControl}>
              <InputLabel id="location-label">Chip</InputLabel>
              <Select
                labelId="location-label"
                id="mutiple-location"
                multiple
                value={values.locations}
                onChange={handleChange("locations")}
                input={<Input id="select-multiple-locations" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
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

          <div>
            <FormControl>
              <input
                type="file"
                accept="image/*"
                ref={(fileInput) => (fileInputElement = fileInput)}
                multiple
                hidden
                onChange={handleFilesChange}
              />
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={() => fileInputElement.click()}
            >
              Add Images
            </Button>
          </div>

          <div>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateProduct;
