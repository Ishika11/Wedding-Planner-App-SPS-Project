const express = require("express");
const { models } = require("../sequelize");
const extractFiles = require("../middlewares/files");
const checkAuth = require("../middlewares/checkAuth");
const files = require("../middlewares/files");

const router = express.Router();

// {TODO(Arjan): add exception handling}
router.post("", checkAuth, extractFiles, async (req, res) => {
  const { body, files } = req;

  const newService = await models.service.create({
    category: body.category,
    name: body.name,
    estimateUnit: body.estimateUnit,
    priceEstimate: body.priceEstimate,
    description: body.description,
    contact: body.contactNumber,
    creator_email: req.user,
  });

  locations = body.locations.split(",");
  // add all the locations
  // associate service with all the locations
  for (let i = 0; i < locations.length; ++i) {
    let loc = await models.location.findOne({ where: { name: locations[i] } });
    // create the location if it's not already present
    if (!loc) {
      loc = await models.location.create({ name: locations[i] });
    }
    newService.addLocation(loc);
  }

  // associate all services with the image urls
  for (let i = 0; i < files.length; ++i) {
    await newService.createServiceImage({ url: files[i].path });
  }

  res.status(200).json({
    message: "Service Created",
  });
});

router.get("/:id", async (req, res) => {
  let service;
  try {
    service = await models.service.findByPk(req.params.id, {
      include: [models.location, models.serviceImage],
    });
  } catch {
    return res.status(500).json({ message: "Fetching post failed!" });
  }
  if (service) {
    res.status(200).json({
      message: "Service sent successfully",
      service: service,
    });
  } else {
    res.status(404).json({
      message: "Service not found!",
    });
  }
});

module.exports = router;
