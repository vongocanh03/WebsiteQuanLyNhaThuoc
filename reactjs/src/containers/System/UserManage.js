import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers } from '../../services/userService';
import './UserManage.scss'
class UserManage extends Component {

    state = {

    }

    async componentDidMount() {
        let response = await getAllUsers('ALL');
        if(response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            });
        }
        
       

    }
    hanleAddNewUser = ()=>{
        alert('click me')
    }

    render() {
        console.log('check render', this.state);
        let arrUsers = this.state.arrUsers || []; // Đảm bảo arrUsers là một mảng nếu chưa được khởi tạo
    
        return (
            <div className="users-container">
                <div className="title text-center">Manage users</div>
                <div className='mx=1'>
                    <button 
                    className='btn btn-primary px-3'
                    onClick={()=>this.hanleAddNewUser()}
                    ><i className='fas fa-plus'></i>Add new user</button>
                </div>
                <div className="users-table mt-3 mx-1">
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUsers.length > 0 ? arrUsers.map((item, index) => {
                                console.log('Checking item:', item, index);
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                          <button className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                          <button className='btn-delete'><i className="fa fa-trash"></i></button>
                                        </td>
                                    </tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan="5" className="text-center">No users found</td>
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
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
