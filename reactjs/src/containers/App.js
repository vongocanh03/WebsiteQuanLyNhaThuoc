import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux';
import { ToastContainer } from 'react-toastify';
import HomePage from './HomePage/HomePage';
import CustomScrollbars from '../components/CustomScrollbars';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils';
import Home from '../routes/Home';
import Login from './Auth/Login';
import Header from './Header/Header';
import System from '../routes/System';
import { CustomToastCloseButton } from '../components/CustomToast';
import ProductList from './HomePage/ProductList';
import ProductDetail from './HomePage/ProductDetail';
import MainLayout from './Layout/MainLayout';
import CartPage from './HomePage/CartPage';
import HomeHeader from './HomePage/HomeHeader';
import AddressForm from './HomePage/Addressform';
import SupportPage from './HomePage/SupportPage';
class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <span className="content-container">
                            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                {/* HomeHeader chỉ được hiển thị trong MainLayout */}

                                <Switch>
                                    <Route path={path.HOME} exact component={Home} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <MainLayout>
                                        <Route exact path="/" component={ProductList} />
                                        <Route path="/product/:id" component={ProductDetail} />
                                        <Route path="/cart" component={CartPage} />
                                        <Route path="/address-form" component={AddressForm} />
                                        <Route path="/support" component={SupportPage } />
                                    </MainLayout>
                                    
                                </Switch>

                            </CustomScrollbars>
                        </span>

                        {/* Thông báo Toast */}
                        <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        />
                    </div>
                </Router>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
