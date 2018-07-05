module.exports = (sequelize, DataTypes) => {
  const Unit = sequelize.define('Unit', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
  });

  Unit.associate = (models) => {
    Unit.belongsTo(models.User);
    Unit.hasMany(models.Remedy);
  };

  return Unit;
};
