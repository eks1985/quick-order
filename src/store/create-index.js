import { combineReducers } from 'redux';

export default (propName) => {

  const index = (state = {}, action) => {
    switch (action.type) {
      case 'RECEIVE_INDEX_' + propName.toUpperCase():
        return action.payload;
      default:
        return state;
    }
  };

  const indexSort = (state = [], action) => {
    switch (action.type) {
      case 'RECEIVE_INDEX_SORT_' + propName.toUpperCase():
        return action.payload;
      default:
        return state;
    }
  };

  const indexSortReverse = (state = [], action) => {
    switch (action.type) {
      case 'RECEIVE_INDEX_SORT_REVERSE_' + propName.toUpperCase():
        return action.payload;
      default:
        return state;
    }
  };

  return combineReducers({
    index,
    indexSort,
    indexSortReverse
  });

};
