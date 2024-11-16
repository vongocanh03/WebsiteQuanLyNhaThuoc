import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModalProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            quantity: '',
            category: '',
            image: ''
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
                image: ''
            });
        });
    }

    componentDidMount() {}

    toggle = () => {
        this.props.toggleFromParent();
    };

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
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
        if (isValid === true) {
            this.props.createNewProduct(this.state);
        }
    };

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle(); }}
                className={'modal-product-container'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle(); }}>Create a new product</ModalHeader>
                <ModalBody>
                    <div className='modal-product-body'>
                        <div className='input-container'>
                            <label>Name</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, 'name'); }}
                                value={this.state.name}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Price</label>
                            <input
                                type='number'
                                onChange={(event) => { this.handleOnChangeInput(event, 'price'); }}
                                value={this.state.price}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Quantity</label>
                            <input
                                type='number'
                                onChange={(event) => { this.handleOnChangeInput(event, 'quantity'); }}
                                value={this.state.quantity}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Category</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, 'category'); }}
                                value={this.state.category}
                            />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Image URL</label>
                            <input
                                type='file'
                                onChange={(event) => { this.handleOnChangeInput(event, 'image'); }}
                                value={this.state.image}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3'
                        onClick={() => { this.handleAddNewProduct(); }}
                    >Add new</Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle(); }}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalProduct);
