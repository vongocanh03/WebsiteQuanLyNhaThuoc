module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        // Định nghĩa các trường của bảng comment
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        tableName: 'comments', // Tên bảng trong cơ sở dữ liệu
        timestamps: true, // Tự động thêm createdAt và updatedAt
    });

    // Quan hệ với bảng User
    Comment.associate = (models) => {
        Comment.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user', // Alias cho quan hệ này
        });
    };

    return Comment;
};
