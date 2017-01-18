export default (state = false, action) => {
  switch (action.type) {
    case 'SET_PREVENT_CLEAN_GOODS_ROW':
      return action.payload;
    default:
      return state;
  }
};
