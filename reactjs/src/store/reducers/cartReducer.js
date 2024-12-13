const initialState = {
    cartItems: []
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_CART_ITEMS':
            return {
                ...state,
                cartItems: action.payload
            };
        case 'CLEAR_CART':
            return {
                ...state,
                cartItems: []
            };
        default:
            return state;
    }
};

export default cartReducer;
