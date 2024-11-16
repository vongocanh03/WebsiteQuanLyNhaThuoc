import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'

class HomeHeader extends Component {

    render() {

        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <div className="header-logo"></div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div><b>Chuyên khoa</b></div>
                                <div className="subs-title">Tìm bác sĩ theo chuyên khoa</div>
                            </div>
                            <div className="child-content">
                                <div><b>Cơ sở y tế</b></div>
                                <div className="subs-title">Chọn bệnh viện phòng khám</div>
                            </div>
                            <div className="child-content">
                                <div><b>Bác sĩ</b></div>
                                <div className="subs-title">Chọn bác sĩ giỏi</div>
                            </div>
                            <div className="child-content">
                                <div><b>Gói khám</b></div>
                                <div className="subs-title">Khám sức khỏe tổng quát</div>
                            </div>

                        </div>
                        <div className="right-content">
                            <div className='support'><i className='fas fa-question-cỉrcle'>Hỗ trợ</i></div>
                            <div className='flag'>VN</div>
                        </div>
                    </div>
                </div>
                <div class="home-header-banner">
                    <div class="content-up">
                        <div class="title1">NỀN TẢNG Y TẾ</div>
                        <div class="title2">CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                        <div class="search">
                            <i class="fas fa-search"></i> <input type="text" placeholder="Tìm chuyên khoa khám bệnh" />
                        </div>
                    </div>

                    <div class="content-down">
                        <div class="options">
                            <div class="option-child">
                                <div class="icon-child"><i class="far fa-hospital"></i></div> 
                                <div class="text-child">Khám chuyên khoa</div>
                            </div>
                            <div class="option-child">
                                <div class="icon-child"><i class="fas fa-mobile-alt"></i></div> 
                                <div class="text-child">Khám từ xa</div>
                            </div>
                            <div class="option-child">
                                <div class="icon-child"><i class="fas fa-prosedures"></i></div> 
                                <div class="text-child">Khám tổng quát</div>
                            </div>
                            <div class="option-child">
                                <div class="icon-child"><i class="fas fa-microscope"></i></div> 
                                <div class="text-child">Xét nghiệm y học</div>
                            </div>
                            <div class="option-child">
                                <div class="icon-child"><i class="fas fa-tooth"></i></div> 
                                <div class="text-child">Khám trực tiếp</div>
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
