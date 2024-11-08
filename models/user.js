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
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name is required'
        }, notEmpty: {
          msg: 'Name is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email is required'
        }, notEmpty: {
          msg: 'Email is required'
        }, isEmail: {
          msg: 'Email is not valid'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required'
        }, notEmpty: {
          msg: 'Password is required'
        }
      }
    },
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