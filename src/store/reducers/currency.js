import { combineReducers } from 'redux';

const initialStateItems = {
  "978": "EUR",
  "840": "USD",
  "810": "RUB"
};

const items = (state, action) => {
  switch (action.type) {
      case 'RECEIVE_CURRENCY_LIST':
        return { ...state, ...action.payload }
      default:
        return state || initialStateItems;
  }
};

const initialStateCurrentItem = "810";

const currentItem = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_ITEM_CURRENCY':
      return action.payload;
    default:
      return state || initialStateCurrentItem;
  }
}

export default combineReducers({
  items, currentItem
});
