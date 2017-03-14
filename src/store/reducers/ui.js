// import { combineReducers } from 'redux';

export default (
  state = {
    bodyHeight: 0,
    pictureHeight: 0,
    rowHeight: 40,
    categoryLineSeparator: false,
  },
  action) => {
  switch (action.type) {
    case 'SET_UI_ELEMENTS_SIZE':
      return { ...state, ...action.payload};
    default:
      return state;
  }
};

// const bodyHeight = (state = 0, action) => {
//   switch (action.type) {
//     case 'SET_UI_BODY_HEIGHT':
//       return { ...state, ...action.payload};
//     default:
//       return state;
//   }
// };
//
// export default combineReducers({
//   bodyHeight
// });
