import React from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // Sử dụng useLocation để lấy thông tin từ trang trước
import './PaymentButton.scss'; // Đảm bảo đã import file SCSS

const PaymentButton = () => {
    const location = useLocation(); // Dùng useLocation để lấy thông tin từ state
    const { name, phone, cart, totalAmount } = location.state || {}; // Truy xuất thông tin

    if (!name || !phone || !cart || !totalAmount) {
        return <div>Thông tin đơn hàng không hợp lệ. Vui lòng thử lại.</div>;
    }

    const handlePaymentMoMo = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/momo/pay', {
                amount: totalAmount, // Sử dụng tổng tiền từ state
                orderInfo: `Thanh toán đơn hàng của ${name} (${phone})`, // Mô tả đơn hàng
            });

            if (response.data.payUrl) {
                window.location.href = response.data.payUrl; // Chuyển hướng tới URL thanh toán MoMo
            } else {
                alert('Không thể tạo giao dịch với MoMo');
            }
        } catch (error) {
            console.error('Error creating MoMo payment:', error);
            alert('Có lỗi xảy ra khi thanh toán với MoMo');
        }
    };

    const handlePaymentVNPay = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/vnpay/pay', {
                amount: totalAmount, // Sử dụng tổng tiền từ state
                orderInfo: `Thanh toán đơn hàng của ${name} (${phone})`, // Mô tả đơn hàng
            });

            if (response.data.payUrl) {
                window.location.href = response.data.payUrl; // Chuyển hướng tới URL thanh toán VNPay
            } else {
                alert('Không thể tạo giao dịch với VNPay');
            }
        } catch (error) {
            console.error('Error creating VNPay payment:', error);
            alert('Có lỗi xảy ra khi thanh toán với VNPay');
        }
    };

    return (
        <div className="payment-container">
            <h2>Thông tin đơn hàng</h2>
            <p><strong>Họ tên:</strong> {name}</p>
            <p><strong>Số điện thoại:</strong> {phone}</p>

            <div className="table-container">
                <h3>Sản phẩm trong giỏ hàng</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart?.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price} đ</td>
                                <td>{item.quantity * item.price} đ</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <p className="total-amount"><strong>Tổng tiền:</strong> {totalAmount} đ</p>

            <div className="payment-buttons" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={handlePaymentMoMo} className="momo-button">
                    Thanh toán với MoMo
                </button>
                <button onClick={handlePaymentVNPay} className="vnpay-button">
                    Thanh toán với VNPay
                </button>
            </div>
        </div>
    );
};

export default PaymentButton;
