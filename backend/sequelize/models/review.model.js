const { DataTypes } = require("sequelize");

module.exports = (db) => {
  db.define("review", {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    creator_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
