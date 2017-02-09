import { combineReducers } from 'redux';


const initialState = {}; //guid. qty, price
const items = (state, action) => {
  const { guid, qty, price, code, description, amount, groupRef } = action;
  switch(action.type) {
    case 'ADD_TO_CART':
      return { ...state, [guid]: {qty, price, code, description, amount, groupRef}};
    case 'REMOVE_FROM_CART':
      const stateCopy = { ...state };
      delete stateCopy[guid];
      return stateCopy;
    case 'UPDATE_CART':
      const stateCopyUpdateCart = { ...state };
      const newAmount = qty*state[guid].price;
      stateCopyUpdateCart[guid] = {...stateCopyUpdateCart[guid], qty, amount: newAmount};
      return stateCopyUpdateCart;
    case 'CLEAN_CART':
      return initialState;
    default:
      return state || initialState;
  }
};

const itemsFiltered = (state = {}, action) => {
  switch(action.type){
    case 'RECEIVE_CART_ITEMS_FILTETED':
      return action.payload;
    default:
      return state;
  }
}

const totalItems = (state = 0, action) => {
  switch (action.type) {
    case 'SET_TOTAL_CART_ITEMS':
      return action.payload;
    default:
      return state;
  }
};

const totalAmount = (state = 0, action) => {
  switch (action.type) {
    case 'SET_TOTAL_CART_AMOUNT':
      return action.payload;
    default:
      return state;
  }
};

const goodsGroupsIds = (state = [], action) => {
  switch (action.type) {
    case 'SET_GOODS_GROUPS_IDS_CHECKOUT':
      return action.payload;
    default:
      return state;
  }
};

const filterText = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER_TEXT_CART':
      return action.payload;
    default:
      return state;
  }
};

const filtersGoodsGroupsCartIds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_GOODS_GROUPS_FILTER_CART':
      return [ ...state, action.guid];
    case 'REMOVE_GOODS_GROUPS_FILTER_CART':
      const ind = state.indexOf(action.guid);
      return [ ...state.slice(0, ind), ...state.slice(ind + 1)];
    case 'RESET_GOODS_GROUPS_FILTERS_CART':
      return [];
    default:
      return state;
  }
};

const currentGuid = (state = '', action) => {
  switch (action.type) {
    case 'SET_CURRENT_GOODS_GUID_CHECKOUT':
      return action.payload;
    default:
      return state;
  }
};

const textFilterGoodsGroups = (state = '', action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER_GOODS_GROUPS':
      return action.payload;
    default:
      return state;
  }
};

// Selectors

export const getGoodsVisibleIdsCheckout = state => {
  const pageNumber = state.goods.pageNumberCheckout;
  const keys = Object.keys(state.cart.itemsFiltered);
  const rowsPerPage = state.goods.rowsPerPage || 10;
  return  keys.reduce((result, key, i) => {
    return i >= (pageNumber-1)*rowsPerPage && i < pageNumber*rowsPerPage ? result.concat(key) : result;
  }, []);
};

export const getGoodsItemsByCartGoodsIds = (items, ids) => {
  return ids.reduce((res, id) => {
    return { ...res, [id]: items[id] };
  }, {});
}

export const getVisibleGoodsGroups = state => {
  const { textFilterGoodsGroups } = state.cart;
  const { goodsGroupsIds } = state.cart;
  const goodsGroups = state.goodsGroups.itemsInitial;
  if (textFilterGoodsGroups === '') {
    return goodsGroupsIds;
  }
  return goodsGroupsIds.reduce((res, key) => {
    return goodsGroups[key].includes(textFilterGoodsGroups) ? res.concat(key) : res;
  }, []);
}

export default combineReducers({
  items,
  itemsFiltered,
  totalItems,
  totalAmount,
  goodsGroupsIds,
  filterText,
  filtersGoodsGroupsCartIds,
  currentGuid,
  textFilterGoodsGroups
});
