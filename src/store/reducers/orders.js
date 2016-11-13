import { combineReducers } from 'redux';
import { ordersInitialState } from './../../utils/init';

const ordersIntiialStateGenerated = ordersInitialState();

const initialStateHeaders = ordersIntiialStateGenerated.ordersHeads;

const headers = (state, action) => {
  switch (action.type) {
    case 'RECEIVE_ORDERS_HEADERS':
      return { ...state, ...action.payload }
    case 'CHECKOUT':
      return state;
    default:
      return state || initialStateHeaders;
  }
};

const initialStateItems = ordersIntiialStateGenerated.ordersItems;
const items = (state, action) => {
  switch (action.type) {
    case 'CHECKOUT':
      return state;
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

export default combineReducers(
  {
    headers,
    items,
    pageNumber,
    qtyPages,
    isLastPage
  }
);
