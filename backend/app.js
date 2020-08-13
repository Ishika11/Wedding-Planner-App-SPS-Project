const express = require('express');
const bodyParser = require('body-parser');
const pingRoutes = require('./routes/ping');
const auth = require('./routes/auth.js');
var cors = require('cors');

const app = express();

// for parsing json data, body is stream of bits initially
app.use(bodyParser.json());
// not used here, but you can parse urlencoded data too
app.use(bodyParser.urlencoded({extended: false}));

var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

app.use('/api/ping', pingRoutes);
app.use('/api/v1/auth', auth);

module.exports = app;
