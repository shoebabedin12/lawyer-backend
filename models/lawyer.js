"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Lawyer extends Model {
    static associate(models) {
      Lawyer.belongsTo(models.User, { foreignKey: "userId" });
    }

    static async getAllLawyers() {
      return await this.findAll({ include: ["User"] });
    }
  }
Lawyer.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Lawyer",
  }
);


  return Lawyer;
};
