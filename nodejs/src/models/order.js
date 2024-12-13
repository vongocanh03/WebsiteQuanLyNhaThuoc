module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        totalAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    });

    Order.associate = (models) => {
        // Quan hệ nhiều-nhiều giữa Order và Product qua bảng trung gian OrderItems
        Order.belongsToMany(models.Product, {
            through: 'OrderItems',   // Bảng trung gian giữa Order và Product
            as: 'products',          // Tên liên kết
            foreignKey: 'orderId'    // Khóa ngoại
        });
    };

    return Order;
};
