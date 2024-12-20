// migrations/create_medication_schedule.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MedicationSchedules', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      drug_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      schedule_time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      reminder_time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MedicationSchedules');
  }
};
