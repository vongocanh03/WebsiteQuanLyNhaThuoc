import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllProducts, createNewProductService, deleteProductService, updateProductService } from '../../services/productService';
import './ProductManage.scss';
import ModalProduct from './ModalProduct';
import { emitter } from '../../utils/emitter';
import ModalEditProduct from './ModalEditProduct';

class ProductManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrProducts: [],
            isOpenModalProduct: false,
            isOpenModalEditProduct: false,
            productEdit: {}
        };
    }

    async componentDidMount() {
        await this.getAllProductsFromReact();
    }

    getAllProductsFromReact = async () => {
        try {
            const response = await getAllProducts();
            console.log('Phản hồi API:', response); // Kiểm tra phản hồi API
            if (response && response.products) {
                this.setState({ arrProducts: response.products });
            } else {
                console.error('Dữ liệu sản phẩm không hợp lệ');
            }
        } catch (error) {
            console.error('Lỗi khi lấy sản phẩm:', error);
        }
    };

    handleAddNewProduct = () => {
        this.setState({
            isOpenModalProduct: true
        });
    };

    toggleProductModal = () => {
        this.setState({
            isOpenModalProduct: !this.state.isOpenModalProduct
        });
    };

    toggleProductEditModal = () => {
        this.setState({
            isOpenModalEditProduct: !this.state.isOpenModalEditProduct
        });
    };

    createNewProduct = async (data) => {
        console.log('Sending data to create product:', data); // Log dữ liệu gửi đi
        try {
            let response = await createNewProductService(data); // Gọi API tạo sản phẩm
            console.log('API Response:', response); // Log toàn bộ phản hồi từ API
    
            if (response && response.errCode === 0) {
                await this.getAllProductsFromReact(); // Làm mới danh sách sản phẩm
                this.setState({
                    isOpenModalProduct: false, // Đóng modal
                });
                emitter.emit('EVENT_CLEAR_MODAL_DATA'); // Xóa dữ liệu trong modal
                alert('Product added successfully!');
            } else {
                console.error('Error response:', response); // Log lỗi phản hồi từ API
                alert(response.errMessage || 'Failed to add product.');
            }
        } catch (e) {
            console.error('Error creating product:', e); // Log lỗi nếu gặp phải
            alert('An error occurred. Please try again later.');
        }
    };
    
    
    
    handleDeleteProduct = async (product) => {
        try {
            let res = await deleteProductService(product.id);
            if (res && res.errCode === 0) {
                await this.getAllProductsFromReact();
            } else {
                alert(res.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    };

    handleEditProduct = (product) => {
        this.setState({
            isOpenModalEditProduct: true,
            productEdit: product
        });
    };

    doEditProduct = async (product) => {
        try {
            let res = await updateProductService(product);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditProduct: false
                });
                await this.getAllProductsFromReact();
            } else {
                alert(res.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        let { arrProducts } = this.state;

        return (
            <div className="products-container">
                <ModalProduct
                    isOpen={this.state.isOpenModalProduct}
                    toggleFromParent={this.toggleProductModal}
                    createNewProduct={this.createNewProduct}
                />

                {this.state.isOpenModalEditProduct &&
                    <ModalEditProduct
                        isOpen={this.state.isOpenModalEditProduct}
                        toggleFromParent={this.toggleProductEditModal}
                        currentProduct={this.state.productEdit}
                        editProduct={this.doEditProduct}
                    />
                }

                <div className="title text-center">Manage Products</div>
                <div className='mx-1'>
                    <button
                        className='btn btn-primary px-3'
                        onClick={this.handleAddNewProduct}
                    >
                        <i className='fas fa-plus'></i> Add new product
                    </button>
                </div>
                <div className="products-table mt-3 mx-1">
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrProducts && arrProducts.length > 0 ? arrProducts.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        {item.image && (
                                            <img
                                                src={`http://localhost:8080${item.image}`}
                                                alt={item.name}
                                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                            />
                                        )}
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.category ? item.category.name : 'N/A'}</td>
                                    <td>
                                        <button className='btn-edit' onClick={() => this.handleEditProduct(item)}>
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                        <button className='btn-delete' onClick={() => this.handleDeleteProduct(item)}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="text-center">No products found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
