import { Comment,User } from '../models';
// GET comments by productId
const getCommentsByProductId = async (req, res) => {
    const { productId } = req.params;  // Lấy productId từ URL params
    try {
        const comments = await Comment.findAll({
            where: { product_id: productId },
            include: [
                { 
                    model: User, 
                    as: 'user',
                    attributes: ['lastName'] // Chỉ lấy lastName của người dùng
                }
            ],
            order: [['createdAt', 'DESC']], // Sắp xếp theo thời gian tạo
        });
        res.json({ comments });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Error fetching comments' });
    }
};

// POST add new comment
const addComment = async (req, res) => {
    const { productId, userId, content } = req.body;
    console.log('Received:', productId, userId, content); // Kiểm tra dữ liệu nhận được
    try {
        const comment = await Comment.create({
            product_id: productId,
            user_id: userId,
            content,
        });
        res.status(201).json({ comment });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Error adding comment' });
    }
};


module.exports = {
    getCommentsByProductId,
    addComment
};
