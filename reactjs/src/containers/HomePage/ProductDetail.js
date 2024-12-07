import React, { Component } from 'react';
import { getProductById } from '../../services/productService';
import { withRouter } from 'react-router-dom'; // Để chuyển hướng
import './ProductDetail.scss';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            error: null,
            isExpanded: false,
            quantity: 1,
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
    }

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
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category?.name || 'Không xác định', // Lưu thêm thể loại
            quantity,
        };

        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

        if (existingItemIndex !== -1) {
            cartItems[existingItemIndex].quantity += quantity; // Nếu sản phẩm đã có trong giỏ, tăng số lượng
        } else {
            cartItems.push(cartItem); // Nếu sản phẩm chưa có, thêm mới
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    };

    handleBuyNow = () => {
        this.handleAddToCart(); // Thêm sản phẩm vào giỏ hàng
        this.props.history.push('/cart'); // Chuyển hướng đến trang giỏ hàng
    };

    render() {
        const { product, error, isExpanded, quantity } = this.state;

        if (error) {
            return <div className="error-message">{error}</div>;
        }

        if (!product) {
            return <div className="loading">Đang tải...</div>;
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
            </div>
        );
    }
}

export default withRouter(ProductDetail);
