'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lawyer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       Lawyer.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Lawyer.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    specialization: DataTypes.STRING,
    experience: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Lawyer',
  });
  return Lawyer;
};