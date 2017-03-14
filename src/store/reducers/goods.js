import { combineReducers } from 'redux';

// ui

const searchText = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH_TEXT':
      return action.payload;
    default:
      return state;
  }
};

const currentGuid = (state = '', action) => {
  switch (action.type) {
    case 'SET_CURRENT_GOODS_GUID':
      return action.payload;
    default:
      return state;
  }
};

const currentGuidCheckout = (state = '', action) => {
  switch (action.type) {
    case 'SET_CURRENT_GOODS_CHECKOUT_GUID':
      return action.payload;
    default:
      return state;
  }
};

// data

const itemsInitial = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_GOODS':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const items = (state = {}, action) => { //production
  switch (action.type) {
    case 'RECEIVE_GOODS':
      return { ...state, ...action.payload };
    case 'SET_GOODS_LIST':
      return action.payload;
    default:
      return state;
  }
};

// pagination

const pageNumber = (state = 1, action) => {
  switch (action.type) {
    case 'INCREASE_PAGE_NUMBER_GOODS':
      return state +=1;
    case 'DECREASE_PAGE_NUMBER_GOODS':
        return state -=1;
    case 'SET_PAGE_NUMBER_GOODS':
        return action.pageNumber;
    default:
     return state;
  }
};

const pageNumberCheckout = (state = 1, action) => {
  switch (action.type) {
    case 'INCREASE_PAGE_NUMBER_GOODS_CHECKOUT':
      return state +=1;
    case 'DECREASE_PAGE_NUMBER_GOODS_CHECKOUT':
        return state -=1;
    case 'SET_PAGE_NUMBER_GOODS_CHECKOUT':
        return action.pageNumber;
    default:
     return state;
  }
};

const qtyPages = (state = 0, action) => {
  switch (action.type) {
    case 'SET_QTY_PAGES_GOODS':
      return action.qtyPages;
    default:
     return state;
  }
};

const qtyPagesCheckout = (state = 0, action) => {
  switch (action.type) {
    case 'SET_QTY_PAGES_GOODS_CHECKOUT':
      return action.qtyPages;
    default:
     return state;
  }
};

const isLastPage = (state = false, action) => {
  switch (action.type) {
    case 'SET_IS_LAST_PAGE_GOODS':
      return action.payload;
    default:
     return state;
  }
};

const isLastPageCheckout = (state = false, action) => {
  switch (action.type) {
    case 'SET_IS_LAST_PAGE_GOODS_CHECKOUT':
      return action.payload;
    default:
     return state;
  }
};

const rowsPerPage = (state = 10, action) => {
  switch (action.type) {
    case 'SET_GOODS_ROWS_PER_PAGE':
      return action.payload;
    default:
      return state;
  }
}

// Selectors

export const getGoodsVisibleIds = (state) => { //state = goods.state
  const pageNumber = state.pageNumber;
  const keys = Object.keys(state.items);
  const rowsPerPage = state.rowsPerPage || 10;
  return  keys.reduce((result, key, i) => {
    return i >= (pageNumber-1)*rowsPerPage && i < pageNumber*rowsPerPage ? result.concat(key) : result;
  }, []);
};

export const getPropsValListByIds = (items, ids, propName) => {
  return ids.reduce((res, key) => {
    return items[key][propName] ? res.concat(items[key][propName]) : res;
  }, [])
}

export default combineReducers({
  currentGuid,
  currentGuidCheckout,
  itemsInitial,
  items,
  pageNumber,
  pageNumberCheckout,
  qtyPages,
  qtyPagesCheckout,
  isLastPage,
  isLastPageCheckout,
  rowsPerPage,
  searchText
});
