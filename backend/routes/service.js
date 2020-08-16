const express = require("express");
const { models } = require("../sequelize");
const extractFiles = require("../middlewares/files");
const files = require("../middlewares/files");
const utility = require('./utility/utility');
const seq = require('sequelize-easy-query');
const { status } = require('./utility/status');
const sequelize = require("sequelize");
const { Op } = require("sequelize");

const router = express.Router();

// {TODO: add exception handling}
router.post('/', extractFiles, async (req, res) => {
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
    let loc = await models.location.findByPk(locations[i]);
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
  // res.status(200).json({
  //   message: "Service Created",
  // });
});



//Get all the service
router.get('/', function (request, response, next) {

  models.service.findAll().then(products => {
      response.send(products);
  })
      .catch(next);
});

//Filter service based on category
router.get('/query', function (request, response, next) {

  const queryString = utility.toQueryString(request.query);
  const { body } = request;
  let minimumPrice;
  let maximumPrice;
  if(typeof body.minPrice=='undefined'){
     //default value of minimum price when user enters nothing
      minimumPrice=0;
  }
  else{
     //setting the minimum Price as entered by user
      minimumPrice=body.minPrice; 
  }
  if(typeof body.maxPrice=='undefined'){
    //default value of maximum price is 10 crore when user enters nothing
    maximumPrice=100000000;
  }
  else{
    //setting the maximum Price as entered by user
    maximumPrice=body.maxPrice;
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
  }).catch(next);
 
});

module.exports = router;
