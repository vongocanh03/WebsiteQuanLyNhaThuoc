'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SupportRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here, if needed in the future
    }
  };
  SupportRequest.init({
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    message: DataTypes.TEXT,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pending', // Set a default status
    },
    resolvedAt: {
      type: DataTypes.DATE,
      allowNull: true, // Can be null until the request is resolved
    }
  }, {
    sequelize,
    modelName: 'SupportRequest',
  });
  return SupportRequest;
};
