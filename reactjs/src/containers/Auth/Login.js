import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
// import { userService } from '../../services/userService';
import { handleLoginApi } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showPassword: false,
            errMessage: ''
        }
    }

    handleOnChangeUserName = (e) => {
        this.setState({
            username: e.target.value
        })

    }

    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })


    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        });
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            console.log('aa:', data); // Kiểm tra dữ liệu trả về

            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                });
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
                console.log('User info:', data.user);

                // Kiểm tra roleId và điều hướng
                const { roleId } = data.user;
                if (parseInt(roleId) === 3) {
                    this.props.navigate('/home');
                } else if (parseInt(roleId) === 2 || parseInt(roleId) === 1) {
                    this.props.navigate('/system/user-manage');
                } else {
                    this.setState({
                        errMessage: 'Không xác định được quyền truy cập!'
                    });
                }

            }
        } catch (e) {
            if (e.response && e.response.data) {
                this.setState({
                    errMessage: e.response.data.message
                });
            }
            console.log('error message', e.response);
        }
    };



    handleShowHidePassword = () => {

        this.setState({
            showPassword: !this.state.showPassword
        })
        console.log(this.state.showPassword);
    }
    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleLogin();
        }
    }

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-center login-title">Login</div>
                        <div className="col-12 form-group">
                            <label>Username: </label>
                            <input
                                type="text"
                                className="form-control login-input"
                                placeholder="Enter your user name"
                                value={this.state.username}
                                onChange={(e) => this.handleOnChangeUserName(e)}
                                onKeyDown={this.handleKeyPress} // Thêm sự kiện onKeyDown
                            />
                        </div>
                        <div className="col-12 form-group">
                            <label>Password: </label>
                            <div className="login-password">
                                <input
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    className="form-control login-input"
                                    placeholder="Enter your password"
                                    value={this.state.password}
                                    onChange={(e) => this.handleOnChangePassword(e)}
                                    onKeyDown={this.handleKeyPress} // Thêm sự kiện onKeyDown
                                />
                                <span onClick={() => this.handleShowHidePassword()}>
                                    <i className={this.state.showPassword ? 'fas fa-eye show-password' : 'fas fa-eye-slash show-password'} ></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                            <button
                                className="btn-login"
                                onClick={() => this.handleLogin()}
                            >Login</button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-password">Forgot your password?</span>
                        </div>
                        <div className="col-12 text-center login-with mt-3">
                            <span className="">Or login with:</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-facebook social-icon fb"></i>
                            <i className="fab fa-google-plus social-icon gg"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };


};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
