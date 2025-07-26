'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // One user has one lawyer profile
      User.hasOne(models.Lawyer, { foreignKey: 'userId' });
      // One user has one user profile
      User.hasOne(models.UserProfile, { foreignKey: 'userId' });
      // Lawyer.belongsTo(models.User, { foreignKey: 'userId' });
      User.hasOne(models.Admin, { foreignKey: 'userId', as: 'adminProfile' });
    }
  }
  
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('admin', 'user', 'lawyer'),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      timestamps: true,
    }
  );

  return User;
};
