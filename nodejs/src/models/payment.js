// models/payment.js
module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
      userName: DataTypes.STRING,
      userPhone: DataTypes.STRING,
      cartItems: DataTypes.JSONB,
      totalAmount: DataTypes.FLOAT,
      orderInfo: DataTypes.STRING,
      paymentDate: DataTypes.DATE,
      status: DataTypes.STRING,
    });
  
    Payment.associate = function (models) {
      // Mối quan hệ giữa Payments và Users
      Payment.belongsTo(models.User, { foreignKey: 'userId' });
    };
  
    return Payment;
  };
  