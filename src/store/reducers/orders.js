import { combineReducers } from 'redux';

const headers = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_ORDERS_HEADERS':
      return { ...state, ...action.payload };
    case 'RESET_ORDERS_HEADERS':
      return {};
    case 'CHECKOUT':
      const { nr, date, amount, enterpriseNr } = action.header;
      return { ...state, [nr]: { nr, enterpriseNr, date, amount} };
    default:
      return state;
  }
};

const items = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_ORDERS_ITEMS':
      return { ...state, ...action.payload };
    case 'RESET_ORDERS_ITEMS':
      return {};
    case 'CHECKOUT':
      const nr = action.header.nr;
      return { ...state, [nr]: action.cartItems};
    default:
      return state;
  }
};

const pageNumber = (state = 1, action) => {
  switch (action.type) {
    case 'INCREASE_PAGE_NUMBER_ORDERS':
      return state +=1;
    case 'DECREASE_PAGE_NUMBER_ORDERS':
        return state -=1;
    case 'SET_PAGE_NUMBER_ORDERS':
        return action.pageNumber;
    default:
     return state;
  }
};

const qtyPages = (state = 0, action) => {
  switch (action.type) {
    case 'SET_QTY_PAGES_ORDERS':
      return action.qtyPages;
    case 'RESET_QTY_PAGES_ORDERS':
      return 0;
    default:
     return state;
  }
};

const isLastPage = (state = false, action) => {
  switch (action.type) {
    case 'SET_IS_LAST_PAGE_ORDERS':
      return action.payload;
    default:
     return state;
  }
};

// Selectors

export const getOrdersVisibleIds = state => { //state = orders.state
  const pageNumber = state.pageNumber;
  const keys = Object.keys(state.headers).reverse();
  const keysNotDeleted = keys.reduce((res, key) => state.headers[key].deleted ? res : res.concat(key) , []);
  return  keysNotDeleted.reduce((result, key, i) => {
    return i >= (pageNumber-1)*3 && i < pageNumber*3 ? result.concat(key) : result;
  }, []);
};

export default combineReducers(
  {
    headers,
    items,
    pageNumber,
    qtyPages,
    isLastPage
  }
);
