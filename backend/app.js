const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// for parsing json data, body is stream of bits initially
app.use(bodyParser.json());
// not used here, but you can parse urlencoded data too
app.use(bodyParser.urlencoded({extended: false}));

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

app.get('/ping', (req, res) => {
  res.status(200).json({
    message: "Pong"
  });
});

module.exports = app;
