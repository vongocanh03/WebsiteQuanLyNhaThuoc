import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllCategories, createNewCategoryService, deleteCategoryService, updateCategoryService  } from '../../services/categoryService';
import './CategoryManage.scss';
import ModalCategory from './ModalCategory';
import { emitter } from '../../utils/emitter';
import ModalEditCategory from './ModalEditCategory';

class CategoryManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrCategories: [],
            isOpenModalCategory: false,
            isOpenModalEditCategory: false,
            categoryEdit: {}
        };
    }

    async componentDidMount() {
        await this.getAllCategoriesFromReact(); 
    }

    getAllCategoriesFromReact = async () => {
        try {
            let response = await getAllCategories();
            console.log('API Response:', response); // Kiểm tra phản hồi API trong console
    
            // Đảm bảo response chứa categories
            if (response && response.categories) {
                this.setState({
                    arrCategories: response.categories,
                });
            } else {
                console.error('Failed to fetch categories: Invalid response format');
            }
        } catch (error) {
            console.error('Error fetching categories:', error); // Log lỗi nếu xảy ra vấn đề
        }
    };
    
    

    handleAddNewCategory = () => {
        this.setState({
            isOpenModalCategory: true
        });
    }

    toggleCategoryModal = () => {
        this.setState({
            isOpenModalCategory: !this.state.isOpenModalCategory
        });
    }

    toggleCategoryEditModal = () => {
        this.setState({
            isOpenModalEditCategory: !this.state.isOpenModalEditCategory
        });
    }

    createNewCategory = async (data) => {
        try {
            let response = await createNewCategoryService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                // Sau khi thêm thể loại thành công, gọi lại hàm để lấy tất cả thể loại
                await this.getAllCategoriesFromReact();
                this.setState({
                    isOpenModalCategory: false
                });
                emitter.emit('EVENT_CLEAR_MODAL_DATA'); // Để làm sạch dữ liệu trong modal
            }
        } catch (e) {
            console.log(e);
        }
    }
    

    handleDeleteCategory = async (category) => {
        try {
            let res = await deleteCategoryService(category.id);
            if (res && res.errCode === 0) {
                await this.getAllCategoriesFromReact();
            } else {
                alert(res.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleEditCategory = (category) => {
        this.setState({
            isOpenModalEditCategory: true,
            categoryEdit: category
        });
    }

    doEditCategory = async (category) => {
        try {
            let res = await updateCategoryService (category);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditCategory: false
                });
                await this.getAllCategoriesFromReact();
            } else {
                alert(res.errCode);
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let arrCategories = this.state.arrCategories || []; // Đảm bảo arrCategories là một mảng nếu chưa được khởi tạo
        console.log('Render categories:', arrCategories); // Kiểm tra dữ liệu trong render

        return (
            <div className="categories-container">
                <ModalCategory
                    isOpen={this.state.isOpenModalCategory}
                    toggleFromParent={this.toggleCategoryModal}
                    createNewCategory={this.createNewCategory}
                />

                {this.state.isOpenModalEditCategory &&
                    <ModalEditCategory
                        isOpen={this.state.isOpenModalEditCategory}
                        toggleFromParent={this.toggleCategoryEditModal}
                        currentCategory={this.state.categoryEdit}
                        editCategory={this.doEditCategory}
                    />
                }

                <div className="title text-center">Manage Categories</div>
                <div className='mx-1'>
                    <button 
                        className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewCategory()}
                    >
                        <i className='fas fa-plus'></i> Add new category
                    </button>
                </div>

                <div className="categories-table mt-3 mx-1">
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Category Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrCategories.length > 0 ? arrCategories.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>
                                            <button 
                                                className='btn-edit' 
                                                onClick={() => this.handleEditCategory(item)}
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button 
                                                className='btn-delete' 
                                                onClick={() => this.handleDeleteCategory(item)}
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan="2" className="text-center">No categories found</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryManage);
