import { languages } from '../../utils';
import actionTypes from '../actions/actionTypes';

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: "",
    handleFunc: null,
    dataFunc: null
};

const initialState = {
    started: true,
    userId: null,  // Lưu trữ userId
    language: 'vi',
    systemMenuPath: '/system/user-manage',
    contentOfConfirmModal: {
        ...initContentOfConfirmModal
    }
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.APP_START_UP_COMPLETE:
            return {
                ...state,
                started: true,
                userId: action.payload, // Cập nhật userId

            };
        case actionTypes.SET_CONTENT_OF_CONFIRM_MODAL:
            return {
                ...state,
                contentOfConfirmModal: {
                    ...state.contentOfConfirmModal,
                    ...action.contentOfConfirmModal
                }
            };
        case actionTypes.CHANGE_LANGUAGE:
            console.log('vna check redux:', action);
            return {
                ...state,
                language: action.language,
            };
        case actionTypes.SET_USER_ID:
            return {
                ...state,
                userId: action.userId,  // Lưu userId vào state
            };
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                userId: null,  // Xóa userId khi logout
                isLoggedIn: false,  // Cập nhật trạng thái đăng nhập
                userInfo: null,  // Xóa thông tin người dùng
            };
        default:
            return state;
    }
};

export default appReducer;
