const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const pingRoutes = require("./routes/ping");
const serviceRoutes = require("./routes/service");

const app = express();

// for parsing json data, body is stream of bits initially
app.use(bodyParser.json());
// not used here, but you can parse urlencoded data too
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  // for CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept, Authorization"
  );
  // for allowed methods
  // OPTIONS is set implicitely by angular to check if
  // post request is valid
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// express.static allows requests to acess all images
// path is used to forward request to /backend/images
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/ping", pingRoutes);
app.use("/api/service", serviceRoutes);

module.exports = app;
