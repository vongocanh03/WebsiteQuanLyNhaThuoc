// Header.js
import React from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/logo.png';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';
import { withRouter, Link } from 'react-router-dom';
import * as actions from '../../store/actions';

class Header extends React.Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };

    handleLogin = () => {
        if (this.props.history) {
            this.props.history.push('/login');
        }
    };
    handleLogout = () => {
        // Lưu giỏ hàng vào localStorage trước khi xóa userId
        const { userInfo, cartItems } = this.props; // Giả sử bạn lưu danh sách sản phẩm trong giỏ hàng vào Redux
        if (cartItems && cartItems.length > 0) {
            localStorage.setItem(`cart_${userInfo.id}`, JSON.stringify(cartItems));
        }

        // Xóa userId khỏi localStorage
        localStorage.removeItem('userId');

        // Thực hiện hành động logout
        this.props.processLogout();
    };

    render() {
        let { language, userInfo, isLoggedIn } = this.props;

        return (
            <div className="home-header-container">
                <div className="home-header-content">
                    <div className="left-content">
                        <i className="fas fa-bars"></i>
                        <img className="header-logo" src={logo} alt="Logo" href="#" />
                    </div>
                    <div className="center-content">
                        <div className="child-content">
                            <div>
                                <b>
                                    <FormattedMessage id="homeheader.speciality" />
                                </b>
                            </div>
                            <div className="subs-title">
                                <FormattedMessage id="homeheader.searchdoctor" />
                            </div>
                        </div>
                        <div className="child-content">
                            <Link to="/symptom">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.health-facility" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.select-room" />
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Link to="/support">
                                <i className="fas fa-question-circle"></i>
                                <FormattedMessage id="homeheader.support" />
                            </Link>
                        </div>
                        <div>
                            <Link to="/cart">
                                <i className="fas fa-shopping-cart"></i>
                                <FormattedMessage id="homeheader.cart" />
                            </Link>
                        </div>
                    </div>
                    <div className="right-content">
                        <div className="welcome-message">
                            <FormattedMessage id="homeheader.welcome" />
                            {userInfo && userInfo.email ? userInfo.email : ''}!
                        </div>
                        <div
                            className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}
                            onClick={() => this.changeLanguage(LANGUAGES.VI)}
                        >
                            VN
                        </div>
                        <div
                            className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}
                            onClick={() => this.changeLanguage(LANGUAGES.EN)}
                        >
                            EN
                        </div>
                        {isLoggedIn ? (
                            <div className="btn btn-logout" onClick={this.handleLogout}>
                                <i className="fas fa-sign-out-alt"></i>
                                <FormattedMessage id="homeheader.logout" />
                            </div>

                        ) : (
                            <div className="btn btn-login" onClick={this.handleLogin}>
                                <i className="fas fa-sign-in-alt"></i>
                                <FormattedMessage id="homeheader.login" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    cartItems: state.cart.cartItems // Lấy danh sách sản phẩm từ Redux

});

const mapDispatchToProps = (dispatch) => ({
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
