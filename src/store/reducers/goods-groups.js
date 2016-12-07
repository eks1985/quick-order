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

export default combineReducers({
  items,
  itemsInitial
});

