const { Sequelize } = require("sequelize");
const { applyAssociations } = require("./associations");

const db = new Sequelize(
  `mysql://root:${process.env.DB_PASSWORD}@34.93.213.92:3306/wedding_planner`
);

const modelDefiners = [
  require("./models/service.model"),
  require("./models/serviceImage.model"),
  require("./models/location.model"),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(db);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyAssociations(db);

// We export the sequelize connection instance to be used around our app.
module.exports = db;
