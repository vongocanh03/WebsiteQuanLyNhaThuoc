import React, { Component } from 'react';
import { getProductById } from '../../services/productService';
import './ProductDetail.scss';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            error: null,
            isExpanded: false, // Quản lý trạng thái "Xem thêm/Thu gọn"
            quantity: 1, // Số lượng mặc định
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

    // Xử lý tăng số lượng
    handleIncrease = () => {
        this.setState((prevState) => ({
            quantity: prevState.quantity + 1,
        }));
    };

    // Xử lý giảm số lượng
    handleDecrease = () => {
        this.setState((prevState) => ({
            quantity: prevState.quantity > 1 ? prevState.quantity - 1 : 1, // Không giảm xuống dưới 1
        }));
    };

    toggleDescription = () => {
        this.setState((prevState) => ({
            isExpanded: !prevState.isExpanded, // Đảo trạng thái giữa "Xem thêm" và "Thu gọn"
        }));
    };

    render() {
        const { product, error, isExpanded, quantity } = this.state;

        if (error) {
            return <div className="error-message">{error}</div>;
        }

        if (!product) {
            return <div className="loading">Đang tải...</div>;
        }

        // Rút gọn mô tả sản phẩm nếu chưa nhấn "Xem thêm"
        const truncatedDescription =
            product.description && product.description.length > 200
                ? product.description.substring(0, 200) + '...'
                : product.description;

        return (
            <div className="product-detail-container">
                <div className="product-detail">
                    {/* Phần hình ảnh */}
                    <div className="product-section-left">
                        <img
                            src={`http://localhost:8080${product.image}`}
                            alt={product.name}
                            className="product-image"
                        />
                    </div>

                    {/* Phần thông tin sản phẩm */}
                    <div className="product-section-center">
                        <h1 className="product-title">{product.name}</h1>
                        <p className="product-price">
                            {product.price.toLocaleString()} VNĐ
                        </p>
                        <ul className="product-features">
                            <li>Thể loại: {product.category?.name}</li>
                        </ul>

                        {/* Phần mô tả sản phẩm */}
                        <div className="product-description">
                            <p>
                                {isExpanded
                                    ? product.description
                                    : truncatedDescription}
                            </p>
                            <button
                                className="toggle-description-btn"
                                onClick={this.toggleDescription}
                            >
                                {isExpanded ? 'Thu gọn' : 'Xem thêm'}
                            </button>
                        </div>
                    </div>

                    {/* Phần hành động */}
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

                        {/* Nút hành động */}
                        <div className="product-actions">
                            <button className="btn-buy-now">Mua ngay</button>
                            <button className="btn-add-cart">Thêm vào giỏ</button>
                        </div>

                        {/* Chính sách hỗ trợ */}
                        <div className="product-support">
                            <div className="support-item">
                                <img
                                    src="https://kretoss.com/wp-content/themes/kretoss-technology/assets/media/thank-you-img.png"
                                    alt="Đủ thuốc chuẩn"
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

export default ProductDetail;
