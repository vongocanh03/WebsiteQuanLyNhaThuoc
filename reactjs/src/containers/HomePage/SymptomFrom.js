import React, { useState } from 'react';
import axios from 'axios';
import './SymptomForm.scss';
import { Link } from 'react-router-dom';

const SymptomForm = () => {
    const [symptoms, setSymptoms] = useState('');
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('http://localhost:8080/api/symptoms/suggest', {
                symptoms: symptoms.split(',').map((symptom) => symptom.trim()),
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setError('Không thể lấy dữ liệu sản phẩm. Vui lòng thử lại.');
        }
    };

    return (
        <div className="symptom-form-container">
            <div className="form-section">
                <h2 className="form-title">Nhập triệu chứng của bạn:</h2>
                <form onSubmit={handleSubmit} className="symptom-form">
                    
                    <input
                        id="symptom-input"
                        type="text"
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        placeholder="Ví dụ: đau đầu, sốt"
                        className="form-input"
                    />
                    <button type="submit" className="form-button">Gợi ý thuốc</button>
                </form>
                {error && <div className="error-message">{error}</div>}
            </div>

            {products.length > 0 ? (
                <div className="product-section">
                    <h3 className="section-title">Danh sách thuốc gợi ý</h3>
                    <div className="product-grid">
                        {products.map((product) => (
                            <div key={product.id} className="product-card">
                                <img
                                    src={`http://localhost:8080${product.image}`}
                                    alt={product.name}
                                    className="product-image"
                                />
                                <div className="product-details">
                                    <h4 className="product-name">{product.name}</h4>
                                    <p className="product-price">Giá: {product.price} VNĐ</p>
                                </div>
                                <Link to={`/product/${product.id}`} className="buy-now-button">Mua ngay</Link>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                !error && <p className="no-products">Không có sản phẩm nào được gợi ý.</p>
            )}
        </div>
    );
};

export default SymptomForm;