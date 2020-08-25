const express = require("express");
const router = require("./ping");
const { models } = require("../sequelize");
const checkAuth = require("../middlewares/checkAuth");

router.post("", checkAuth, async (req, res) => {
  const { body, user } = req;
  try {
    const newReview = await models.review.create({
      rating: body.rating,
      title: body.title,
      description: body.description,
      serviceId: body.service_id,
      creator_email: user,
    });
  } catch {
    return res.status(500).json({ message: "Creation failed!" });
  }
  res.status(201).json({
    message: "Review saved",
  });
});

router.get("/:id", async (req, res) => {
  const reviews = await models.review.findAll({
    where: {
      serviceId: req.params.id,
    },
  });
  res.status(200).json({ reviews: reviews });
});

module.exports = router;
