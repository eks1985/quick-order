import { combineReducers } from 'redux';
import { ordersInitialState } from './../../utils/init';

const ordersIntiialStateGenerated = ordersInitialState();

const initialStateHeaders = ordersIntiialStateGenerated.ordersHeads;

const headers = (state, action) => {
  switch (action.type) {
    case 'RECEIVE_ORDERS_HEADERS':
      return { ...state, ...action.payload }
    //TODO implement this action
    case 'CHECKOUT':
      const itemKeys = Object.keys(action.cartItems);
      const amount = itemKeys.reduce((result, key) => result += action.cartItems[key].qty * action.cartItems[key].price, 0);
      return { ...state, [action.header.guid]: { nr: action.header.guid, enterpriseNr:action.header.guid.substring(0, 10), date: action.header.date, amount} };
    default:
      return state || initialStateHeaders;
  }
};

const initialStateItems = ordersIntiialStateGenerated.ordersItems;
const items = (state, action) => {
  switch (action.type) {
    case 'CHECKOUT':
      const guid = action.header.guid;
      const items = action.cartItems;
      return { ...state, [guid]: items}
    default:
      return state || initialStateItems;
  }
};

const pageNumber = (state = 0, action) => {
  switch (action.type) {
    case 'SET_PAGE_NUMBER_ORDERS':
      return action.pageNumber;
    default:
     return state;
  }
}

const qtyPages = (state = 0, action) => {
  switch (action.type) {
    case 'SET_QTY_PAGES_ORDERS':
      return action.qtyPages;
    default:
     return state;
  }
}

const isLastPage = (state = false, action) => {
  switch (action.type) {
    case 'SET_IS_LAST_PAGE_ORDERS':
      return action.qtyPages;
    default:
     return state;
  }
}

// Selectors

export const getOrdersVisibleIds = (state) => { //state = orders.state
  const pageNumber = state.pageNumber;
  const keys = Object.keys(state.items);
  return  keys.reduce((result, key, i) => {
    return i >= (pageNumber-1)*10 && i < pageNumber*10 ? result.concat(key) : result;
  }, []);
}

export default combineReducers(
  {
    headers,
    items,
    pageNumber,
    qtyPages,
    isLastPage
  }
);
