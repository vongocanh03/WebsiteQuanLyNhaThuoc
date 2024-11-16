import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import { connect } from 'react-redux';

class ModalCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '' // Chỉ cần một trường tên thể loại
        }
        this.listenToEmiiter();
    }

    listenToEmiiter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                name: '' // Xóa tên thể loại khi sự kiện được kích hoạt
            })
        })
    }

    componentDidMount() {
        // Có thể thêm các cấu hình nếu cần thiết
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    checkValideInput = () => {
        let isValid = true;
        if (!this.state.name) {
            isValid = false;
            alert('Missing parameter: name');
        }
        return isValid;
    }

    handleAddNewCategory = () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
            this.props.createNewCategory(this.state); // Gọi hàm tạo thể loại mới từ props
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-category-container'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Create a new category</ModalHeader>
                <ModalBody>
                    <div className='modal-category-body'>
                        <div className='input-container'>
                            <label>Name</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, "name") }}
                                value={this.state.name}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3'
                        onClick={() => { this.handleAddNewCategory() }}
                    >Add new</Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCategory);
