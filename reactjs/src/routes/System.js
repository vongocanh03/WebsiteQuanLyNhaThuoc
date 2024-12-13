import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import ProductManage from '../containers/System/ProductManage';
import CategoryManage from '../containers/System/CategoryManage';
import Header from '../containers/Header/Header';
import AdminSupportPage from '../containers/System/AdminSupportPage';


class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <React.Fragment>
               <Header/>
            <div className="system-container">
                <div className="system-list">
                    <Switch>
=                        <Route path="/system/user-manage" component={UserManage} />
                        <Route path="/system/product-manage" component={ProductManage} />
                        <Route path="/system/category-manage" component={CategoryManage} />
                        <Route path="/system/support-manage" component={AdminSupportPage} />
                        <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        
                    </Switch>
                </div>
            </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
