import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import { getAllCategories } from '../../services/categoryService';

class ModalProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            quantity: '',
            category: '', // Đảm bảo category có giá trị mặc định là rỗng
            image: null, // Dữ liệu file
            categories: [] // Lưu danh sách categories
        };
        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                name: '',
                price: '',
                quantity: '',
                category: '',
                image: null
            });
        });
    }

    async componentDidMount() {
        try {
            const response = await getAllCategories(); // Gọi API
            console.log('Phản hồi từ API getAllCategories:', response);

            // Kiểm tra và gán danh sách categories vào state
            if (response && response.categories && Array.isArray(response.categories)) {
                this.setState({ categories: response.categories }, () => {
                    console.log('Categories in state after setState:', this.state.categories);
                });
            } else {
                console.error('API response không chứa categories hoặc không đúng định dạng:', response);
            }
        } catch (error) {
            console.error('Lỗi khi gọi API getAllCategories:', error);

            // Thêm dữ liệu mẫu nếu API bị lỗi
            const fakeCategories = [
                { id: 1, name: 'Thuốc đau đầu' },
                { id: 2, name: 'Thuốc cảm cúm' },
                { id: 3, name: 'Thuốc bổ' },
            ];
            this.setState({ categories: fakeCategories }, () => {
                console.log('Dữ liệu giả được sử dụng cho categories:', this.state.categories);
            });
        }
    }



    toggle = () => {
        this.props.toggleFromParent();
    };

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };

        // Xử lý riêng cho input file
        if (id === 'image') {
            copyState[id] = event.target.files[0];
        } else {
            copyState[id] = event.target.value;
        }

        this.setState({
            ...copyState
        });
    };

    checkValidInput = () => {
        let isValid = true;
        let arrInput = ['name', 'price', 'quantity', 'category'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    };

    handleAddNewProduct = () => {
        let isValid = this.checkValidInput();
        if (isValid) {
            // Truyền image file và các giá trị khác
            const formData = new FormData();
            formData.append('name', this.state.name);
            formData.append('price', this.state.price);
            formData.append('quantity', this.state.quantity);
            formData.append('category', this.state.category);
            if (this.state.image) {
                formData.append('image', this.state.image);
            }

            this.props.createNewProduct(formData);
            // Reset form sau khi gửi
            this.setState({
                name: '',
                price: '',
                quantity: '',
                category: '',
                image: null,
            });
        }
    };

    render() {
        console.log('Categories in render:', this.state.categories); // Kiểm tra tại đây
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={this.toggle}
                className={'modal-product-container'}
                size="lg"
            >
                <ModalHeader toggle={this.toggle}>Create a new product</ModalHeader>
                <ModalBody>
                    <div className="modal-product-body">
                        <div className="input-container">
                            <label>Name</label>
                            <input
                                type="text"
                                onChange={(event) => this.handleOnChangeInput(event, 'name')}
                                value={this.state.name}
                            />
                        </div>
                        <div className="input-container">
                            <label>Price</label>
                            <input
                                type="number"
                                onChange={(event) => this.handleOnChangeInput(event, 'price')}
                                value={this.state.price}
                            />
                        </div>
                        <div className="input-container">
                            <label>Quantity</label>
                            <input
                                type="number"
                                onChange={(event) => this.handleOnChangeInput(event, 'quantity')}
                                value={this.state.quantity}
                            />
                        </div>
                        <div className="input-container">
                            <label>Category</label>
                            <select
                                onChange={(event) => this.handleOnChangeInput(event, 'category')}
                                value={this.state.category}
                            >
                                <option value="">Select a category</option>
                                {this.state.categories && this.state.categories.length > 0 ? (
                                    this.state.categories.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>Loading categories...</option>
                                )}
                            </select>

                        </div>
                        <div className="input-container max-width-input">
                            <label>Image</label>
                            <input
                                type="file"
                                onChange={(event) => this.handleOnChangeInput(event, 'image')}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className="px-3"
                        onClick={this.handleAddNewProduct}
                    >
                        Add new
                    </Button>{' '}
                    <Button color="secondary" className="px-3" onClick={this.toggle}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }

}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalProduct);
