import { isNumeric } from './../utils/index';

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
    const goodsItems = getState().goods.items;
    const { code, description } = goodsItems[guid];
    dispatch({
      type: 'ADD_TO_CART',
      guid,
      qty,
      price,
      code,
      description,
      amount: qty*price
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

export const updateCart = (guid, qty) => {
  return (dispatch, getState) => {
    dispatch({ //this will be handled by cart.items reducer
      type: 'UPDATE_CART',
      guid,
      qty
    });
    dispatch(setTotalCartItems());
    dispatch(setTotalCartAmount());
  };
};

const detectGuid = (codes, row) => {
  const words = row.trim().split(' ');
  if (words.length > 0) {
    let first = words[0];
    return codes[first] ? codes[first][0] : '';
  } else {
    return '';
  }
};

const detectQty = (row) => {
  const words = row.trim().split(' ');
  if (words.length > 0) {
    let last = words[words.length - 1];
    return isNumeric(last) ? parseFloat(last) : 0;
  } else {
    return 0;
  }
};

export const parseQuickOrder = (text) => {
  return (dispatch, getState) => {
    const codes = getState().goods.codes;
    const rows = text.split("\n");
    const listItems = rows.reduce((res, row) => {
      res[row] = {'guid': detectGuid(codes, row), 'qty': detectQty(row)};
      return res;
    }, {});
    // console.log(listItems);
    dispatch({
      type: 'RECEIVE_QUICK_LIST_ITEMS',
      payload: listItems
    });
  };
};
