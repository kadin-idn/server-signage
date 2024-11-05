'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HeroBanner extends Model {
    static associate(models) {
      HeroBanner.belongsTo(models.File, {as: 'fileHeroBanner', foreignKey: 'fileHero'});
    }
  }
  HeroBanner.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    fileHero: {
      type: DataTypes.UUID,
      references: {
        model: 'Files',
        key: 'id'
      }
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'HeroBanner',
  });
  return HeroBanner;
};