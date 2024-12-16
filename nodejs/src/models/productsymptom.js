'use strict';

module.exports = (sequelize, DataTypes) => {
  const ProductSymptom = sequelize.define('ProductSymptom', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id',
      },
    },
    symptomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Symptoms',
        key: 'id',
      },
    },
  }, {
    tableName: 'ProductSymptoms',
    timestamps: true, // Sử dụng `createdAt` và `updatedAt`
  });

  ProductSymptom.associate = function(models) {
    // Định nghĩa quan hệ với Product
    ProductSymptom.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });

    // Định nghĩa quan hệ với Symptom
    ProductSymptom.belongsTo(models.Symptom, { foreignKey: 'symptomId', as: 'symptom' });
  };

  return ProductSymptom;
};
