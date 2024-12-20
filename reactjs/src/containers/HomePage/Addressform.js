import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory
import './Addressform.scss';

const AddressForm = ({ location }) => {
    const history = useHistory(); // Khởi tạo useHistory
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
    const [cart, setCart] = useState(location?.state?.cart || []);  // Giữ lại giỏ hàng

    useEffect(() => {
        axios.get('https://provinces.open-api.vn/api/?depth=1')
            .then(response => setProvinces(response.data))
            .catch(error => console.error('Error fetching provinces:', error));
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            axios.get(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
                .then(response => setDistricts(response.data.districts))
                .catch(error => console.error('Error fetching districts:', error));
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
                .then(response => setWards(response.data.wards))
                .catch(error => console.error('Error fetching wards:', error));
        }
    }, [selectedDistrict]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !phone || !selectedProvince || !selectedDistrict || !selectedWard) {
            alert('Vui lòng nhập đầy đủ thông tin.');
            return;
        }

        const fullAddress = `${addressDetails}, ${wards.find(w => w.code === selectedWard)?.name}, ${districts.find(d => d.code === selectedDistrict)?.name}, ${provinces.find(p => p.code === selectedProvince)?.name}`;

        const formData = {
            name,
            email,
            phone,
            address: fullAddress,
            cart,
        };

        try {
            const response = await axios.post('http://localhost:8080/api/orders/create', formData);
            const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
            // Điều hướng sang trang PaymentButton
            history.push({
                pathname: '/payment',
                state: {
                    name,
                    phone,
                    cart,
                    totalAmount,
                },
            });
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Có lỗi xảy ra khi tạo đơn hàng');
        }
    };

    return (
        <div className="address-form">
            <h2>Nhập thông tin giao hàng</h2>
            <form onSubmit={handleSubmit}>
            <div className="cart-summary">
                    <h3>Thông tin giỏ hàng</h3>
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index}>
                                <p>Sản phẩm: {item.name}</p>
                                <p>Số lượng: {item.quantity}</p> {/* Hiển thị số lượng */}
                            </li>
                        ))}
                    </ul>
                </div>
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

                <button type="submit" className="submit-button">
                    Xác nhận và Thanh toán
                </button>
            </form>
        </div>
    );
};

export default AddressForm;
