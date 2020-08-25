const express = require("express");
const router = require("./ping");

router.post("", (req, res) => {
  res.status(201).json({
    message: "Review saved",
  });
});

module.exports = router;
