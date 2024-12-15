import React, { Component } from 'react';
import { getAllProducts } from '../../services/productService';
import './ProductList.scss';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrProducts: [],
            currentPage: 1,
            productsPerPage: 10, // Hiển thị 10 sản phẩm mỗi trang (2 hàng, mỗi hàng 5 sản phẩm)
        };
    }

    async componentDidMount() {
        await this.getAllProductsFromReact();
    }

    getAllProductsFromReact = async () => {
        try {
            const response = await getAllProducts();
            if (response && response.products) {
                this.setState({ arrProducts: response.products });
            } else {
                console.error('Failed to fetch products');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Hàm để tính toán các sản phẩm cần hiển thị cho trang hiện tại
    getCurrentPageProducts = () => {
        const { arrProducts, currentPage, productsPerPage } = this.state;
        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        return arrProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    };

    // Hàm chuyển trang
    handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
    };

    handleBuyNow = (product) => {
        alert(`Bạn đã chọn mua sản phẩm: ${product.name}`);
        // Thêm logic xử lý mua hàng ở đây, ví dụ thêm vào giỏ hàng.
    };

    render() {
        const { currentPage, productsPerPage, arrProducts } = this.state;
        const totalPages = Math.ceil(arrProducts.length / productsPerPage); // Tính tổng số trang

        const currentProducts = this.getCurrentPageProducts();

        return (
            <div className="product-list-container">
                <div className="title text-center"><FormattedMessage id="homeheader.product-list" /></div>
                <div className="products-list">
                    {currentProducts.length > 0 ? (
                        currentProducts.map((product, index) => (
                            <div className="product-item" key={index}>
                                <img
                                    src={`http://localhost:8080${product.image}`}
                                    alt={product.name}
                                    className="product-image"
                                />
                                <div className="product-info">
                                    <h5>{product.name}</h5>
                                    <p>Giá: {product.price} VNĐ</p>
                                    <p>Loại: {product.category ? product.category.name : 'N/A'}</p>
                                </div>
                                <button className="btn btn-buy-now">
                                    <Link to={`/product/${product.id}`}>Mua ngay</Link>
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="no-products">Không có sản phẩm nào</div>
                    )}
                </div>

                {/* Pagination Controls */}
                <div className="pagination-controls">
                    <button
                        onClick={() => this.handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>{`Trang ${currentPage} / ${totalPages}`}</span>
                    <button
                        onClick={() => this.handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    }
}

export default ProductList;
