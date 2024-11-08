'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: 'RoleId'
      });
      User.hasMany(models.Schedule, {foreignKey: 'UpdatedBy', as: 'UpdatedByUser'});
      User.hasMany(models.Schedule, {foreignKey: 'CreatedBy', as: 'CreatedByUser'});
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    RoleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Role',
        key: 'id'
      }
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password);
      }
    },
    modelName: 'User',
  });
  return User;
};