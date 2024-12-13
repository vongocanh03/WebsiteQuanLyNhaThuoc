module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define('CartItem', {
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        image: {
            type: DataTypes.STRING,
        },
    });

    CartItem.associate = (models) => {
        CartItem.belongsTo(models.Cart, { foreignKey: 'cartId' });
    };

    return CartItem;
};