// models/symptom.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const Symptom = sequelize.define('Symptom', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'Symptoms',
    timestamps: true,
  });

  Symptom.associate = (models) => {
    Symptom.belongsToMany(models.Product, {
      through: 'ProductSymptoms',
      as: 'products',
      foreignKey: 'symptomId',
    });
  };

  return Symptom;
};