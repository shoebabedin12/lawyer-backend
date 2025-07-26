"use strict";
const { Model } = require("sequelize"); // ✅ import Model

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {
      Admin.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }

  Admin.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      department: DataTypes.STRING,
      level: {
        type: DataTypes.STRING,
        validate: {
          isIn: [["super", "moderator", "support"]],
        },
      },
    },
    {
      sequelize,
      modelName: "Admin",
    }
  );

  return Admin;
};
