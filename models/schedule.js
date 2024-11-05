'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    static associate(models) {
      Schedule.belongsTo(models.Room, {foreignKey: 'RoomId'});
      Schedule.belongsTo(models.User, { as: 'UpdatedByUser', foreignKey: 'UpdatedBy'});
      Schedule.belongsTo(models.User, { as: 'CreatedByUser', foreignKey: 'CreatedBy'});
    }
  }
  Schedule.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
    day: DataTypes.DATE,
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME,
    RoomId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Room',
        key: 'id'
      }
    },
    deptName: DataTypes.STRING,
    picName: DataTypes.STRING,
    UpdatedBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    CreatedBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};