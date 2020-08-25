function applyAssociations(sequelize) {
  const { review, service, serviceImage, location } = sequelize.models;

  service.hasMany(serviceImage);
  serviceImage.belongsTo(service);

  service.belongsToMany(location, { through: "ServiceLocations" });
  location.belongsToMany(service, { through: "ServiceLocations" });

  service.hasMany(review);
  review.belongsTo(service);
}

module.exports = { applyAssociations };
