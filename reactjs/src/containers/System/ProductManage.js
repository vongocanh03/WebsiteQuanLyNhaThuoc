import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './ProductManage.scss';
import { Redirect } from 'react-router-dom';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa'; class ProductManage extends Component {
    state = {
        products: [],
        shouldRedirect: false,
        error: null // Thêm trạng thái lỗi
    };

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/products');
            console.log('Dữ liệu nhận được:', response.data); // Kiểm tra dữ liệu trả về từ API
            this.setState({ products: response.data.products });
        } catch (error) {
            console.error('Error fetching products:', error);
            this.setState({ error: 'Không thể tải dữ liệu sản phẩm' });
        }
    };

    handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:8080/api/products/${productId}`);
            this.fetchProducts(); // Tải lại danh sách sản phẩm sau khi xóa
        } catch (error) {
            console.error('Error deleting product:', error);
            this.setState({ error: 'Không thể xóa sản phẩm' });
        }
    };

    handleEditProduct = (productId) => {
        console.log(`Edit product with ID: ${productId}`);
    };

    handleAddProduct = () => {
        console.log('Navigate to add product page');
    };

    render() {
        const { products, shouldRedirect, error } = this.state;

        if (shouldRedirect) {
            return <Redirect to="/new-page" />;
        }

        return (
            <div className="product-container">
                <div className="title text-center">Manage Products</div>
                <div className="product-table mt-3 mx-1">
                    {error && <div className="error-message">{error}</div>} {/* Hiển thị thông báo lỗi nếu có */}
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>
                                        {product.image && (
                                            <img
                                                src={`http://localhost:8080${product.image}`}
                                                alt={product.name}
                                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                            />
                                        )}

                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.price} VND</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.category ? product.category.name : 'N/A'}</td>
                                    <td>
                                        <button onClick={() => this.handleEditProduct(product.id)} className="edit-btn">
                                            <FaEdit className="action-icon" />
                                            
                                        </button>
                                        <button onClick={() => this.handleDeleteProduct(product.id)} className="delete-btn">
                                            <FaTrash className="action-icon" />
                                            
                                        </button>
                                        <button onClick={this.handleAddProduct} className="add-btn">
                                            <FaPlus className="action-icon" />
                            
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
