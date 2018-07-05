module.exports = (sequelize, DataTypes) => {
  const Remedy = sequelize.define('Remedy', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    content: DataTypes.INTEGER,
    lab: DataTypes.STRING,
    code: DataTypes.STRING,
  });

  Remedy.associate = (models) => {
    Remedy.belongsTo(models.Unit);
  };

  return Remedy;
};
