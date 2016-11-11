export const setTotalCartItems = () => {
  return (dispatch, getState) => {
    const itemsKeys = Object.keys(getState().cart.items);
    dispatch({
      type: 'SET_TOTAL_CART_ITEMS',
      payload: itemsKeys.length
    });
  };
};

export const setTotalCartAmount = () => {
  return (dispatch, getState) => {
    const cartState = getState().cart;
    const itemsKeys = Object.keys(cartState.items);
    const items  = cartState.items;
    const totalAmount = itemsKeys.reduce((result, key) => {
      return result += items[key].price*items[key].qty;
    }, 0);
    dispatch({
      type: 'SET_TOTAL_CART_AMOUNT',
      payload: totalAmount
    });
  };
};


export const addToCart = (guid, qty, price) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'ADD_TO_CART',
      guid,
      qty,
      price
    });
    dispatch(setTotalCartItems());
    dispatch(setTotalCartAmount());
  };
};

export const removeFromCart = (guid) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      guid,
    });
    dispatch(setTotalCartItems());
    dispatch(setTotalCartAmount());
  };
};

export const cleanCart = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'CLEAN_CART',
    });
    dispatch(setTotalCartItems());
    dispatch(setTotalCartAmount());
  };
};
