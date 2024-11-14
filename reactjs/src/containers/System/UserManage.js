import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers,createNewUserService,deleteUserService,editUserService } from '../../services/userService';
import './UserManage.scss'
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUesr: false,
            isOpenModelEditUser: false,
            userEdit:{}


        } 
    }

    async componentDidMount() {
        await this.getAllUserFromReact(); 
        
       

    }
    getAllUserFromReact = async()=>{
        let response = await getAllUsers('ALL');
        if(response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }
    hanleAddNewUser = ()=>{
        this.setState({
            isOpenModalUesr: true,

        })
    }
    toggleUserModal = ()=>{
        this.setState({
            isOpenModalUesr: !this.state.isOpenModalUesr,
        })
    }
    toggleUserEditModal =()=>{
        this.setState({
            isOpenModelEditUser: !this.state.isOpenModelEditUser,
        })
    }
    createNewuser = async (data)=>{
        try{
           let response = await createNewUserService(data);
            if(response && response.errCode !==0){
                alert(response.errMessage)
            }else{
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUesr: false
                })

                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        }catch(e){
            console.log(e)
        }

    }
    handleDeleteUser = async (user)=>{
        console.log(' click delete', user)
        try{
            let res = await deleteUserService(user.id);
            if(res && res.errCode ===0){
                await this.getAllUserFromReact();
            }
            else{
                alert(res.errMessage)
            }
        }catch(e){
            console.log(e);
        }
    }
    handleEditUser = (user) =>{
         console.log(' check edit ', user);
         this.setState({
            isOpenModelEditUser: true,
            userEdit: user 
         })
    }

    doEditUser = async (user)=>{
        try{
        let res = await editUserService(user);
        if(res && res.errCode ===0){
            this.setState({
                isOpenModelEditUser:false
            })
            await this.getAllUserFromReact()
        }else{
            alert(res.errCode)
        }
    }catch(e)
        {
            console.log(e)
        }

    }
    render() {
        console.log('check render', this.state);
        let arrUsers = this.state.arrUsers || []; // Đảm bảo arrUsers là một mảng nếu chưa được khởi tạo
    
        return (
            <div className="users-container">
                <ModalUser
                isOpen = {this.state.isOpenModalUesr}
                toggleFromParent = {this.toggleUserModal}
                createNewuser = {this.createNewuser}
                />
                
               {
                this.state.isOpenModelEditUser &&
                <ModalEditUser
                 isOpen = {this.state.isOpenModelEditUser}
                 toggleFromParent = {this.toggleUserEditModal}
                 currenUser = {this.state.userEdit}
                 editUser={this.doEditUser}
                //  createNewuser = {this.createNewuser}
                />
                }
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
                                          <button className='btn-edit'onClick={()=>this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                          <button className='btn-delete' onClick={()=> this.handleDeleteUser(item)} ><i className="fa fa-trash"></i></button>
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
