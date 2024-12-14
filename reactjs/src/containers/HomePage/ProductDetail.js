import React, { Component } from 'react';
import { getProductById } from '../../services/productService';
import { withRouter } from 'react-router-dom'; // Để chuyển hướng
import './ProductDetail.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCommentsByProductId, addComment } from '../../services/commentService'; // Thêm service mới

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            error: null,
            isExpanded: false,
            quantity: 1,
            comments: [],
            newComment: '',
        };
    }

    async componentDidMount() {

        const { id } = this.props.match.params;
        try {
            const response = await getProductById(id);
            if (response.product) {
                this.setState({ product: response.product });
            } else {
                this.setState({ error: 'Product not found' });
            }
        } catch (error) {
            console.error('Error fetching product details:', error);
            this.setState({ error: 'Error fetching product details' });
        }
        await this.fetchComments(id);
    }
    fetchComments = async (productId) => {
        try {
            const response = await getCommentsByProductId(productId);  // Cập nhật service để gọi đúng API
            this.setState({ comments: response.comments });
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };
    renderComments = () => {
        const { comments } = this.state;

        if (!comments || comments.length === 0) {
            return <p>Chưa có bình luận nào.</p>;
        }

        return comments.map((comment, index) => (
            <div key={index} className="comment-item">
                <p>
                    <strong>{comment.user?.lastName || 'Người dùng'}:</strong> {comment.content}
                </p>
                <small>{new Date(comment.createdAt).toLocaleString()}</small>
            </div>
        ));
    };


    handleCommentChange = (e) => {
        this.setState({ newComment: e.target.value });
    };

    handleCommentSubmit = async () => {
        const { id } = this.props.match.params;
        const userId = localStorage.getItem('userId');
        const { newComment } = this.state;

        if (!userId) {
            toast.error('Vui lòng đăng nhập để bình luận.');
            return;
        }

        try {
            console.log('Sending comment data:', { productId: id, userId, content: newComment });
            const response = await addComment({ productId: id, userId, content: newComment });
            console.log('Response from server:', response);

            toast.success('Đã thêm bình luận!', { autoClose: 2000 });
            this.setState({ newComment: '' });
            this.fetchComments(id); // Refresh comments
        } catch (error) {
            console.error('Error adding comment:', error);
            toast.error('Không thể thêm bình luận.', { autoClose: 2000 });
        }
    };

    handleIncrease = () => {
        this.setState((prevState) => ({
            quantity: prevState.quantity + 1,
        }));
    };

    handleDecrease = () => {
        this.setState((prevState) => ({
            quantity: prevState.quantity > 1 ? prevState.quantity - 1 : 1,
        }));
    };

    toggleDescription = () => {
        this.setState((prevState) => ({
            isExpanded: !prevState.isExpanded,
        }));
    };

    handleAddToCart = () => {
        const { product, quantity } = this.state;
        const userId = localStorage.getItem('userId'); // Lấy userId từ localStorage hoặc session

        if (!userId) {
            toast.error('Vui lòng đăng nhập để thêm vào giỏ hàng', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
            return;
        }

        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category?.name || 'Không xác định',
            quantity,
        };

        // Lấy giỏ hàng của người dùng từ localStorage
        let cartItems = JSON.parse(localStorage.getItem(`cartItems_${userId}`)) || [];
        const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

        if (existingItemIndex !== -1) {
            cartItems[existingItemIndex].quantity += quantity; // Tăng số lượng nếu sản phẩm đã có trong giỏ
        } else {
            cartItems.push(cartItem); // Nếu sản phẩm chưa có, thêm mới
        }

        localStorage.setItem(`cartItems_${userId}`, JSON.stringify(cartItems)); // Lưu giỏ hàng theo userId
        toast.success('Đã thêm sản phẩm vào giỏ hàng thành công', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
        });
    };


    handleBuyNow = () => {
        this.handleAddToCart(); // Thêm sản phẩm vào giỏ hàng
        this.props.history.push('/cart'); // Chuyển hướng đến trang giỏ hàng
    };

    render() {
        const { newComment, product, error, isExpanded, quantity } = this.state;

        if (error) {
            return <div className="error-message">{error}</div>;
        }

        if (!product) {
            return <div className="loading">Đang tải sản phẩm...</div>;
        }

        const truncatedDescription =
            product.description && product.description.length > 200
                ? product.description.substring(0, 200) + '...'
                : product.description;


        return (
            <div className="product-detail-container">
                <div className="product-detail">
                    <div className="product-section-left">
                        <img
                            src={`http://localhost:8080${product.image}`}
                            alt={product.name}
                            className="product-image"
                        />
                    </div>

                    <div className="product-section-center">
                        <h1 className="product-title">{product.name}</h1>
                        <p className="product-price">
                            {product.price.toLocaleString()} VNĐ
                        </p>
                        <ul className="product-features">
                            <li>Thể loại: {product.category?.name}</li>
                        </ul>

                        <div className="product-description">
                            <p>
                                {isExpanded ? product.description : truncatedDescription}
                            </p>
                            <button
                                className="toggle-description-btn"
                                onClick={this.toggleDescription}
                            >
                                {isExpanded ? 'Thu gọn' : 'Xem thêm'}
                            </button>
                        </div>
                    </div>

                    <div className="product-section-right">
                        <div className="quantity-container">
                            <span className="quantity-label">Số lượng</span>
                            <div className="quantity-controls">
                                <button
                                    className="btn-decrease"
                                    onClick={this.handleDecrease}
                                >
                                    -
                                </button>
                                <input
                                    type="text"
                                    className="quantity-input"
                                    value={quantity}
                                    readOnly
                                />
                                <button
                                    className="btn-increase"
                                    onClick={this.handleIncrease}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="product-actions">
                            <button className="btn-buy-now" onClick={this.handleBuyNow}>Mua ngay</button>
                            <button className="btn-add-cart" onClick={this.handleAddToCart}>
                                Thêm vào giỏ
                            </button>
                        </div>

                        <div className="product-support">
                            <div className="support-item">
                                <img
                                    src="https://kretoss.com/wp-content/themes/kretoss-technology/assets/media/thank-you-img.png"
                                    alt="Đúng thuốc chuẩn"
                                />
                                <span>Đúng thuốc chuẩn</span>
                            </div>
                            <div className="support-item">
                                <img
                                    src="https://png.pngtree.com/png-clipart/20210627/original/pngtree-delivery-man-with-scooter-transparent-background-png-image_6462571.jpg"
                                    alt="Giao hàng siêu tốc"
                                />
                                <span>Giao hàng siêu tốc</span>
                            </div>
                            <div className="support-item">
                                <img
                                    src="https://dongphucpanda.com/wp-content/uploads/2020/09/mienphi-vanchuyen-1.png"
                                    alt="Miễn phí vận chuyển"
                                />
                                <span>Miễn phí vận chuyển</span>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="comments-section">
                    <h3>Bình luận sản phẩm</h3>
                    <div className="comment-form">
                        <textarea
                            value={newComment}
                            onChange={this.handleCommentChange}
                            placeholder="Viết bình luận..."
                        ></textarea>
                        <button onClick={this.handleCommentSubmit}>Gửi bình luận</button>
                    </div>
                    <div className="comments-list">{this.renderComments()}</div>
                </div>
            </div>
        );
    }
}

export default withRouter(ProductDetail);
