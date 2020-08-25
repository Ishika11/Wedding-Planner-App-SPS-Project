const { DataTypes } = require("sequelize");

module.exports = (db) => {
  db.define("review", {
    rating: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    creator_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
