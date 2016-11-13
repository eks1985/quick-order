import { combineReducers } from 'redux';


const initialState = {}; //guid. qty, price
const items = (state, action) => {
  const { guid, qty, price, code, description, amount } = action;
  switch(action.type) {
    case 'ADD_TO_CART':
      return { ...state, [guid]: {qty, price, code, description, amount}};
    case 'REMOVE_FROM_CART':
      const stateCopy = { ...state };
      delete stateCopy[guid];
      return stateCopy;
    case 'CLEAN_CART':
      return initialState;
    default:
      return state || initialState;
  }
};

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

export default combineReducers({
  items,
  totalItems,
  totalAmount
});
