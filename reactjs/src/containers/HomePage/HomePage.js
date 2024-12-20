import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import ProductList from './ProductList';
import Banner from './Banner';
import Foodter from './Foodter';
import Introduce from './Introduce';
class HomePage extends Component {

    render() {

        return (
            <div>
             <HomeHeader/>   
             <Banner/>
             <ProductList/> 
             <Introduce/>
             <Foodter/>
            </div>  
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
