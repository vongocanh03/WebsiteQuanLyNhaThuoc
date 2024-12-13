export const loadCartItems = (cartItems) => {
    return {
        type: 'LOAD_CART_ITEMS',
        payload: cartItems
    };
};

export const clearCart = () => {
    return {
        type: 'CLEAR_CART'
    };
};
