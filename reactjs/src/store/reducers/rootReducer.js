import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from "./appReducer";
import adminReducer from "./adminReducer";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer"; // Giả sử bạn có reducer cho giỏ hàng

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

// Cấu hình cho redux-persist
const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

// Cấu hình persist riêng cho user
const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfo'] // Chỉ lưu các thuộc tính này
};

// Cấu hình persist riêng cho cart nếu cần
const cartPersistConfig = {
    ...persistCommonConfig,
    key: 'cart',
    whitelist: ['items'] // Chỉ lưu các sản phẩm trong giỏ hàng
};

export default (history) => combineReducers({
    router: connectRouter(history), // Kết nối với router
    user: persistReducer(userPersistConfig, userReducer), // User với persist
    cart: persistReducer(cartPersistConfig, cartReducer), // Cart với persist
    app: appReducer, // Reducer chung
    admin: adminReducer, // Reducer admin nếu cần
});
