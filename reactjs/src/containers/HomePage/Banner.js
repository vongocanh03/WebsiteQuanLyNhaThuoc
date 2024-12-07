// Banner.js
import React from 'react';
import { FormattedMessage } from 'react-intl';
import './HomeHeader.scss';

class Banner extends React.Component {
    render() {
        return (
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
        );
    }
}

export default Banner;
