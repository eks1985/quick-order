import { combineReducers } from 'redux';

const searchText = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH_TEXT':
      return action.payload;
    default:
      return state;
  }
};

const codes = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_CODES':
      return action.payload;
    default:
      return state;
  }
};

const descriptions = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_DESCRIPTIONS':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const codeOrderIndex  = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_GOODS_ORDER_INDEX_CODES':
      return action.payload;
    default:
      return state;
  }
};

const codeOrderIndexReverse  = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_GOODS_ORDER_INDEX_CODES_REVERSE':
      return action.payload;
    default:
      return state;
  }
};

const descriptionOrderIndex  = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_GOODS_ORDER_INDEX_DESCRIPTIONS':
      return action.payload;
    default:
      return state;
  }
};

const descriptionOrderIndexReverse  = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_GOODS_ORDER_INDEX_DESCRIPTIONS_REVERSE':
      return action.payload;
    default:
      return state;
  }
};


const itemsInitial = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_GOODS':
      return { ...state, ...action.payload };
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

// sort

const sortDirection = (state = '', action) => {
  switch (action.type) {
    case 'SET_SORT_DIRECTION_FORWARD':
      return 'forward';
    case 'SET_SORT_DIRECTION_REVERSE':;
      return 'reverse';
    default:
      return state;
  }
};

const sortDirectionCheckout = (state = '', action) => {
  switch (action.type) {
    case 'SET_SORT_DIRECTION_FORWARD':
      return 'forward';
    case 'SET_SORT_DIRECTION_REVERSE':;
      return 'reverse';
    default:
      return state;
  }
};

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
  codes,
  descriptions,
  searchText,
  codeOrderIndex,
  codeOrderIndexReverse,
  descriptionOrderIndex,
  descriptionOrderIndexReverse,
  sortDirection,
  sortDirectionCheckout
});
