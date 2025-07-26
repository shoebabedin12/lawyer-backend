'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       UserProfile.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
   UserProfile.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'UserProfile',
      tableName: 'UserProfiles',
    }
  );
  return UserProfile;
};