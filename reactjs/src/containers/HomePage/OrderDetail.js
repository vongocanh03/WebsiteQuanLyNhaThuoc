import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const OrderDetail = () => {
    const location = useLocation();
    const { orderId } = location.state || {}; // Lấy orderId từ state

    // Thêm log để kiểm tra orderId
    console.log('orderId:', orderId); // Kiểm tra giá trị của orderId

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (orderId) {
            const fetchOrderDetail = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/orders/${orderId}`);
                    setOrder(response.data.order);
                } catch (error) {
                    setError('Có lỗi xảy ra khi lấy chi tiết đơn hàng');
                } finally {
                    setLoading(false);
                }
            };

            fetchOrderDetail();
        } else {
            setError('Không có thông tin đơn hàng');
            setLoading(false);
        }
    }, [orderId]);

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Chi tiết đơn hàng</h2>
            {order && (
                <div>
                    <p><strong>Họ tên:</strong> {order.name}</p>
                    <p><strong>Số điện thoại:</strong> {order.phone}</p>
                    <p><strong>Địa chỉ:</strong> {order.address}</p>
                    <p><strong>Tổng tiền:</strong> {order.totalAmount} đ</p>

                    <h3>Sản phẩm trong đơn hàng</h3>
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
                            {order.products.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.orderProduct.quantity}</td>
                                    <td>{item.price} đ</td>
                                    <td>{item.orderProduct.quantity * item.price} đ</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <p><strong>Trạng thái thanh toán:</strong> {order.paymentStatus ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
                </div>
            )}
        </div>
    );
};

export default OrderDetail;
