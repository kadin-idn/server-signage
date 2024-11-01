'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      Room.hasMany(models.Schedule, {foreignKey: 'RoomId'});
    }
  }
  Room.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};