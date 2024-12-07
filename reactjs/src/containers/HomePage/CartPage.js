import React, { Component } from 'react';
import './CartPage.scss'; // Đảm bảo tạo file SCSS này

class CartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: JSON.parse(localStorage.getItem('cartItems')) || [],
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

    render() {
        const { cart } = this.state;

        const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
                                        <button
                                            className="remove-button"
                                            onClick={() => this.handleRemove(index)}
                                        >
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
                            <button className="checkout-button">Mua hàng ({cart.length})</button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default CartPage;
