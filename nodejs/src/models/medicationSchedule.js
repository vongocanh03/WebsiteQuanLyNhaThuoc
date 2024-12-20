// models/medicationSchedule.js
module.exports = (sequelize, DataTypes) => {
    const MedicationSchedule = sequelize.define('MedicationSchedule', {
      drug_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      schedule_time: {
        type: DataTypes.TIME,
        allowNull: false
      },
      reminder_time: {
        type: DataTypes.TIME,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    return MedicationSchedule;
  };
  