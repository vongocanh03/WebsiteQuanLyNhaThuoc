import { json } from 'body-parser';
import userService from '../services/userService';

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }

    let userData = await userService.handleUserLogin(email, password);
    //check email exist
    //password nhap vao ko dung
    //return userInfor
    // access_token :JWT json web token

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}
let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;
    if (!id) {


        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters ',
            users: []
        })
    }
    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}
let handleCreateNewUser = async (req, res) => {
    if (!req.body.password) {
        return res.status(400).json({
            errCode: 2,
            message: 'Password is required'
        });
    }

    let message = await userService.createNewUser(req.body);
    console.log(message);
    return res.status(200).json(message);
};
let handleEditUser = async (req, res) => {
    let data = req.body;
    if (!data.id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing required parameters!'
        });
    }

    let message = await userService.editUser(data);
    return res.status(200).json(message);
};
let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing required parameters!'
        });
    }

    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
};

// Sửa lại phần export
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers, // Đảm bảo đúng chính tả ở đây
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser:handleEditUser,
    handleDeleteUser:handleDeleteUser
};
