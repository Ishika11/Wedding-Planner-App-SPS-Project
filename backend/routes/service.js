const express = require("express");
const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("invalid mimetype");
    if (isValid) {
      error = null;
    }
    // destination path relative to server.js
    cb(error, "images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

upload = multer({ storage: storage });

const router = express.Router();

router.post("", upload.array("images", 10), (req, res) => {
  // console.log(req.body);
  // console.log(req.files);
  res.status(200).json({
    message: "Service Created",
  });
});

module.exports = router;
