import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Addressform.scss';

const AddressForm = ({ location, onAddressSubmit }) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [addressDetails, setAddressDetails] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [cart, setCart] = useState(location?.state?.cart || []); // Nhận giỏ hàng từ CartPage

    // Lấy danh sách tỉnh
    useEffect(() => {
        axios.get('https://provinces.open-api.vn/api/?depth=1')
            .then(response => setProvinces(response.data))
            .catch(error => console.error('Error fetching provinces:', error));
    }, []);

    // Lấy danh sách huyện khi chọn tỉnh
    useEffect(() => {
        if (selectedProvince) {
            axios.get(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
                .then(response => setDistricts(response.data.districts))
                .catch(error => console.error('Error fetching districts:', error));
        }
    }, [selectedProvince]);

    // Lấy danh sách xã khi chọn huyện
    useEffect(() => {
        if (selectedDistrict) {
            axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
                .then(response => setWards(response.data.wards))
                .catch(error => console.error('Error fetching wards:', error));
        }
    }, [selectedDistrict]);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!name || !email || !phone || !selectedProvince || !selectedDistrict || !selectedWard) {
            alert('Vui lòng nhập đầy đủ thông tin.');
            return;
        }
    
        // Kết hợp địa chỉ đầy đủ
        const fullAddress = `${addressDetails}, ${wards.find(w => w.code === selectedWard)?.name}, ${districts.find(d => d.code === selectedDistrict)?.name}, ${provinces.find(p => p.code === selectedProvince)?.name}`;
    
        // Dữ liệu gửi lên server
        const formData = {
            name,
            email,
            phone,
            address: fullAddress,
            cart, // Giỏ hàng
        };
    
        // Gửi yêu cầu tạo đơn hàng
        axios.post('http://localhost:8080/api/orders/create', formData)
            .then(response => {
                alert('Đơn hàng đã được gửi thành công!');
                onAddressSubmit(response.data);
            })
            .catch(error => {
                console.error('Lỗi khi gửi đơn hàng:', error);
                alert('Có lỗi xảy ra khi gửi đơn hàng. Vui lòng thử lại.');
            });
    };

    return (
        <div className="address-form">
            <h2>Nhập thông tin giao hàng</h2>
            <form onSubmit={handleSubmit}>
                {/* Các input form như đã có */}
                <div className="form-group">
                    <label htmlFor="name">Họ và tên</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập họ và tên"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Nhập email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Số điện thoại</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Nhập số điện thoại"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="province">Tỉnh/Thành phố</label>
                    <select
                        id="province"
                        value={selectedProvince}
                        onChange={(e) => setSelectedProvince(e.target.value)}
                    >
                        <option value="">Chọn Tỉnh/Thành phố</option>
                        {provinces.map((province) => (
                            <option key={province.code} value={province.code}>
                                {province.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="district">Quận/Huyện</label>
                    <select
                        id="district"
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        disabled={!selectedProvince}
                    >
                        <option value="">Chọn Quận/Huyện</option>
                        {districts.map((district) => (
                            <option key={district.code} value={district.code}>
                                {district.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="ward">Phường/Xã</label>
                    <select
                        id="ward"
                        value={selectedWard}
                        onChange={(e) => setSelectedWard(e.target.value)}
                        disabled={!selectedDistrict}
                    >
                        <option value="">Chọn Phường/Xã</option>
                        {wards.map((ward) => (
                            <option key={ward.code} value={ward.code}>
                                {ward.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="address-details">Chi tiết địa chỉ</label>
                    <textarea
                        id="address-details"
                        value={addressDetails}
                        onChange={(e) => setAddressDetails(e.target.value)}
                        placeholder="Nhập địa chỉ chi tiết"
                        required
                    />
                </div>

                <button type="submit" className="submit-button">Xác nhận</button>
            </form>

            <div className="cart-summary">
                <h3>Đơn hàng của bạn</h3>
                {cart.length > 0 ? (
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index} className="cart-item">
                                <div className="cart-item-image">
                                    <img
                                        src={`http://localhost:8080${item.image}`}
                                        alt={item.name}
                                        className="cart-item-image"
                                    />
                                </div>
                                <div className="cart-item-details">
                                    <p>{item.name} x {item.quantity} - {item.price * item.quantity} VNĐ</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Giỏ hàng trống.</p>
                )}
            </div>
        </div>
    );
};

export default AddressForm;
