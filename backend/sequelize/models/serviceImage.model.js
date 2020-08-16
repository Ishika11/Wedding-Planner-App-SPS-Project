const { DataTypes } = require("sequelize");

module.exports = (db) => {
  db.define("serviceImage", {
    url: {
      type: DataTypes.STRING,
    },
  });
};
