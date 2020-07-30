const express = require('express');
const PingController = require('../controllers/ping.js');

const router = express.Router();

router.get('', PingController.sendPing);

module.exports = router;
