// src/models/Cart.js (ví dụ)
'use strict';
module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    // Nếu có quan hệ với các mô hình khác, ví dụ:
    // Cart.associate = (models) => {
    //     Cart.belongsTo(models.User, { foreignKey: 'userId' });
    // };
  
    return Cart;
  };
  