import { combineReducers } from 'redux';

import initialState from './initialData/goods';

// Utils

const filterByGroupGuid = (groupGuid, items) => {
  console.log("items", items);
  const keys = Object.keys(items);
  return keys.reduce( (result, key) => {
    if (items[key].group_guid === groupGuid) {
      result[key] = { ...items[key] };
      return result;
    } else {
      return result;
    }
  }, {});
};

//

const itemsInitial = (state, action) => {
  switch (action.type) {
    default:
    return initialState;
  }
}

const items = (state, action) => {
  switch (action.type) {
    case 'SET_GOODS_LIST':
      // action.itemsInitial
      // action.filterData
      // return { ...state, ...action.payload }
      if (action.filterData.filterType === 'goodsGroup') {
        return filterByGroupGuid(action.filterData.groupGuid, action.filterData.itemsInitial);
      }
      return state;
    default:
      return state || initialState;
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
}

const qtyPages = (state = 0, action) => {
  switch (action.type) {
    case 'SET_QTY_PAGES_GOODS':
      return action.qtyPages;
    default:
     return state;
  }
}

const isLastPage = (state = false, action) => {
  switch (action.type) {
    case 'SET_IS_LAST_PAGE_GOODS':
      return action.payload;
    default:
     return state;
  }
}

// Selectors

export const getGoodsVisibleIds = (state) => { //state = goods.state
  const pageNumber = state.pageNumber;
  const keys = Object.keys(state.items);
  return  keys.reduce((result, key, i) => {
    return i >= (pageNumber-1)*10 && i < pageNumber*10 ? result.concat(key) : result;
  }, []);
}

export default combineReducers({
  itemsInitial,
  items,
  pageNumber,
  qtyPages,
  isLastPage
});
