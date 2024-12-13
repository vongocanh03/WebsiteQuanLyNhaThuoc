'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('CartItems', {
          id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER,
          },
          cartId: {
              type: Sequelize.INTEGER,
              allowNull: false,
              references: {
                  model: 'Carts',
                  key: 'id',
              },
              onDelete: 'CASCADE',
          },
          productId: {
              type: Sequelize.INTEGER,
              allowNull: false,
          },
          name: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          category: {
              type: Sequelize.STRING,
          },
          price: {
              type: Sequelize.FLOAT,
              allowNull: false,
          },
          quantity: {
              type: Sequelize.INTEGER,
              defaultValue: 1,
          },
          image: {
              type: Sequelize.STRING,
          },
          createdAt: {
              allowNull: false,
              type: Sequelize.DATE,
          },
          updatedAt: {
              allowNull: false,
              type: Sequelize.DATE,
          },
      });
  },
  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('CartItems');
  },
};
