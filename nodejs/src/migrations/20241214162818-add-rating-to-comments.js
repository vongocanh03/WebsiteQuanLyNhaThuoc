'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Thêm cột `rating` vào bảng `comments`
    await queryInterface.addColumn('comments', 'rating', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 1,
        max: 5,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Xóa cột `rating` khỏi bảng `comments`
    await queryInterface.removeColumn('comments', 'rating');
  },
};
