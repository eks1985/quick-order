import { combineReducers } from 'redux';

import initialState from './initialData/goods';

const items = (state, action) => {
  switch (action.type) {
    case 'RECEIVE_GOODS_LIST':
      return { ...state, ...action.payload }
    default:
      return state || initialState;
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
    case 'SET_QTY_PAGES_ORDERS':
      return action.qtyPages;
    default:
     return state;
  }
}

// Selectors

export const getGoodsVisible = (state) => {
  // TODO return goods list correspond to pagination
  return state.items;
}

export default combineReducers({
  items,
  pageNumber,
  qtyPages,
  isLastPage
});
