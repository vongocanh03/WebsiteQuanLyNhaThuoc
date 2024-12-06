// src/layouts/MainLayout.js
import React from 'react';
import HomeHeader from '../HomePage/HomeHeader';

const MainLayout = ({ children }) => {
    return (
        <div>
            <HomeHeader />  {/* Chỉ hiển thị HomeHeader 1 lần */}
            <div className="main-content">
                {children}  {/* Các trang con sẽ được hiển thị tại đây */}
            </div>
        </div>
    );
};

export default MainLayout;
