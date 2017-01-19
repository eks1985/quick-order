export default (state = {bodyHeight: 0, pictureHeight: 0, rowHeight: 40}, action) => {
  switch (action.type) {
    case 'SET_UI_ELEMENTS_SIZE':
      return { ...state, ...action.payload};
    default:
      return state;
  }
};
