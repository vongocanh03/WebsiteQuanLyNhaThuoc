import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions"; // Import actions
import './Login.scss';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showPassword: false,
            errMessage: ''
        };
    }

    handleOnChangeUserName = (e) => {
        this.setState({
            username: e.target.value
        });
    }

    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        });
    
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
    
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                });
            }
    
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
                const { roleId, id: userId } = data.user;
    
                // Lưu userId vào localStorage và Redux
                localStorage.setItem('userId', userId);
                this.props.setUserId(userId);
    
                // Lấy giỏ hàng đã lưu trong localStorage
                const savedCart = localStorage.getItem(`cart_${userId}`);
                if (savedCart) {
                    this.props.loadCartItems(JSON.parse(savedCart)); // Gọi action để load lại giỏ hàng
                }
    
                // Điều hướng dựa trên roleId
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
            console.error('Error message:', e.response || e);
        }
    };
    
    handleShowHidePassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        });
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
                                onKeyDown={this.handleKeyPress}
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
                                    onKeyDown={this.handleKeyPress}
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
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        setUserId: (userId) => dispatch(actions.setUserId(userId)) // Action mới để lưu userId
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
