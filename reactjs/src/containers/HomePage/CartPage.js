// CartPage.js
import React, { Component } from 'react';
import './CartPage.scss';

class CartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: JSON.parse(localStorage.getItem(`cartItems_${localStorage.getItem('userId')}`)) || [], // Lấy giỏ hàng của người dùng
            orders: [], // Thêm state để lưu đơn hàng đã mua
        };
    }

    handleIncrease = (index) => {
        this.setState((prevState) => {
            const updatedCart = [...prevState.cart];
            updatedCart[index].quantity += 1;
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            return { cart: updatedCart };
        });
    };

    handleDecrease = (index) => {
        this.setState((prevState) => {
            const updatedCart = [...prevState.cart];
            if (updatedCart[index].quantity > 1) {
                updatedCart[index].quantity -= 1;
                localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            }
            return { cart: updatedCart };
        });
    };

    handleRemove = (index) => {
        this.setState((prevState) => {
            const updatedCart = prevState.cart.filter((item, i) => i !== index);
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            return { cart: updatedCart };
        });
    };

    handleSaveCart = async () => {
        const { cart } = this.state;
        const userId = localStorage.getItem('userId'); // Lấy từ localStorage

        try {
            const response = await fetch('http://localhost:8080/api/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, cartItems: cart }),
            });

            if (response.ok) {
                alert('Giỏ hàng đã được lưu!');
            } else {
                alert('Lỗi khi lưu giỏ hàng');
            }
        } catch (error) {
            console.error('Lỗi:', error);
            alert('Lỗi khi lưu giỏ hàng');
        }
    };

    handleCheckout = async () => {
        await this.handleSaveCart(); // Lưu giỏ hàng trước khi chuyển trang
        const { history } = this.props;
        history.push('/address-form', { cart: this.state.cart }); // Truyền giỏ hàng qua props
    };

    handleFetchOrders = async () => {
        const userId = localStorage.getItem('userId'); // Lấy từ localStorage


        try {
            const response = await fetch(`http://localhost:8080/api/orders?userId=${userId}`);
            if (response.ok) {
                const data = await response.json();
                this.setState({ orders: data });
            } else {
                alert('Lỗi khi lấy danh sách đơn hàng');
            }
        } catch (error) {
            console.error('Lỗi:', error);
            alert('Lỗi khi lấy danh sách đơn hàng');
        }
    };

    render() {
        const { cart, orders } = this.state;
        const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const userId = localStorage.getItem('userId');
        if (!userId) {
            return <p>Vui lòng đăng nhập để sử dụng giỏ hàng.</p>;
        }
        return (
            <div className="cart-page">
                <h1 className="cart-title">Giỏ hàng ({cart.length})</h1>
                {cart.length === 0 ? (
                    <p className="empty-cart">Giỏ hàng của bạn trống.</p>
                ) : (
                    <div className="cart-content">
                        <div className="cart-items">
                            {cart.map((item, index) => (
                                <div key={index} className="cart-item">
                                    <img
                                        src={`http://localhost:8080${item.image}`}
                                        alt={item.name}
                                        className="cart-item-image"
                                    />
                                    <div className="cart-item-info">
                                        <h3 className="item-name">{item.name}</h3>
                                        <p className="item-category">Phân loại: {item.category || 'Không xác định'}</p>
                                    </div>
                                    <div className="cart-item-actions">
                                        <p className="item-price">{item.price.toLocaleString()} VNĐ</p>
                                        <div className="quantity-controls">
                                            <button className="decrease" onClick={() => this.handleDecrease(index)}>-</button>
                                            <span className="quantity">{item.quantity}</span>
                                            <button className="increase" onClick={() => this.handleIncrease(index)}>+</button>
                                        </div>
                                        <button className="remove-button" onClick={() => this.handleRemove(index)}>
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <div className="summary-details">
                                <h3>Tổng tiền: <span>{total.toLocaleString()} VNĐ</span></h3>
                            </div>
                            <button className="checkout-button" onClick={this.handleCheckout}>
                                Mua hàng ({cart.length})
                            </button>
                        </div>
                    </div>
                )}

                <button className="orders-button" onClick={this.handleFetchOrders}>
                    Đơn hàng của bạn
                </button>

                {orders.length > 0 && (
                    <div className="orders-list">
                        <h2>Danh sách đơn hàng</h2>
                        {orders.map((order, index) => (
                            <div key={index} className="order-item">
                                <h3>Đơn hàng #{order.id}</h3>
                                <ul>
                                    {order.items.map((item, idx) => (
                                        <li key={idx}>{item.name} - Số lượng: {item.quantity}</li>
                                    ))}
                                </ul>
                                <p>Tổng tiền: {order.total.toLocaleString()} VNĐ</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

export default CartPage;
