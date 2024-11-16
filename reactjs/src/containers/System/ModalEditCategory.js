import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';

class ModalEditCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: ''
        }
    }

    componentDidMount() {
        let category = this.props.currentCategory;
        if (category && !_.isEmpty(category)) {
            this.setState({
                id: category.id,
                name: category.name
            })
        }
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
            alert('Missing category name!');
        }
        return isValid;
    }

    handleSaveCategory = () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
            this.props.editCategory(this.state);
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
                <ModalHeader toggle={() => { this.toggle() }}>Edit Category</ModalHeader>
                <ModalBody>
                    <div className='modal-category-body'>
                        <div className='input-container'>
                            <label>Category Name</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, "name") }}
                                value={this.state.name}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={this.handleSaveCategory}>
                        Save changes
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default ModalEditCategory;
