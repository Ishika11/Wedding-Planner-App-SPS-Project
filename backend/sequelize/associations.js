function applyAssociations(sequelize) {
  const { service, serviceImage, location } = sequelize.models;

  service.hasMany(serviceImage);
  serviceImage.belongsTo(service);

  service.belongsToMany(location, { through: "ServiceLocations" });
  location.belongsToMany(service, { through: "ServiceLocations" });
}

module.exports = { applyAssociations };
