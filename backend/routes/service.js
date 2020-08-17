const express = require("express");
const { models } = require("../sequelize");
const extractFiles = require("../middlewares/files");
const files = require("../middlewares/files");
const utility = require('./utility/utility');
const seq = require('sequelize-easy-query');
const { status } = require('./utility/status');
const { Op } = require("sequelize");

const router = express.Router();

// {TODO(Arjan): add exception handling}
router.post("", extractFiles, async (req, res) => {
  const { body, files } = req;
  
  const newService = await models.service.create({
    category: body.category,
    name: body.name,
    estimateUnit: body.estimateUnit,
    priceEstimate: body.priceEstimate,
    description: body.description,
    contact: body.contactNumber,
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

  res.status(status.CREATED).send(newService);
});


//GET ALL THE SERVICES AND PRODUCTS
router.get('/', function (request, response, next) {
  models.service.findAll().then(products => {
      response.send(products);
  })
  .catch(next);
});


//FILTER SERVICES AND PRODUCTS BASED ON VARIOUS CRITERIAS
router.get('/query', function (request, response, next) {
  const queryString = utility.toQueryString(request.query);
  let minimumPrice;
  let maximumPrice;
  var queries, temp, i, l;

  // Split into key/value pairs
  queries = queryString.split("&");

  // Get the values of minimum and maximum price
  for ( i = 0, l = queries.length; i < l; i++ ) {
      temp = queries[i].split('=');
      if(temp[0]=='minPrice'){
          minimumPrice=temp[1];
      }
      if(temp[0]=='maxPrice'){
          maximumPrice=temp[1];
      }
  }

  if(typeof minimumPrice=='undefined'){
     //default value of minimum price when user enters nothing
      minimumPrice=0;
  }
  if(typeof maximumPrice=='undefined'){
    //default value of maximum price is 10 crore when user enters nothing
    maximumPrice=100000000;
  }
  
  models.service.findAll({
    where: [seq(queryString, {
        filterBy: ['category'],
    }),
    {
    priceEstimate: {
      //priceEstimate should be greater than equal to minimumPrice and less than equal to maximumPrice
      [Op.gte]:minimumPrice,
      [Op.lte]:maximumPrice
    }
  }
    ],
    order: seq(queryString, {
      //ASC for asscending and DESC for descending  
      orderBy: ['priceEstimate'],
  }),
  include: [
    {
      //inculding the location model to filter out based on location field
      model: models.location,
      where: seq(queryString, {
          //filtering by location
          filterBy: ['name'],
      })
    },
  ]
  }).then(result => {
      //sending the result
      response.status(status.SUCCESS).send(result);
      next();
  }) 
  .catch(next)
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
