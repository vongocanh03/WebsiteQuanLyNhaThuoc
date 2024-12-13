'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OrderItems', {
      orderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Orders', // tên bảng Orders
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products', // tên bảng Products
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OrderItems');
  }
};
