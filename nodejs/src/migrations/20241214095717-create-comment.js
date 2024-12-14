'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('comments', {
          id: {
              type: Sequelize.INTEGER,
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
          },
          product_id: {
              type: Sequelize.INTEGER,
              allowNull: false,
          },
          user_id: {
              type: Sequelize.INTEGER,
              allowNull: false,
          },
          content: {
              type: Sequelize.TEXT,
              allowNull: false,
          },
          createdAt: {
              type: Sequelize.DATE,
              allowNull: false,
              defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          updatedAt: {
              type: Sequelize.DATE,
              allowNull: false,
              defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
      });
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('comments');
  },
};
