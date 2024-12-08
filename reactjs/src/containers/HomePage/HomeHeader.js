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

    render() {
        let { language, userInfo, processLogout, isLoggedIn } = this.props;

        return (
            <div className="home-header-container">
                <div className="home-header-content">
                    <div className="left-content">
                        <i className="fas fa-bars"></i>
                        <img className="header-logo" src={logo} alt="Logo" />
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
                            <div>
                                <b>
                                    <FormattedMessage id="homeheader.health-facility" />
                                </b>
                            </div>
                            <div className="subs-title">
                                <FormattedMessage id="homeheader.select-room" />
                            </div>
                        </div>
                        <div className="support">
                            <i className="fas fa-question-circle"></i>
                            <FormattedMessage id="homeheader.support" />
                        </div>
                        <div>
                            <Link to="/cart">
                                <i className="fas fa-shopping-cart"></i> Giỏ hàng
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
                            <div className="btn btn-logout" onClick={processLogout}>
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
});

const mapDispatchToProps = (dispatch) => ({
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
