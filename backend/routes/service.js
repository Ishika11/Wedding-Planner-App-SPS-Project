const express = require("express");
const extractFiles = require("../middlewares/files");

const router = express.Router();

router.post("", extractFiles, (req, res) => {
  // console.log(req.body);
  // console.log(req.files);
  res.status(200).json({
    message: "Service Created",
  });
});

module.exports = router;
