import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import logo from '../../assets/logo.png'
import { FormattedMessage } from 'react-intl'

class HomeHeader extends Component {

    render() {
        console.log('check props: ', this.props)
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <img className="header-logo" src={logo} />
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div>
                                    <b><FormattedMessage id="homeheader.speciality" /></b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.searchdoctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b><FormattedMessage id="homeheader.health-facility" /></b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.select-room" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b><FormattedMessage id="homeheader.doctor" /></b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.select-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b><FormattedMessage id="homeheader.fee" /></b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.check-health" />
                                </div>
                            </div>

                        </div>
                        <div className="right-content">
                            <div className='support'><i className='fas fa-question-circle'></i>
                                <FormattedMessage id='homeheader.support'/>
                            </div>
                            <div className='language-vi'>VN</div>
                            <div className='language-en'>EN</div>

                        </div>
                    </div>
                </div>
                <div class="home-header-banner">
                    <div class="content-up">
                        <div class="title1"><FormattedMessage id='banner.title1'/></div>
                        <div class="title2"><FormattedMessage id='banner.title2'/></div>
                        <div class="search">
                            <i class="fas fa-search"></i> <input type="text" placeholder="Tìm chuyên khoa khám bệnh" />
                        </div>
                    </div>

                    <div class="content-down">
                        <div class="options">
                            <div class="option-child">
                                <div class="icon-child"><i class="far fa-hospital"></i></div>
                                <div class="text-child"><FormattedMessage id='banner.child1'/></div>
                            </div>
                            <div class="option-child">
                                <div class="icon-child"><i class="fas fa-mobile-alt"></i></div>
                                <div class="text-child"><FormattedMessage id='banner.child2'/></div>
                            </div>
                            <div class="option-child">
                                <div class="icon-child"><i class="fas fa-procedures"></i></div>
                                <div class="text-child"><FormattedMessage id='banner.child3'/></div>
                            </div>
                            <div class="option-child">
                                <div class="icon-child"><i class="fas fa-flask"></i></div>
                                <div class="text-child"><FormattedMessage id='banner.child4'/></div>
                            </div>
                            <div class="option-child">
                                <div class="icon-child"><i class="fas fa-user-md"></i></div>
                                <div class="text-child"><FormattedMessage id='banner.child5'/></div>
                            </div>
                            <div class="option-child">
                                <div class="icon-child"><i class="fas fa-briefcase-medical"></i></div>
                                <div class="text-child"><FormattedMessage id='banner.child6'/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
