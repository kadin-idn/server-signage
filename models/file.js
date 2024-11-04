'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    static associate(models) {
      File.hasOne(models.HeroBanner, {
        foreignKey: 'fileHero',
        as: 'fileHeroBanner'
      });
    }
  }
  File.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    fileName: DataTypes.STRING,
    fileType: DataTypes.STRING,
    data: DataTypes.BLOB("medium")
  }, {
    sequelize,
    modelName: 'File',
  });
  return File;
};