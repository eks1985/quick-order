import { combineReducers } from 'redux';

const bodyHeight = (state = 0, action) => {
  switch (action.type) {
    case 'SET_UI_BODY_HEIGHT':
      return action.p;
    default:
      return state;
  }
};

const pictureHeight = (state = 0, action) => {
  switch (action.type) {
    case 'SET_UI_PICTURE_HEIGHT':
      return action.p;
    default:
      return state;
  }
};

const rowHeight = (state = 40, action) => {
  switch (action.type) {
    case 'SET_UI_ROW_HEIGHT':
      return action.p;
    default:
      return state;
  }
};

const categoryLineSeparator = (state = false, action) => {
  switch (action.type) {
    case 'SET_UI_CATEGORY_LINE_SEPARATOR':
      return action.p;
    default:
      return state;
  }
};

const sortDirection = (state = {'code': '', 'description': '', brand: ''}, action) => {
  switch (action.type) {
    case 'RECEIVE_SORT_DIRECTION':
      return action.payload;
    default:
      return state;
  }
};

const sortDirectionCheckout = (state = {'code': '', 'description': '', brand: ''}, action) => {
  switch (action.type) {
    case 'RECEIVE_SORT_DIRECTION_CHECKOUT':
      return action.payload;
    default:
      return state;
  }
};

const currentContent = (state = 'goods', action) => {
  switch (action.type) {
    case 'SET_CURRENT_CONTENT':
      return action.contentName;
    default:
      return state;
  }
};

const orderCurrentId = (state = '', action) => {
  switch (action.type) {
    case 'SET_ORDER_CURRENT_ID':
      return action.p;
    default:
      return state;
  }
};

export default combineReducers({
  bodyHeight,
  pictureHeight,
  rowHeight,
  categoryLineSeparator,
  sortDirection,
  sortDirectionCheckout,
  currentContent,
  orderCurrentId
});
