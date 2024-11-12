// models/category.js
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Đây là khóa chính
        autoIncrement: true, // Tự động tăng giá trị
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,  // Bắt buộc phải có tên thể loại
      },
    });
  
    return Category;
  };
  