// import initialState from './initialData/goods-groups';
const initialState = {};

import { combineReducers } from 'redux';

const items = (state, action) => {
  switch (action.type) {
    case 'RECEIVE_GOODS_GROUPS':
      return { ...state, ...action.payload };
    case 'FILTER_GOODS_GROUPS':
      return action.payload;
    default:
      return state || initialState;
  }
};

const itemsInitial = (state, action) => {
  switch (action.type) {
    case 'RECEIVE_GOODS_GROUPS':
      return { ...state, ...action.payload };
    default:
      return state || initialState;
  }
};

const filtersIds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_GOODS_GROUPS_FILTER':
      return [ ...state, action.guid];
    case 'REMOVE_GOODS_GROUPS_FILTER':
      const ind = state.indexOf(action.guid);
      return [ ...state.slice(0, ind), ...state.slice(ind + 1)];
    case 'RESET_GOODS_GROUPS_FILTERS':
      return [];
    default:
      return state;
  }
};

export default combineReducers({
  items,
  itemsInitial,
  filtersIds
});


// Selectors

export const getGoodsGroupsByIds = (items, ids) => {
  return ids.reduce((res, key) => ({ ...res, [key]: items[key] }), {});
};
