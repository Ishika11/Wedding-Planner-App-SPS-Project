const { DataTypes } = require("sequelize");

module.exports = (db) => {
  db.define("location", {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  });
};
