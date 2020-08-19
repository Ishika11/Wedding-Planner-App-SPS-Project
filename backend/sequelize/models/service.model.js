const { DataTypes } = require("sequelize");

module.exports = (db) => {
  db.define("service", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creator_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estimateUnit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priceEstimate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
