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
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 1,
                max: 5, // Giới hạn từ 1 đến 5 sao
            },
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
