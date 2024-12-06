import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/logo.png';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router-dom';

class HomeHeader extends Component {
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

        console.log('Redux State in HomeHeader:', this.props.userInfo);

        return (
            <React.Fragment>
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
                            {/* Icon giỏ hàng */}
                            <div className="cart" onClick={() => this.props.history.push('/cart')}>
                                <i className="fas fa-shopping-cart"></i>
                                <span className="cart-count">{this.props.cartCount || 0}</span>
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
                <div className="home-header-banner">
                    <div className="content-up">
                        <div className="title1">
                            <FormattedMessage id="banner.title1" />
                        </div>
                        <div className="title2">
                            <FormattedMessage id="banner.title2" />
                        </div>
                        <div className="search">
                            <i className="fas fa-search"></i>
                            <input type="text" placeholder="Tìm chuyên khoa khám bệnh" />
                        </div>
                    </div>
                    <div className="content-down">
                        <div className="options">
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="far fa-hospital"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="banner.child1" />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-mobile-alt"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="banner.child2" />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-procedures"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="banner.child3" />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-flask"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="banner.child4" />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-user-md"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="banner.child5" />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-briefcase-medical"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="banner.child6" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
